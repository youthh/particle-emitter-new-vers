<template>
  <el-form
    size="mini"
    label-width="100px"
    label-suffix=":"
    label-position="left"
  >
    <div v-show="useV3">
      <is-stepped-prop name="alpha"/>
      <easing-prop name="alpha"/>
      <el-form-item label="List">
        <step-item
          prop-name="alpha"
          label="Alpha"
          v-for="(item, index) in cc.alpha.list"
          :key="index"
          :idx="index"
          :time="item.time"
        >
          <el-slider
            :show-input="true"
            input-size="mini"
            :min="0"
            :max="1"
            :precision="2"
            :step="0.01"
            :value="item.value"
            @input="(value) => setListedStepValue({ propName: 'alpha', index, value })"
          />
        </step-item>
        <new-step-button prop-name="alpha" />
      </el-form-item>
    </div>
    <div v-show="!useV3">
      <el-form-item label="Start" label-width="4em">
        <el-slider
          :show-input="true"
          input-size="mini"
          :min="0"
          :max="1"
          :precision="2"
          :step="0.01"
          :value="cc.alpha.start"
          @input="(value) => setOldAPIPropStart({propName: 'alpha', value})"
        />
      </el-form-item>
      <el-form-item label="End" label-width="4em">
        <el-slider
          :show-input="true"
          input-size="mini"
          :min="0"
          :max="1"
          :precision="2"
          :step="0.01"
          :value="cc.alpha.end"
          @input="(value) => setOldAPIPropEnd({propName: 'alpha', value})"
        />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { setListedStepValue, setOldAPIPropEnd } from '@/store/modules/emitters/mutations';
import StepItem from './v3/StepItem.vue';
import NewStepButton from './v3/NewStepButton.vue';
import EasingProp from './v3/EasingProp.vue';
import IsSteppedProp from './v3/IsSteppedProp.vue';

export default {
  name: 'ThePanelEmitterParticlePropAlpha',
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
    setOldAPIPropEnd,
    setListedStepValue,
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
