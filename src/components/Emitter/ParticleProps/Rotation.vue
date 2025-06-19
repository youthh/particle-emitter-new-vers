<template>
  <el-form
    size="mini"
    label-width="100px"
    label-suffix=":"
    label-position="left"
  >
    <el-form-item>
      <div slot="label">
        <el-tooltip placement="left">
          <div slot="content">
            Angle at which particles are pointed when <br>
            emitted in degrees  - 0 is to the right, <br>
            90 is down. <br>
            This is ignored in 'arc' and 'burst' emission types
          </div>
          <span>Angle</span>
        </el-tooltip>
      </div>
      <el-row>
        <el-col>
          <el-form-item label="Min" label-width="3em">
            <el-slider
              :show-input="true"
              controls-position="right"
              class="xs-mini"
              :min="0"
              :max="360"
              :step="1"
              :value="cc.startRotation.min"
              @input="setStartRotationMin"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="Max" label-width="3em">
            <el-slider
              :show-input="true"
              controls-position="right"
              class="xs-mini"
              :min="0"
              :max="360"
              :step="1"
              :value="cc.startRotation.max"
              @input="setStartRotationMax"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item>
      <div slot="label">
        <el-tooltip placement="left">
          <div slot="content">
            If particles should never rotate. <br>
            A non-zero rotation speed will override this.
          </div>
          <span>No Particle rotation</span>
        </el-tooltip>
      </div>
      <el-switch
        :value="cc.noRotation"
        @input="setNoRotation"
      />
    </el-form-item>
    <el-form-item label="">
      <div slot="label">
        <el-tooltip placement="left">
          <div slot="content">
            Speed in degrees per second that particles <br>
            rotate - Positive numbers are clockwise
          </div>
          <span>Speed</span>
        </el-tooltip>
      </div>
      <el-row>
        <el-col>
          <el-form-item label="Min" label-width="3em">
            <el-tooltip content="Starting speed" placement="top">
            <el-input-number
              class="xs-mini"
              :step="1"
              :value="cc.rotationSpeed.min"
              @input="setRotationSpeedMin"
            />
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="Max" label-width="3em">
            <el-tooltip content="Ending speed" placement="bottom">
              <el-input-number
                class="xs-mini"
                :step="1"
                :value="cc.rotationSpeed.max"
                @input="setRotationSpeedMax"
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
import {
  SPAWN_TYPE_CIRCLE,
  SPAWN_TYPE_RING,
  SPAWN_TYPE_BURST,
} from '../../../store/modules/emitters/names';

export default {
  name: 'ThePanelEmitterParticlePropRotation',
  computed: {
    showAngle() {
      return !(
        this.cc.spawnType === SPAWN_TYPE_CIRCLE
        || this.cc.spawnType === SPAWN_TYPE_RING
        || this.cc.spawnType === SPAWN_TYPE_BURST
      );
    },
    ...mapGetters({
      cc: 'currentConfig',
    }),
  },
  methods: {
    ...mapMutations([
      'setNoRotation',
      'setStartRotationMin',
      'setStartRotationMax',
      'setRotationSpeedMin',
      'setRotationSpeedMax',
    ]),
  },
};
</script>

<style scoped>

</style>
