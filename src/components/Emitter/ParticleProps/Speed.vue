<template>
  <el-form
    size="mini"
    label-width="100px"
    label-suffix=":"
    label-position="left"
  >
    <el-form-item label-width="100px"
    >
      <div slot="label">
        <el-tooltip placement="left">
          <div slot="content">
            Acceleration of particles. Prevents using end speed. <br>
            Without a rotation speed defined, particles will rotate to <br>
            match movement direction.
          </div>
        </el-tooltip>
      </div>
    </el-form-item>
    <div v-show="useV3">
      <is-stepped-prop name="speed"/>
      <easing-prop name="speed"/>
      <el-form-item label="List">
        <step-item
          prop-name="speed"
          label="Speed"
          v-for="(item, index) in cc.behaviors.find((i) => i?.type === 'moveSpeed')
          ?.config?.speed.list"
          :key="index"
          :idx="index"
          :time="item.time"
        >
          <el-input-number
            input-size="mini"
            :min="0"
            :step="1"
            :value="item.value"
            @input="(value) => setListedStepValue({ propName: 'speed', index, value })"
          />
        </step-item>
        <new-step-button prop-name="speed"/>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import EasingProp from './v3/EasingProp.vue';
import IsSteppedProp from './v3/IsSteppedProp.vue';
import StepItem from './v3/StepItem.vue';
import NewStepButton from './v3/NewStepButton.vue';

export default {
  name: 'ThePanelEmitterParticlePropSpeed',
  components: {
    NewStepButton,
    StepItem,
    IsSteppedProp,
    EasingProp,
  },
  computed: {
    ...mapGetters({
      cc: 'currentConfig',
      useV3: 'v3Syntax',
    }),
  },
  methods: {
    setAccelerationX(value) {
      this.setAcceleration({ attr: 'x', value });
    },
    setAccelerationY(value) {
      this.setAcceleration({ attr: 'y', value });
    },
    ...mapMutations([
      'setAcceleration',
      'setListedStepValue',
      'setOldAPIPropStart',
      'setOldAPIPropEnd',
    ]),
  },
};
</script>

<style scoped>

</style>
