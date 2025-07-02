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
            :content="STATIC_SCALE === type ? 'A Scale behavior that applies a randomly picked value to the particle s x & y scale at initialization.'
              : 'A Scale behavior that applies an interpolated or stepped list of values to the particle\'s x & y scale.\n'"
          >
            <span>Scale Type</span>
          </el-tooltip>
        </div>
      </template>

      <el-select
        :value="type"
        @input="setTypeScale"
      >
        <el-option
          :value="STATIC_SCALE"
          label="Static Scale"
        />
        <el-option
          :value="DINAMIC_SCALE"
          label="Dynamic Scale"
        />
      </el-select>
    </el-form-item>

    <div v-show="type === DINAMIC_SCALE">
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
          :value="cc?.minMult"
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
          :value="cc?.scale?.isStepped"
          @change="(val) => setScaleSpawn('scale.isStepped', val)"
        />
      </el-form-item>

      <el-form-item label="List">
        <step-item
          v-for="(item, index) in cc?.scale?.list"
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
        <new-step-button
          prop-name="scale"
          behavior-name="scale"
        />
      </el-form-item>
    </div>

    <div v-show="type === STATIC_SCALE">
      <el-form-item label="Min Scale">
        <el-input-number
          :step="1"
          :value="s?.min"
          @input="(val) => setScaleSpawn('min', val, 'scaleStatic')"
        />
      </el-form-item>
      <el-form-item label="Max Scale">
        <el-input-number
          :step="1"
          :value="s?.max"
          @input="(val) => setScaleSpawn('max', val, 'scaleStatic')"
        />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import StepItem from './v3/StepItem.vue';
import NewStepButton from './v3/NewStepButton.vue';
import {
  DINAMIC_SCALE,
  STATIC_SCALE
} from "@/store/modules/emitters/names";

export default {
  name: 'ThePanelEmitterParticlePropScale',
  components: {
    NewStepButton,
    StepItem,
  },
  data() {
    return {
      STATIC_SCALE,
      DINAMIC_SCALE
    };
  },

  computed: {
    ...mapGetters({
      cc: 'getScaleBehavior',
      type: 'getScaleType',
      s: 'getScaleStatic',
      configProps() {
        return [];
      },
    }),
  },
  methods: {
    ...mapMutations([
      'setListedStepValue',
      'updateBehaviorConfig',
      'enabledBehavior'
    ]),
    setScaleSpawn(key, value, scale = 'scale') {
      this.updateBehaviorConfig({
        type: scale,
        key,
        value,
      });
    },
    getDescription() {
      // const prop = this.configProps?.find((p) => p.name === fieldName);
      return '';
    },
    setTypeScale(type) {
      this.$store.commit('setScaleType', type);
    }
  },
};
</script>
