<template>
  <el-form
    size="mini"
    label-width="150px"
    label-suffix=":"
    label-position="left"
  >
    <el-form-item label="Start speed min">
      <el-input-number
        :step="10"
        :value="cc?.minStart"
        @input="(val) => setMoveAcceleration('minStart', val)"
      />
    </el-form-item>

    <el-form-item label="Start speed max">
      <el-input-number
        :step="10"
        :value="cc?.maxStart"
        @input="(val) => setMoveAcceleration('maxStart', val)"
      />
    </el-form-item>

    <el-form-item label="Accel X">
      <el-input-number
        :step="10"
        :value="cc?.accel.x"
        @input="(val) => setMoveAcceleration('accel.x', val)"
      />
    </el-form-item>

    <el-form-item label="Accel Y">
      <el-input-number
        :step="10"
        :value="cc?.accel.y"
        @input="(val) => setMoveAcceleration('accel.y', val)"
      />
    </el-form-item>

    <el-form-item label="Max speed">
      <el-input-number
        :step="10"
        :value="cc?.maxSpeed"
        @input="(val) => setMoveAcceleration('maxSpeed', val)"
      />
    </el-form-item>

    <el-form-item label="Rotate with movement">
      <el-switch
        :value="cc?.rotate"
        @change="(val) => setMoveAcceleration('rotate', val)"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

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
