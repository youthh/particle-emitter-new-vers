<template>
  <el-form
    size="mini"
    label-width="100px"
    label-suffix=":"
    label-position="left"
  >
    <div v-show="useV3">
      <el-form-item label="List">
        <step-item
          prop-name="color"
          label="Color"
          v-for="(item, index) in cc.behaviors.find((i) => i?.type === 'color')?.config?.color.list"
          :key="index"
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
        <new-step-button prop-name="color" />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import StepItem from './v3/StepItem.vue';
import NewStepButton from './v3/NewStepButton.vue';

export default {
  name: 'ThePanelEmitterParticlePropColor',
  components: {
    StepItem,
    NewStepButton,
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
