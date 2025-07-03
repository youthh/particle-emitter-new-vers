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
            :content="type === STATIC_SPEED ? 'A Movement behavior that uses a randomly picked constant speed throughout a particle\'s lifetime.' +
              ' Movement direction is controlled by the particle\'s starting rotation.'
              : 'A Movement behavior that uses an interpolated or stepped list of values for a particles speed at any given moment.' +
                'Movement direction is controlled by the particle\'s starting rotation.'"
          >
            <span>Move speed Type</span>
          </el-tooltip>
        </div>
      </template>

      <el-select
        :value="type"
        @input="setMoveSpeedType"
      >
        <el-option
          :value="STATIC_SPEED"
          label="Static Speed"
        />
        <el-option
          :value="DINAMIC_SPEED"
          label="Dynamic Speed"
        />
      </el-select>
    </el-form-item>

    <div v-show="type === DINAMIC_SPEED">
      <el-form-item
        label-width="100px"
      >
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
          :value="s?.minMult"
          @change="(val) => setMoveSpeedSpawn ('minMult', val)"
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
              @change="(value) =>
                setListedStepValue({ propName: 'speed', index, value, behavior: 'moveSpeed' })"
            />
          </step-item>
          <new-step-button
            prop-name="speed"
            behavior-name="moveSpeed"
          />
        </el-form-item>
      </div>
    </div>
    <!-----------------------STATIC_SPEED------------------------->
    <div v-show="type === STATIC_SPEED">
      <el-form-item label="Min Speed">
        <el-input-number
          :step="1"
          :value="s?.min"
          @change="(val) => setMoveSpeedSpawn('min', val, STATIC_SPEED)"
        />
      </el-form-item>
      <el-form-item label="Max Speed">
        <el-input-number
          :step="1"
          :value="s?.max"
          @change="(val) => setMoveSpeedSpawn('max', val, STATIC_SPEED)"
        />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import StepItem from './v3/StepItem.vue';
import NewStepButton from './v3/NewStepButton.vue';
import {DINAMIC_SPEED, STATIC_SPEED} from "@/store/modules/emitters/names";
import {setMoveSpeedType} from "@/store/modules/emitters/mutations";

export default {
  name: 'ThePanelEmitterParticlePropSpeed',
  components: {
    NewStepButton,
    StepItem,
  },
  data() {
    return {
      STATIC_SPEED,
      DINAMIC_SPEED,
    };
  },
  computed: {
    ...mapGetters({
      cc: 'currentConfig',
      useV3: 'v3Syntax',
      type: 'getMoveSpeedType',
      s: 'getStaticMoveSpeed',
      configProps() {
        return [];
      },
    }),
  },
  methods: {
    setMoveSpeedType,
    ...mapMutations([
      'setListedStepValue',
      'updateBehaviorConfig',
      'enabledBehavior',
      'setMoveSpeedType'
    ]),
    setMoveSpeedSpawn(key, value, moveSpeed = DINAMIC_SPEED) {
      this.updateBehaviorConfig({
        type: moveSpeed,
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
