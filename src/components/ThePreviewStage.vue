<template>
  <div class="preview-el">
    <resize-observer @notify="handleResize" />
    <canvas
      ref="previewStageWebGL"
      class="webgl"
    />
    <canvas
      ref="previewStageCanvas2d"
      class="canvas2d"
    />
    <div class="stageInfo">
      <div id="framerate">
        FPS: {{ curFPS.toFixed(0) }}
      </div>
      <div id="particleCount">
        Particles: {{ pNumber }}
      </div>
      <div id="cursorPos">
        x:{{ mousePos.x }}, y: {{ mousePos.y }}
      </div>
      <div id="render">
        Use: {{ isCurrentWebGl ? 'WebGL' : 'Canvas2d' }}
      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue';
import {mapGetters, mapMutations} from 'vuex';
import {
  autoDetectRenderer,
  BaseTexture,
  Renderer,
  RENDERER_TYPE,
  Sprite,
  Texture,
  Ticker,
  UPDATE_PRIORITY,
  utils,
  Container,
  Graphics, Rectangle,
} from 'pixi.js';

import { ResizeObserver } from 'vue-resize';

// import { EMITTER_TYPE_ANIM, EMITTER_TYPE_PATH } from '@/store/modules/emitters/names';
import { debounce } from 'debounce';
import {
  makeDraggableByRightButton,
  EV_ON_DRAG,
  EV_START_DRAG,
  EV_END_DRAG,
} from './pixiHelpers/draggable';
import { addWheelListener } from './pixiHelpers/wheel';
import { Emitter } from '@pixi/particle-emitter';

Vue.component('ResizeObserver', ResizeObserver);

// PIXI.particles.ParticleUtils.verbose = true;

export default {
  name: 'PreviewStage',
  computed: {
    stageBGColor() {
      return parseInt(this.$store.getters['stage/color'].replace(/^#/, ''), 16);
    },
    ...mapGetters([
      'stage/imgData',
    ]),
  },
  data() {
    return {
      curFPS: 0,
      pNumber: 0,
      isCurrentWebGl: false,
      mousePos: {
        x: 0,
        y: 0,
      },
    };
  },
  mounted() {
    const generalAppOptions = {
      autoResize: true,
      backgroundColor: this.stageBGColor,
    };
    this.$_parseEmitterArt(['CartoonSmoke.png']);
    this.canvasRenderer = autoDetectRenderer({
      ...generalAppOptions,
      view: this.$refs.previewStageCanvas2d,
      width: this.$refs.previewStageCanvas2d.offsetWidth,
      height: this.$refs.previewStageCanvas2d.offsetHeight,
    });
    this.$refs.previewStageCanvas2d.addEventListener('contextmenu', this.preventDef);

    if (utils.isWebGLSupported()) {
      this.webGLRenderer = new Renderer({
        ...generalAppOptions,
        view: this.$refs.previewStageWebGL,
        width: this.$refs.previewStageWebGL.offsetWidth,
        height: this.$refs.previewStageWebGL.offsetHeight,
      });
      this.$refs.previewStageWebGL.addEventListener('contextmenu', this.preventDef);
    }

    const stageIsWebGL = this.$store.getters['stage/renderType'] === RENDERER_TYPE.WEBGL;
    const useWebGL = stageIsWebGL && utils.isWebGLSupported();
    this.stage = new Container();
    this.stage.name = 'stage';


    // this.stage.interactive = true;
    // this.stage.interactiveChildren = true
    this.stage.eventMode = "static"

    window.__PIXI_RENDERER__ =  this.webGLRenderer;

    this.stageHelper = new Graphics();
    this.stageHelper.name = 'stageHelper';
    this.stageHelper.setParent(this.stage);
    this.stage.addChild(this.stageHelper);

    this.stage.on('mouseup', (ev) => {
      if (!this.$store.state.stage.emitOnMouseClick) return;
      // if this is not primary button - do not generate particle
      if (ev.data.button !== 0) return;

      this.pContainer.emittersMap.forEach((emitter) => {
        // eslint-disable-next-line no-param-reassign
        emitter.emit = true;
        emitter.resetPositionTracking();
        emitter.updateOwnerPos(ev.data.global.x, ev.data.global.y);
      });
    });
    this.stage.on('mousemove', (ev) => {
      this.mousePos.x = ev.data.global.x;
      this.mousePos.y = ev.data.global.y;
      if (!this.$store.state.stage.updateOnMouseMove) return;
      this.pContainer.emittersMap.forEach((emitter) => {
        emitter.updateOwnerPos(ev.data.global.x, ev.data.global.y);
      });
    });

    const bgSprite = new Sprite();
    bgSprite.name = 'stageBGSprite';
    bgSprite.anchor.x = 0.5;
    bgSprite.anchor.y = 0.5;
    this.bgSprite = bgSprite;
    this.$_setStageTexture(this['stage/imgData']);
    makeDraggableByRightButton(this.bgSprite);

    this.stage.addChild(bgSprite);

    // TODO issue#17 Add possibility to use PIXI.particle.Container (with options)
    const particleContainer = new Container();
    particleContainer.name = 'particleContainer';
    particleContainer.emittersMap = new Map();
    this.pContainer = particleContainer;
    this.stage.addChild(particleContainer);
    this.pContainer.eventMode = "static"
    this.pContainer.interactive = false;
    this.pContainer.interactiveChildren = false;

    this.ticker = new Ticker();
    this.ticker.add(this.render, this, UPDATE_PRIORITY.LOW);

    this.switchRenderType(useWebGL);
    this.addStoreWatchers();
    this.buildEnabledEmitters();

    this.ticker.start();
  },
  created() {
    this.handleResize = debounce(() => {
      if (!this.renderer) return;

      this.renderer.resize(
        this.$el.clientWidth,
        this.$el.clientHeight,
      );
      this.$_refreshStageHelper();
      this.$_setEmittersToCenter();
    }, 300);

    this.buildEnabledEmitters = debounce(() => {
      this.$_buildEnabledEmitters();
    }, 300);
    /** @type {Function[]} */
    this.watchers = [];
    /** @type {PIXI.CanvasRenderer|PIXI.WebGLRenderer} */
    this.renderer = null;
    /** @type {PIXI.CanvasRenderer} */
    this.canvasRenderer = null;
    /** @type {PIXI.WebGLRenderer} */
    this.webGLRenderer = null;
    /** @type {Ticker} */
    this.ticker = null;
    /** @type {PIXI.interaction.InteractionManager} */
    this.interaction = null;
    /** @type {Container} */
    this.stage = null;
    /** @type {Graphics} */
    this.stageHelper = null;
    /** @type {Sprite} */
    this.bgSprite = null;
    /** @type {Container|PIXI.particles.ParticleContainer} */
    this.pContainer = null;
  },
  beforeUnmount() {
    while (this.watchers.length) {
      const stopWatch = this.watchers.shift();
      stopWatch();
    }

    if (this.ticker) {
      const oldTicker = this.ticker;
      this.ticker = null;
      oldTicker.destroy();
    }

    this.stage.destroy({ children: true });
    this.stage = null;

    this.canvasRenderer.view.removeEventListener('contextmenu', this.preventDef);
    this.canvasRenderer.destroy();
    this.webGLRenderer.view.removeEventListener('contextmenu', this.preventDef);
    this.webGLRenderer.destroy();

    this.interaction = null;
    this.renderer = null;
  },
  methods: {
    ...mapMutations(['setEmitter']),

    preventDef(e) {
      e.preventDefault();
    },
    handleResize() {
    },
    $_refreshStageHelper() {
      // make transparent rectangle on whole screen
      this.stageHelper.beginFill(0xffffff, 0);
      this.stageHelper.drawRect(
        0,
        0,
        this.renderer.screen.width,
        this.renderer.screen.height,
      );
    },
    $_setEmittersPos(x, y) {
      this.pContainer.emittersMap.forEach((emitter) => {
        // emitter.resetPositionTracking();
        emitter.updateOwnerPos(
          x,
          y,
        );
      });
    },
    $_setEmittersToCenter() {
      // make transparent rectangle on whole screen
      this.stageHelper.beginFill(0xffffff, 0);
      this.stageHelper.drawRect(
        0,
        0,
        this.$el.clientWidth,
        this.$el.clientHeight,
      );
      this.stage.hitArea = new Rectangle(
        0,
        0,
        this.$el.clientWidth,
        this.$el.clientHeight
      );
      if (!this.pContainer) return;

      this.pContainer.emittersMap.forEach((emitter) => {
        // emitter.resetPositionTracking();
        emitter.updateOwnerPos(
          this.renderer.screen.width / 2,
          this.renderer.screen.height / 2,
        );
      });
    },
    addStoreWatchers() {
      const self = this;

      this.watchers.push(
        this.$store.subscribe(({ type, payload }) => {
          let buff;
          switch (type) {
            case 'addAsset':
              buff = new Image();
              buff.src = payload.fileData;
              Texture.addToCache(
                new Texture(new BaseTexture(buff)),
                payload.filename,
              );
              break;
            case 'removeAsset':
              Texture.removeFromCache(payload);
              break;
            case 'setEmitterPath':
              self.$_buildEnabledEmitters();
              break;
            default:
              break;
          }
        }),
        this.$store.watch(
          (state) => state.stage.renderType,
          (type) => self.switchRenderType(type === RENDERER_TYPE.WEBGL),
        ),

        this.$store.watch(
          (state) => state.stage.color,
          () => {
            self.webGLRenderer.backgroundColor = self.stageBGColor;
            self.canvasRenderer.backgroundColor = self.stageBGColor;
          },
        ),

        this.$store.watch(
          (state) => state.stage.image.fileData,
          this.$_setStageTexture,
        ),

        this.$store.watch(
          (state) => state.stage.image.scale,
          ({ x, y }) => {
            self.bgSprite.scale.x = x;
            self.bgSprite.scale.y = y;
          },
          { deep: true },
        ),
        this.$store.watch(
          (state, getters) => getters.enabledEmitters,
          this.buildEnabledEmitters,
        ),
        this.$store.watch(
          (state, getters) => getters.getCurrentEmitter,
          this.buildEnabledEmitters,
          { deep: true },
        ),

      );

      const addBgSpritePosWatcher = () => this.$store.watch(
        (state) => state.stage.image.pos,
        ({ x, y }) => {
          self.bgSprite.x = x;
          self.bgSprite.y = y;
        },
        { deep: true },
      );

      let bgSpritePosWatcher = addBgSpritePosWatcher();
      this.watchers.push(bgSpritePosWatcher);

      this.bgSprite.on(EV_START_DRAG, () => {
        // remove store watcher
        const idx = this.watchers.indexOf(bgSpritePosWatcher);

        if (idx > -1) {
          this.watchers.splice(idx, 1);
        }
        bgSpritePosWatcher();
      });

      this.bgSprite.on(EV_END_DRAG, () => {
        // add store watcher
        bgSpritePosWatcher = addBgSpritePosWatcher();
        this.watchers.push(bgSpritePosWatcher);
      });

      this.bgSprite.on(EV_ON_DRAG, ({ x, y }) => {
        // debounce(() => {
        this.$store.commit('stage/changeImgPos', { x, y });
        // }, 50)();
      });

      addWheelListener(this.canvasRenderer.view, this.$_onWheel);

      if (this.webGLRenderer) {
        addWheelListener(this.webGLRenderer.view, this.$_onWheel);
      }
    },
    $_onWheel(change, x, y) {
      this.$store.commit('stage/changeImgScale', {
        x: this.$store.getters['stage/imgScale'].x + change,
        y: this.$store.getters['stage/imgScale'].y + change,
      });
      this.$store.commit('stage/changeImgPos', { x, y });
    },
    $_setStageTexture(imgData) {
      if (imgData) {
        const buff = new Image();
        buff.src = imgData;
        Texture.addToCache(
          new Texture(new BaseTexture(buff)),
          'bgImg',
        );
        this.bgSprite.texture = utils.TextureCache.bgImg;
        const bounds = this.bgSprite.getLocalBounds();

        this.$store.commit('stage/changeImgPos', {
          x: Math.round(this.renderer.screen.width / 2 - bounds.width / 2),
          y: Math.round(this.renderer.screen.height / 2 - bounds.height / 2),
        });
      } else {
        this.bgSprite.texture = null;
      }
    },
    switchRenderType(isWebGL) {
      if (isWebGL) {
        this.$refs.previewStageCanvas2d.style.display = 'none';
        this.$refs.previewStageWebGL.style.display = 'inline';
      } else {
        this.$refs.previewStageWebGL.style.display = 'none';
        this.$refs.previewStageCanvas2d.style.display = 'inline';
      }

      this.isCurrentWebGl = isWebGL;

      // Remove old mouse listener
      if (this.interaction) {
        this.interaction.removeEvents();
      }

      this.renderer = isWebGL ? this.webGLRenderer : this.canvasRenderer;
      this.interaction = this.renderer.plugins.interaction;
      this.interaction.setTargetElement(this.renderer.view, this.renderer.resolution);
      this.stage.hitArea = new Rectangle(
        0,
        0,
        this.$refs.previewStageWebGL.offsetWidth ,
        this.$refs.previewStageWebGL.offsetHeight
      );
      this.stage.eventMode = 'static';
      this.stage.interactiveChildren = true;
      this.interaction.moveWhenInside = true;
      this.handleResize();
    },
    render() {
      this.curFPS = this.ticker.FPS;
      // console.log(this.pContainer);
      this.pNumber = Array.from(this.pContainer.emittersMap)
        .reduce((num, emitter) => num + emitter[1].particleCount, 0);

      this.pContainer.emittersMap.forEach((emitter) => {
        emitter.update(this.ticker.elapsedMS * 0.001);
      });
      this.renderer.render(this.stage);
    },
    buildEnabledEmitters() {
    },
    $_buildEnabledEmitters() {
      // cleanup first
      this.pContainer.emittersMap.forEach((emitter) => {
        // eslint-disable-next-line no-param-reassign
        emitter.emit = false;
        emitter.cleanup();
        emitter.destroy();

      });
      this.pContainer.emittersMap.clear();
      this.$store.getters.enabledEmitters.forEach(this.buildEmitter);
      this.$_setEmittersToCenter();
    },
    $_parseEmitterArt(art, emitterType, animConf) {
      const textures = art.map((fileName) => {
        if (!utils.TextureCache[fileName]) {
          const buff = new Image();
          buff.src = this.$store.getters.getAssetItem(fileName)?.body;
          Texture.addToCache(
            new Texture(new BaseTexture(buff)),
            fileName,
          );

        }else {
          return utils.TextureCache[fileName];
        }


        return utils.TextureCache[fileName];
      });

      if (emitterType === 'default' || emitterType === 'path') {
        return textures;
      }
      return {
        ...animConf,
        textures,
      };
    },
    async buildEmitter(emitterObj) {
      // const art = JSON.parse(JSON.stringify(emitterObj.art));
      // const animConf = JSON.parse(JSON.stringify(emitterObj.animConfig));
      const textures = await this.$_parseEmitterArt(emitterObj.assetsBehaviors.map((item) => item.name));
      const emitterConfig = JSON.parse(JSON.stringify(emitterObj.config));

      emitterConfig.behaviors.forEach((b) => {
        if (b.type.includes('texture') || b.type.includes('Single')) {
          if(b.config.texture) {
            b.config.texture = textures.textures[0]
          }else {
            b.config.anim.textures = emitterObj.assetsBehaviors.map((item) => item.body)
          }
        }

      });

      const emitter = new Emitter(
        this.pContainer,
        emitterConfig,
      );
      emitter.emit = true;
      this.pContainer.emittersMap.set(emitterObj.name, emitter);
      this.$_setEmittersToCenter();
    },

  },
};

</script>

<style scoped>
.preview-el {
  position: relative;
}

canvas, .preview-el {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.stageInfo {
  width: 110px;
  position: absolute;
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.8);
  font-family: "Lucida Console", Monaco, monospace;
  letter-spacing: 1px;
  font-size: 10px;
  line-height: 1.6;
  pointer-events: none;
  z-index: 2;
  -webkit-user-select: none;
  user-select: none;
  left: 0;
  top: 0;
}
</style>
