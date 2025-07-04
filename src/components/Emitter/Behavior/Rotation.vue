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
          <el-tooltip placement="left">
            <template #content>
              <div>
                Angle at which particles are pointed when <br>
                emitted in degrees - 0 is to the right, <br>
                90 is down. <br>
                This is ignored in 'arc' and 'burst' emission types
              </div>
            </template>
            <span>Angle</span>
          </el-tooltip>
        </div>
      </template>
      <el-row>
        <el-col>
          <el-form-item
            label="Min"
            label-width="3em"
          >
            <el-slider
              :show-input="true"
              controls-position="right"
              class="xs-mini"
              :min="0"
              :max="360"
              :step="1"
              :value="cc.minStart"
              @input="(value) => setRotation('minStart', value)"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label="Max"
            label-width="3em"
          >
            <el-slider
              :show-input="true"
              controls-position="right"
              class="xs-mini"
              :min="0"
              :max="360"
              :step="1"
              :value="cc.maxStart"
              @input="(value) => setRotation('maxStart', value)"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="">
      <template #label>
        <div>
          <el-tooltip placement="left">
            <template #content>
              <div>
                Speed in degrees per second that particles <br>
                rotate - Positive numbers are clockwise
              </div>
            </template>
            <span>Speed</span>
          </el-tooltip>
        </div>
      </template>
      <el-row>
        <el-col>
          <el-form-item
            label="Min"
            label-width="3em"
          >
            <el-tooltip
              content="Starting speed"
              placement="top"
            >
              <el-input-number
                class="xs-mini"
                :step="1"
                :value="cc.minSpeed"
                @input="(value) => setRotation('minSpeed', value)"
              />
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label="Max"
            label-width="3em"
          >
            <el-tooltip
              content="Ending speed"
              placement="bottom"
            >
              <el-input-number
                class="xs-mini"
                :step="1"
                :value="cc.maxSpeed"
                @input="(value) => setRotation('maxSpeed', value)"
              />
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            label="accel"
            label-width="3em"
          >
            <el-tooltip
              content=" Constant rotational acceleration of the particles, in degrees/second/second."
              placement="bottom"
            >
              <el-input-number
                :step="1"
                :value="cc?.accel"
                @input="(val) => setRotation('accel', val)"
              />
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ThePanelEmitterParticlePropRotation',
  computed: {
    ...mapGetters({
      cc: 'getRotationBehavior',
    }),
  },
  methods: {
    ...mapMutations([
      'setNoRotation',
      'setStartRotationMin',
      'setStartRotationMax',
      'setRotationSpeedMin',
      'setRotationSpeedMax',
      'updateBehaviorConfig',
    ]),
    setRotation(key, value) {
      this.updateBehaviorConfig({
        type: 'rotation',
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
