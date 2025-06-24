<template>
  <el-form
    size="mini"
    label-width="100px"
    label-suffix=":"
    label-position="left"
  >
    <div>
      <el-form-item>
        <template #label>
          <div>
            <el-tooltip placement="top">
              <template #content>
                <div>
                  {{ getDescription('minMult') }}
                </div>
              </template>
              <span>Min Mult</span>
            </el-tooltip>
          </div>
        </template>
        <el-input-number
          :min="0"
          :step="0.1"
          :value="cc.minMult"
          @input="(val) => setScaleSpawn('minMult', val)"
        />
      </el-form-item>

      <!-- isStepped -->
      <el-form-item>
        <template #label>
          <div>
            <el-tooltip placement="top">
              <template #content>
                <div>
                  {{ getDescription('isStepped') }}
                </div>
              </template>
              <span>Is Stepped</span>
            </el-tooltip>
          </div>
        </template>
        <el-switch
          :value="cc.scale.isStepped"
          @change="(val) => setScaleSpawn('scale.isStepped', val)"
        />
      </el-form-item>

      <el-form-item label="List">
        <step-item
          v-for="(item, index) in cc.scale.list"
          :key="index"
          prop-name="scale"
          label="Scale"
          :idx="index"
          :time="item.time"
          behavior="scale"
        >
          <el-input-number
            input-size="mini"
            :min="0"
            :precision="2"
            :step="0.01"
            :value="item.value"
            @input="(value) =>
              setListedStepValue({ propName: 'scale', index, value, behavior: 'scale' })"
          />
        </step-item>
        <new-step-button prop-name="scale" />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import StepItem from './v3/StepItem.vue';
import NewStepButton from './v3/NewStepButton.vue';

export default {
  name: 'ThePanelEmitterParticlePropScale',
  components: {
    NewStepButton,
    StepItem,
  },
  computed: {
    ...mapGetters({
      cc: 'getScaleBehavior',
      configProps() {
        return [];
      },
    }),
  },
  methods: {
    ...mapMutations([
      'setListedStepValue',
      'updateBehaviorConfig',
    ]),
    setScaleSpawn(key, value) {
      this.updateBehaviorConfig({
        type: 'scale',
        key,
        value,
      });
    },
    getDescription() {
      // const prop = this.configProps?.find((p) => p.name === fieldName);
      return '';
    },
  },
};
</script>
