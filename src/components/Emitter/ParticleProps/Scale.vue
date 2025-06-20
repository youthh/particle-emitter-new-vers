<template>
  <el-form
    size="mini"
    label-width="100px"
    label-suffix=":"
    label-position="left"
  >
    <div v-show="useV3">
      <is-stepped-prop name="scale"/>
      <easing-prop name="scale"/>
      <el-form-item label="List">
        <step-item
          prop-name="scale"
          label="Scale"
          v-for="(item, index) in cc.behaviors.find((i) => i?.type === 'scale')?.config?.scale.list"
          :key="index"
          :idx="index"
          :time="item.time"
        >
          <el-input-number
            input-size="mini"
            :min="0"
            :precision="2"
            :step="0.01"
            :value="item.value"
            @input="(value) => setListedStepValue({ propName: 'scale', index, value })"
          />
        </step-item>
        <new-step-button prop-name="scale" />
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
  name: 'ThePanelEmitterParticlePropScale',
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
    ...mapMutations([
      'setListedStepValue',
      'setOldAPIPropStart',
      'setOldAPIPropEnd',
    ]),
  },
};
</script>

<style scoped>

</style>
