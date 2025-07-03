<template>
  <el-form
    size="mini"
    label-width="100px"
    label-suffix=":"
    label-position="left"
  >
    <el-form-item>
      <template #label>
        <div>
          <el-tooltip
            placement="left"
            :content="type === STATIC_ALPHA ? 'An Alpha behavior that applies a static value to the particle\'s opacity at particle initialization.'
              : 'An Alpha behavior that applies an interpolated or stepped list of values to the particles opacity.'"
          >
            <span>Alpha Type</span>
          </el-tooltip>
        </div>
      </template>

      <el-select
        :value="type"
        @input="setTypeAlpha"
      >
        <el-option
          :value="STATIC_ALPHA"
          label="Static Alpha"
        />
        <el-option
          :value="DINAMIC_ALPHA"
          label="Dynamic Alpha"
        />
      </el-select>
    </el-form-item>
    <div v-show="type === DINAMIC_ALPHA">
      <el-form-item label="List">
        <step-item
          v-for="(item, index) in cc.behaviors.find((i) => i?.type === 'alpha')?.config?.alpha.list"
          :key="index"
          prop-name="alpha"
          label="Alpha"
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
            @input="val => setListValue({ propName: 'alpha', index: index, value: val, behavior: 'alpha' })"
          />
        </step-item>
        <new-step-button
          prop-name="alpha"
          behavior-name="alpha"
        />
      </el-form-item>
    </div>
    <div v-show="STATIC_ALPHA === type">
      <el-form-item label="Alpha">
        <el-input-number
          :step="0.1"
          :value="staticAlpha?.alpha"
          @change="(val) => setStaticAlpha(val)"
        />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import StepItem from './v3/StepItem.vue';
import NewStepButton from './v3/NewStepButton.vue';
import {STATIC_ALPHA, DINAMIC_ALPHA} from "@/store/modules/emitters/names";

export default {
  name: 'ThePanelEmitterParticlePropAlpha',
  components: {
    NewStepButton,
    StepItem,
  },
  data() {
    return {
      STATIC_ALPHA,
      DINAMIC_ALPHA
    };
  },
  computed: {
    isEnabled() {
      return this.$store.getters.getEnabledBehavior('alpha');
    },
    ...mapGetters({
      cc: 'currentConfig',
      useV3: 'v3Syntax',
      type: 'getAlphaType',
      staticAlpha: 'getStaticAlpha',
    }),
  },
  methods: {
    ...mapMutations([
      'setListedStepValue', 'enabledBehavior', 'setAlphaType'
    ]),
    setEnabled(enabled) {
      this.enabledBehavior({
        behaviorName: 'alpha',
        enabled
      });
    },
    setListValue({propName, index, value, behavior}) {
      this.$store.commit('setListedStepValue', { propName, index, value, behavior});
    },
    setTypeAlpha(type) {
      this.$store.commit('setAlphaType', type);
    },
    setStaticAlpha(value) {
      this.$store.commit('setStaticAlpha', value);
    },
  },
};
</script>

<style scoped>

</style>
