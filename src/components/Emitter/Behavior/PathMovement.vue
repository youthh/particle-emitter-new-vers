<template>
  <el-form
    size="mini"
    label-width="120px"
    label-suffix=":"
    label-position="left"
  >
    <el-tooltip
      content="Enabled behavior"
    >
      <el-form-item label="Enabled behavior">
        <el-switch
          :value="isEnabled"
          @change="(val) => setEnabled(val)"
        />
      </el-form-item>
    </el-tooltip>

    <div v-show="isEnabled">
      <!-- Path preset selector -->
      <el-form-item label="Path Preset">
        <el-select
          v-model="selectedPathPreset"
          placeholder="Select path"
          @change="onPresetChange"
        >
          <el-option
            v-for="(label, expr) in pathPresets"
            :key="expr"
            :label="label"
            :value="expr"
          />
        </el-select>
      </el-form-item>

      <!-- Custom path expression -->
      <el-form-item label="Path Expression">
        <el-input
          v-model="customPath"
          placeholder="Enter path expression"
          clearable
          @change="onPathInputChange"
        />
      </el-form-item>

      <div>
        <el-form-item>
          <template #label>
            <div>
              <el-tooltip placement="top">
                <template #content>
                  <div />
                </template>
                <span>Min Mult</span>
              </el-tooltip>
            </div>
          </template>
          <el-input-number
            :min="0"
            :step="0.1"
            :value="cc?.minMult"
            @change="(val) => updatePathValue ('minMult', val)"
          />
        </el-form-item>

        <div>
          <el-form-item label="List">
            <step-item
              v-for="(item, index) in cc?.speed.list"
              :key="index"
              prop-name="speed"
              label="Speed"
              :idx="index"
              :time="item.time"
              behavior="movePath"
            >
              <el-input-number
                input-size="mini"
                :min="0"
                :step="1"
                :value="item.value"
                @input="(value) =>
                  setListedStepValue({ propName: 'speed', index, value, behavior: 'movePath' })"
              />
            </step-item>
            <new-step-button
              prop-name="speed"
              behavior-name="movePath"
            />
          </el-form-item>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import StepItem from "@/components/Emitter/Behavior/v3/StepItem.vue";
import NewStepButton from "@/components/Emitter/Behavior/v3/NewStepButton.vue";

export default {
  name: 'ThePanelEmitterParticlePathMovement',
  components: {NewStepButton, StepItem},
  data() {
    return {
      selectedPathPreset: '',
      customPath: '',
      pathPresets: {
        "sin(x / 10) * 30": "Sine Wave",
        "cos(x / 100) * 30": "Cosine Curve",
        "pow(x / 10, 2) / 2": "Parabola",
        "abs(sin(x / 10)) * 30": "Bouncing",
        "sin(x / 15) * 20 + cos(x / 10) * 10": "Turbulent Wave",
        "tan(x / 20) * 5": "Dizzy Loop",
      },
    };
  },
  computed: {
    ...mapGetters({
      cc: 'getPathMoveConfig',
    }),
    isEnabled() {
      return this.$store.getters.getEnabledBehavior('movePath');
    },
  },
  mounted() {
    const path = this.getCurrentPath();
    this.customPath = path || '';
    if (this.pathPresets[path]) {
      this.selectedPathPreset = path;
    }
  },
  methods: {
    ...mapMutations([
      'updateBehaviorConfig',
      'setListedStepValue',
      'createPathMovementBehavior'
    ]),
    setEnabled(enabled) {
      this.createPathMovementBehavior({
        enabled
      });
    },
    getCurrentPath() {
      const behavior = this.cc?.behaviors?.find(b => b.type === 'movePath');
      return behavior?.config?.path || '';
    },

    updatePathValue(key, value) {
      this.updateBehaviorConfig({
        type: 'movePath',
        key,
        value,
      });
    },

    onPresetChange(value) {
      this.customPath = value;
      this.updatePathValue("path", value);
    },

    onPathInputChange(value) {
      this.updatePathValue("path", value);
      // If manually entered value matches a preset, auto-select it
      if (this.pathPresets[value]) {
        this.selectedPathPreset = value;
      } else {
        this.selectedPathPreset = '';
      }
    },
  },
};
</script>
