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
            :content="type === STATIC_COLOR ? 'A Color behavior that applies a single color to the particles tint property at initialization.'
              : 'A Color behavior that applies an interpolated or stepped list of values to the particles tint property'"
          >
            <span>Color Type</span>
          </el-tooltip>
        </div>
      </template>

      <el-select
        :value="type"
        @input="setType"
      >
        <el-option
          :value="STATIC_COLOR"
          label="Static Color"
        />
        <el-option
          :value="DINAMIC_COLOR"
          label="Dynamic Color"
        />
      </el-select>
    </el-form-item>
    <!-------------------------DYNAMIC_COLOR------------------------->
    <div v-show="type === DINAMIC_COLOR">
      <el-form-item label="List">
        <step-item
          v-for="(item, index) in cc.behaviors.find((i) => i?.type === 'color')?.config?.color.list"
          :key="index"
          prop-name="color"
          label="Color"
          :idx="index"
          :time="item.time"
          behavior="color"
        >
          <el-color-picker
            :value="`#${item.value}`"
            @input="(value) => setListedStepValue({
              propName: 'color',
              index,
              value: !value ? 'ffffff': value.substr(1),
              behavior: 'color',
            })"
          />
        </step-item>
        <new-step-button
          prop-name="color"
          behavior-name="color"
        />
      </el-form-item>
    </div>
    <!-----------------------Static_COLOR-------------------------->
    <div v-show="type === STATIC_COLOR">
      <el-form-item label="Static Color">
        <el-color-picker
          :value="`#ffffff`"
          @input="(value) => setColor(value)"
        />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import StepItem from './v3/StepItem.vue';
import NewStepButton from './v3/NewStepButton.vue';
import {DINAMIC_COLOR, STATIC_COLOR} from "@/store/modules/emitters/names";


export default {
  name: 'ThePanelEmitterParticlePropColor',
  components: {
    StepItem,
    NewStepButton,
  },
  data() {
    return {
      STATIC_COLOR,
      DINAMIC_COLOR
    };
  },
  computed: {
    isEnabled() {
      return this.$store.getters.getEnabledBehavior('color');
    },
    ...mapGetters({
      cc: 'currentConfig',
      useV3: 'v3Syntax',
      type: "getColorType"
    }),
  },
  methods: {
    ...mapMutations([
      'setListedStepValue', 'enabledBehavior', 'setColorType', 'setStaticColor']),
    setEnabled(enabled) {
      this.enabledBehavior({
        behaviorName: 'color',
        enabled
      });
    },
    setType(value) {
      this.$store.commit('setColorType', value);
    },
    setColor(value) {
      this.$store.commit('setStaticColor', value);
    }
  },
};
</script>

<style scoped>

</style>
