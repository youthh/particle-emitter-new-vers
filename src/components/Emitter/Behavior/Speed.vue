<template>
  <el-form
    size="mini"
    label-width="100px"
    label-suffix=":"
    label-position="left"
  >
    <el-form-item label-width="100px">
      <template #label>
        <div>
          <el-tooltip placement="left">
            <template #content>
              <div>
                Acceleration of particles. Prevents using end speed. <br>
                Without a rotation speed defined, particles will rotate to <br>
                match movement direction.
              </div>
            </template>
          </el-tooltip>
        </div>
      </template>
    </el-form-item>
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
        @input="(val) => setMoveSpeedSpawn ('minMult', val)"
      />
    </el-form-item>

    <div>
      <el-form-item label="List">
        <step-item
          v-for="(item, index) in cc.behaviors.find((i) => i?.type === 'moveSpeed')
            ?.config?.speed.list"
          :key="index"
          prop-name="speed"
          label="Speed"
          :idx="index"
          :time="item.time"
          behavior="moveSpeed"
        >
          <el-input-number
            input-size="mini"
            :min="0"
            :step="1"
            :value="item.value"
            @input="(value) =>
              setListedStepValue({ propName: 'speed', index, value, behavior: 'moveSpeed' })"
          />
        </step-item>
        <new-step-button prop-name="speed" />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import StepItem from './v3/StepItem.vue';
import NewStepButton from './v3/NewStepButton.vue';

export default {
  name: 'ThePanelEmitterParticlePropSpeed',
  components: {
    NewStepButton,
    StepItem,
  },
  computed: {
    ...mapGetters({
      cc: 'currentConfig',
      useV3: 'v3Syntax',
      configProps() {
        return [];
      },
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
      'updateBehaviorConfig',
      'setOldAPIPropStart',
      'setOldAPIPropEnd',
    ]),
    setMoveSpeedSpawn(key, value) {
      this.updateBehaviorConfig({
        type: 'moveSpeed',
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

<style scoped>

</style>
