<template>
  <el-form
    size="mini"
    label-width="140px"
    label-suffix=":"
    label-position="left"
  >
    <el-form-item
      label="Render Type"
    >
      <el-radio-group v-model="renderType">
        <el-radio label="WebGL" :disabled="webGLNotSupported"></el-radio>
        <el-radio label="Canvas2d"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="BG color">
      <el-color-picker v-model="bgColor" />
    </el-form-item>
    <el-form-item label="Picture">
      <app-image-resource
        id="bgImage"
        size="small"
        :img-src="imgData"
        :img-filename="imgFile"

        @onChange="$_handleSceneImageChange"
        @onReset="$_handleSceneImageDelete"
      />
    </el-form-item>
    <span
      class="hint"
      v-show="hasBgImageData"
    >
      On preview stage you can use right-mouse to drag background image or set it manually
    </span>
    <el-form-item
      label="Pos"
      label-width="100px"
      v-show="hasBgImageData"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="x" label-width="4em">
            <el-input-number
              v-model="bgImgPosX"
              controls-position="right"
              class="xs-mini"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="y" label-width="4em">
            <el-input-number
              v-model="bgImgPosY"
              controls-position="right"
              class="xs-mini"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item
      label="Scale"
      label-width="100px"
      v-show="hasBgImageData"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="x" label-width="4em">
            <el-input-number
              v-model="bgImgScaleX"
              :step="0.01"
              controls-position="right"
              class="xs-mini"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="y" label-width="4em">
            <el-input-number
              v-model="bgImgScaleY"
              :step="0.01"
              controls-position="right"
              class="xs-mini"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>

import { mapGetters } from 'vuex';
import { RENDERER_TYPE, utils } from 'pixi.js';
import AppImageResource from '../AppImageResource.vue';

export default {
  name: 'ThePanelProjectStageProps',
  components: {
    AppImageResource,
  },
  computed: {
    webGLNotSupported() {
      return !utils.isWebGLSupported();
    },
    renderType: {
      get() {
        if (this.webGLNotSupported) return 'Canvas2D';

        return this.$store.getters['stage/renderType'] === RENDERER_TYPE.WEBGL ? 'WebGL' : 'Canvas2d';
      },
      set(type) {
        this.$store.commit(
          'stage/changeRenderType',
          type === 'WebGL' /* && utils.isWebGLSupported() */ ? RENDERER_TYPE.WEBGL : RENDERER_TYPE.CANVAS,
        );
      },
    },
    bgColor: {
      get() {
        return this.$store.getters['stage/color'];
      },
      set(v) {
        this.$store.commit('stage/changeColor', v);
      },
    },
    bgImgPosX: {
      get() {
        return this.$store.getters['stage/imgPos'].x;
      },
      set(x) {
        this.$store.commit('stage/changeImgPos', { x, y: this.bgImgPosY });
      },
    },
    bgImgPosY: {
      get() {
        return this.$store.getters['stage/imgPos'].y;
      },
      set(y) {
        this.$store.commit('stage/changeImgPos', { y, x: this.bgImgPosX });
      },
    },
    bgImgScaleX: {
      get() {
        return this.$store.getters['stage/imgScale'].x;
      },
      set(x) {
        this.$store.commit('stage/changeImgScale', { x, y: this.bgImgScaleY });
      },
    },
    bgImgScaleY: {
      get() {
        return this.$store.getters['stage/imgScale'].y;
      },
      set(y) {
        this.$store.commit('stage/changeImgScale', { y, x: this.bgImgScaleX });
      },
    },
    hasBgImageData() {
      return !!this.imgFile && !!this.imgData;
    },
    ...mapGetters('stage', [
      'imgFile',
      'imgData',
      'imgPos',
      'imgScale',
    ]),
  },
  methods: {
    $_handleSceneImageDelete() {
      this.$store.commit('stage/changeImg', {
        fileData: '',
        filename: '',
      });
    },
    $_handleSceneImageChange(fileData, filename) {
      this.$store.commit('stage/changeImg', {
        fileData,
        filename,
      });
    },
  },
};
</script>

<style scoped>
  .hint {
    color: gray;
  }
</style>
