<template>
  <el-collapse accordion class="particle-props-collapse">
    <el-collapse-item name="1.9" align="left">
      <div slot="title">
        <b>Shape Spawn</b>
      </div>
      <ThePanelEmitterParticlePropShapeSpawn />
    </el-collapse-item>
    <el-collapse-item name="1.1" align="left">
      <div slot="title">
        <b>Alpha</b>
      </div>
      <the-panel-emitter-particle-prop-alpha />
    </el-collapse-item>
    <el-collapse-item name="1.10" align="left">
      <div slot="title">
        <b>Animated Single Textures</b>
      </div>
      <ThePanelEmitterAnimatedSingleTextures />
    </el-collapse-item>
    <el-collapse-item name="1.2" align="left">
      <div slot="title">
        <b>Scale</b>
      </div>
      <the-panel-emitter-particle-prop-scale />
    </el-collapse-item>
    <el-collapse-item name="1.3" align="left">
      <div slot="title">
        <b>Color</b>
      </div>
      <the-panel-emitter-particle-prop-color />
    </el-collapse-item>
    <el-collapse-item name="1.4" align="left">
      <div slot="title">
        <b>Speed</b>
      </div>
      <the-panel-emitter-particle-prop-speed />
    </el-collapse-item>
    <el-collapse-item name="1.5" align="left">
      <div slot="title">
        <b>Rotation</b>
      </div>
      <the-panel-emitter-particle-prop-rotation />
    </el-collapse-item>
    <el-collapse-item name="1.6" align="left">
      <div slot="title">
        <b>Lifetime</b>
      </div>
      <the-panel-emitter-particle-prop-lifetime />
    </el-collapse-item>
    <el-collapse-item name="1.7" align="left">
      <div slot="title">
        <b>Move Acceleration</b>
      </div>
      <ThePanelEmitterParticlePropMoveAcceleration />
    </el-collapse-item>
    <el-collapse-item name="1.8" align="left">
      <div slot="title">
        <b>Busrt Spawn</b>
      </div>
      <ThePanelEmitterParticlePropBurstSpawn />
    </el-collapse-item>
  </el-collapse>
</template>

<script>

import ThePanelEmitterParticlePropAlpha from './Behavior/Alpha.vue';
import ThePanelEmitterParticlePropColor from './Behavior/Color.vue';
import ThePanelEmitterParticlePropLifetime from './Behavior/Lifetime.vue';
import ThePanelEmitterParticlePropRotation from './Behavior/Rotation.vue';
import ThePanelEmitterParticlePropScale from './Behavior/Scale.vue';
import ThePanelEmitterParticlePropSpeed from './Behavior/Speed.vue';
import ThePanelEmitterParticlePropMoveAcceleration from './Behavior/MoveAcceleration.vue';
import ThePanelEmitterParticlePropBurstSpawn from './Behavior/BurstSpawn.vue';
import ThePanelEmitterParticlePropShapeSpawn from './Behavior/ShapeSpawn.vue';
import ThePanelEmitterAnimatedSingleTextures from './Behavior/AnimatedTextures.vue';

export default {
  name: 'ThePanelEmitterParticleProps',
  components: {
    ThePanelEmitterParticlePropAlpha,
    ThePanelEmitterParticlePropColor,
    ThePanelEmitterParticlePropLifetime,
    ThePanelEmitterParticlePropRotation,
    ThePanelEmitterParticlePropScale,
    ThePanelEmitterParticlePropSpeed,
    ThePanelEmitterParticlePropMoveAcceleration,
    ThePanelEmitterAnimatedSingleTextures,
    ThePanelEmitterParticlePropBurstSpawn,
    ThePanelEmitterParticlePropShapeSpawn,
  },
};
</script>

<style lang="scss">
  .particle-props-collapse {
    .el-collapse-item__wrap {
      overflow: auto;
    }

    .el-collapse-item__content {
      max-height: 60vh;
    }
  }
</style>
