<template>
  <el-form
    size="mini"
    label-width="150px"
    label-suffix=":"
    label-position="left"
  >
    <el-tooltip content="Minimum speed when initializing the particle, in world units/second.">
      <el-form-item label="Start speed min">
        <el-input-number
          :step="10"
          :value="cc?.minStart"
          @change="(val) => setMoveAcceleration('minStart', val)"
        />
      </el-form-item>
    </el-tooltip>
    <el-tooltip content="Maximum speed when initializing the particle. in world units/second.">
      <el-form-item label="Start speed max">
        <el-input-number
          :step="10"
          :value="cc?.maxStart"
          @change="(val) => setMoveAcceleration('maxStart', val)"
        />
      </el-form-item>
    </el-tooltip>
    <el-tooltip
      content="Constant acceleration, in the coordinate space of the particle parent, in world units/second."
    >
      <el-form-item label="Accel X">
        <el-input-number
          :step="10"
          :value="cc?.accel?.x"
          @change="(val) => setMoveAcceleration('accel.x', val)"
        />
      </el-form-item>
    </el-tooltip>
    <el-tooltip
      content="Constant acceleration, in the coordinate space of the particle parent, in world units/second."
    >
      <el-form-item label="Accel Y">
        <el-input-number
          :step="10"
          :value="cc?.accel?.y"
          @change="(val) => setMoveAcceleration('accel.y', val)"
        />
      </el-form-item>
    </el-tooltip>
    <el-tooltip content="Maximum linear speed. 0 is unlimited. Defaults to 0.">
      <el-form-item label="Max speed">
        <el-input-number
          :step="10"
          :value="cc?.maxSpeed"
          @change="(val) => setMoveAcceleration('maxSpeed', val)"
        />
      </el-form-item>
    </el-tooltip>
    <el-tooltip
      content="         * Rotate the particle with its direction of movement.
         * While initial movement direction reacts to rotation settings, this overrides any dynamic rotation.
         * Defaults to false."
    >
      <el-form-item label="Rotate with movement">
        <el-switch
          :value="cc?.rotate"
          @change="(val) => setMoveAcceleration('rotate', val)"
        />
      </el-form-item>
    </el-tooltip>
  </el-form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: 'ThePanelEmitterParticlePropMoveAcceleration',
  computed: {
    ...mapGetters({
      cc: 'getMoveAccelerationBehavior',
    }),
  },
  methods: {
    ...mapMutations(['updateBehaviorConfig']),
    setMoveAcceleration(key, value) {
      this.updateBehaviorConfig({
        type: 'moveAcceleration',
        key,
        value,
      });
    },
  },
};
</script>
