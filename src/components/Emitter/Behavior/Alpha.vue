<template>
  <el-form
    size="mini"
    label-width="100px"
    label-suffix=":"
    label-position="left"
  >
    <div>
      <el-form-item label="List">
        <step-item
          prop-name="alpha"
          label="Alpha"
          v-for="(item, index) in cc.behaviors.find((i) => i?.type === 'alpha')?.config?.alpha.list"
          :key="index"
          :idx="index"
          :time="item.time"
          behavior="alpha"
        >
          <el-slider
            :show-input="true"
            input-size="mini"
            :min="0"
            :max="1"
            :precision="2"
            :step="0.01"
            :value="item.value"
            @input="(value) =>
            setListedStepValue({ propName: 'alpha', index, value, behavior: 'alpha' })"
          />
        </step-item>
        <new-step-button prop-name="alpha" />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { setListedStepValue } from '@/store/modules/emitters/mutations';
import StepItem from './v3/StepItem.vue';
import NewStepButton from './v3/NewStepButton.vue';

export default {
  name: 'ThePanelEmitterParticlePropAlpha',
  components: {
    NewStepButton,
    StepItem,
  },
  computed: {
    ...mapGetters({
      cc: 'currentConfig',
      useV3: 'v3Syntax',
    }),
  },
  methods: {
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
