<template>
  <el-form
    size="mini"
    label-width="140px"
    label-suffix=":"
    label-position="left"
  >
    <!-- Frequency -->
    <el-form-item>
      <template #label>
        <div>
          <el-tooltip
            placement="left"
            content="Time between particle spawns in seconds."
          >
            <span>Frequency</span>
          </el-tooltip>
        </div>
      </template>
      <el-input-number
        :max="Infinity"
        :precision="3"
        :step="0.001"
        :value="cc.frequency"
        @input="setFrequency"
      />
    </el-form-item>
    <!-- Emitter Lifetime -->
    <el-form-item>
      <template #label>
        <div>
          <el-tooltip placement="left">
            <template #content>
              <div>
                The amount of time in seconds to emit for before setting emit to false. <br>
                A value of -1 is an unlimited amount of time.
              </div>
            </template>
            <span>Emitter Lifetime</span>
          </el-tooltip>
        </div>
      </template>
      <el-input-number
        :min="-1"
        :max="Infinity"
        :precision="2"
        :step="0.01"
        :value="cc.emitterLifetime"
        @input="setEmitterLifetime"
      />
    </el-form-item>
    <!-- Max. Particles -->
    <el-form-item>
      <template #label>
        <div>
          <el-tooltip placement="left">
            <template #content>
              <div>
                Maximum number of particles to keep alive at a time. <br>
                If this limit is reached, no more particles will spawn until some have died.
              </div>
            </template>
            <span>Max. Particles</span>
          </el-tooltip>
        </div>
      </template>
      <el-input-number
        :min="1"
        :max="Infinity"
        :value="cc.maxParticles"
        @input="setMaxParticles"
      />
    </el-form-item>
    <!--Spawn Chance-->
    <el-form-item>
      <template #label>
        <div>
          <el-tooltip
            placement="left"
            content="Chance that a particle will be spawned on each opportunity to spawn one."
          >
            <span>Spawn Chance</span>
          </el-tooltip>
        </div>
      </template>
      <el-slider
        :show-input="true"
        input-size="mini"
        :min="0"
        :max="1"
        :precision="2"
        :step="0.01"
        :value="cc.spawnChance"
        @input="setSpawnChance"
      />
    </el-form-item>
    <!-- Add at back-->
    <el-form-item>
      <template #label>
        <div>
          <el-tooltip placement="left">
            <template #content>
              <div>
                If particles should be added at the back of the display list instead of the front.
              </div>
            </template>
            <span>Add at back</span>
          </el-tooltip>
        </div>
      </template>
      <el-switch
        :value="cc.addAtBack"
        @input="setAddAtBack"
      />
    </el-form-item>
    <!--Spawn Position-->
    <el-form-item label-width="100px">
      <template #label>
        <div>
          <el-tooltip placement="left">
            <template #content>
              <div>
                Position at which to spawn particles, relative to the emitter's owner's origin. <br>
                For example, the flames of a rocket travelling right might have a spawnPos <br>
                of {x:-50, y:0} to spawn at the rear of the rocket.
                To change this, use updateSpawnPos().
              </div>
            </template>
            <span>Spawn Position</span>
          </el-tooltip>
        </div>
      </template>
      <el-col :span="12">
        <el-form-item
          label="x"
          label-width="2em"
        >
          <el-input-number
            controls-position="right"
            class="xs-mini"
            :value="cc.pos.x"
            @input="setSpawnPosX"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          label="y"
          label-width="2em"
        >
          <el-input-number
            controls-position="right"
            class="xs-mini"
            :value="cc.pos.y"
            @input="setSpawnPosY"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <!--    &lt;!&ndash;Spawn Type&ndash;&gt;-->
    <!--    <el-form-item>-->
    <!--      <div slot="label">-->
    <!--        <el-tooltip-->
    <!--          placement="left"-->
    <!--          content="How the particles will be spawned."-->
    <!--        >-->
    <!--          <span>Spawn Type</span>-->
    <!--        </el-tooltip>-->
    <!--      </div>-->

    <!--      <el-select-->
    <!--        :value="cc.spawnType || SPAWN_TYPE_DEFAULT"-->
    <!--        @input="setSpawnType"-->
    <!--      >-->
    <!--        <el-option :value="SPAWN_TYPE_DEFAULT" label="Point"/>-->
    <!--        <el-option :value="SPAWN_TYPE_CIRCLE" label="Circle"/>-->
    <!--        <el-option :value="SPAWN_TYPE_RING" label="Ring"/>-->
    <!--        <el-option :value="SPAWN_TYPE_RECT" label="Rect"/>-->
    <!--        <el-option :value="SPAWN_TYPE_BURST" label="Burst"/>-->
    <!--        <el-option :value="SPAWN_TYPE_POLYGONAL" label="Polygonal Chain"/>-->
    <!--      </el-select>-->
    <!--    </el-form-item>-->
    <!--    &lt;!&ndash;Emission Circle&ndash;&gt;-->
    <!--    <el-form-item-->
    <!--      v-show="cc.spawnType === SPAWN_TYPE_CIRCLE"-->
    <!--      label-width="100px"-->
    <!--    >-->
    <!--      <div slot="label">-->
    <!--        <el-tooltip-->
    <!--          placement="left"-->
    <!--          content="Circle relative to the Spawn Position inside which particles are spawned"-->
    <!--        >-->
    <!--          <span>Emission Circle</span>-->
    <!--        </el-tooltip>-->
    <!--      </div>-->
    <!--      <el-row>-->
    <!--        <el-col :span="12">-->
    <!--          <el-form-item label="x" label-width="2em">-->
    <!--            <el-input-number-->
    <!--              controls-position="right"-->
    <!--              class="xs-mini"-->
    <!--              :min="0"-->
    <!--              :value="cc.spawnCircle ? cc.spawnCircle.x : 0"-->
    <!--              @input="setSpawnCircleX"-->
    <!--            />-->
    <!--          </el-form-item>-->
    <!--        </el-col>-->
    <!--        <el-col :span="12">-->
    <!--          <el-form-item label="y" label-width="2em">-->
    <!--            <el-input-number-->
    <!--              controls-position="right"-->
    <!--              class="xs-mini"-->
    <!--              :min="0"-->
    <!--              :value="cc.spawnCircle ? cc.spawnCircle.y : 0"-->
    <!--              @input="setSpawnCircleY"-->
    <!--            />-->
    <!--          </el-form-item>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--      <el-row>-->
    <!--        <el-col :span="12">-->
    <!--          <el-form-item label-width="2em">-->
    <!--            <el-tooltip content="Radius">-->
    <!--              <el-input-number-->
    <!--                :min="1"-->
    <!--                :value="cc.spawnCircle ? cc.spawnCircle.r : 1"-->
    <!--                @input="setSpawnCircleR"-->
    <!--              />-->
    <!--            </el-tooltip>-->
    <!--          </el-form-item>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--    </el-form-item>-->
    <!--    &lt;!&ndash;Emission Ring&ndash;&gt;-->
    <!--    <el-form-item-->
    <!--      v-show="cc.spawnType === SPAWN_TYPE_RING"-->
    <!--      label-width="100px"-->
    <!--    >-->
    <!--      <div slot="label">-->
    <!--        <el-tooltip-->
    <!--          placement="left"-->
    <!--          content="Ring relative to the Spawn Position inside which particles are spawned"-->
    <!--        >-->
    <!--          <span>Emission Ring</span>-->
    <!--        </el-tooltip>-->
    <!--      </div>-->
    <!--      <el-row>-->
    <!--        <el-col :span="12">-->
    <!--          <el-form-item label="x" label-width="3em">-->
    <!--            <el-input-number-->
    <!--              controls-position="right"-->
    <!--              class="xs-mini"-->
    <!--              :min="0"-->
    <!--              :value="cc.spawnCircle ? cc.spawnCircle.x : 0"-->
    <!--              @input="setSpawnCircleX"-->
    <!--            />-->
    <!--          </el-form-item>-->
    <!--        </el-col>-->
    <!--        <el-col :span="12">-->
    <!--          <el-form-item label="y" label-width="3em">-->
    <!--            <el-input-number-->
    <!--              controls-position="right"-->
    <!--              class="xs-mini"-->
    <!--              :min="0"-->
    <!--              :value="cc.spawnCircle ? cc.spawnCircle.y : 0"-->
    <!--              @input="setSpawnCircleY"-->
    <!--            />-->
    <!--          </el-form-item>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--      <el-row>-->
    <!--        <el-col :span="12">-->
    <!--          <el-form-item label="Inner" label-width="3em">-->
    <!--            <el-tooltip content="Minimum Radius">-->
    <!--              <el-input-number-->
    <!--                controls-position="right"-->
    <!--                class="xs-mini"-->
    <!--                :min="1"-->
    <!--                :max="cc.spawnCircle ? cc.spawnCircle.r : 1"-->
    <!--                :value="cc.spawnCircle ? cc.spawnCircle.minR : 1"-->
    <!--                @input="setSpawnCircleMinR"-->
    <!--              />-->
    <!--            </el-tooltip>-->
    <!--          </el-form-item>-->
    <!--        </el-col>-->
    <!--        <el-col :span="12">-->
    <!--          <el-form-item label="Outer" label-width="3em">-->
    <!--            <el-tooltip content="Maximum Radius">-->
    <!--              <el-input-number-->
    <!--                controls-position="right"-->
    <!--                class="xs-mini"-->
    <!--                :min="cc.spawnCircle ? cc.spawnCircle.minR : 1"-->
    <!--                :value="cc.spawnCircle ? cc.spawnCircle.r : 1"-->
    <!--                @input="setSpawnCircleR"-->
    <!--              />-->
    <!--            </el-tooltip>-->
    <!--          </el-form-item>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--    </el-form-item>-->
    <!--    &lt;!&ndash;Emission Rectangle&ndash;&gt;-->
    <!--    <el-form-item-->
    <!--                  v-show="cc.spawnType === SPAWN_TYPE_RECT"-->
    <!--                  label-width="100px"-->
    <!--    >-->
    <!--      <div slot="label">-->
    <!--        <el-tooltip placement="left">-->
    <!--          <div slot="content">-->
    <!--            Rectangle relative to the Spawn Position inside which particles are spawned-->
    <!--          </div>-->
    <!--          <span>Emission Rectangle</span>-->
    <!--        </el-tooltip>-->
    <!--      </div>-->
    <!--      <el-row>-->
    <!--        <el-col :span="12">-->
    <!--          <el-form-item label="x" label-width="3em">-->
    <!--            <el-input-number-->
    <!--              controls-position="right"-->
    <!--              class="xs-mini"-->
    <!--              :value="cc.spawnRect ? cc.spawnRect.x : 0"-->
    <!--              @input="setSpawnRectX"-->
    <!--            />-->
    <!--          </el-form-item>-->
    <!--        </el-col>-->
    <!--        <el-col :span="12">-->
    <!--          <el-form-item label="y" label-width="3em">-->
    <!--            <el-input-number-->
    <!--              controls-position="right"-->
    <!--              class="xs-mini"-->
    <!--              :value="cc.spawnRect ? cc.spawnRect.y : 0"-->
    <!--              @input="setSpawnRectY"-->
    <!--            />-->
    <!--          </el-form-item>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--      <el-row>-->
    <!--        <el-col :span="12">-->
    <!--          <el-form-item label="width" label-width="3em">-->
    <!--            <el-input-number-->
    <!--              controls-position="right"-->
    <!--              class="xs-mini"-->
    <!--              :min="1"-->
    <!--              :value="cc.spawnRect ? cc.spawnRect.w : 1"-->
    <!--              @input="setSpawnRectW"-->
    <!--            />-->
    <!--          </el-form-item>-->
    <!--        </el-col>-->
    <!--        <el-col :span="12">-->
    <!--          <el-form-item label="height" label-width="3em">-->
    <!--            <el-input-number-->
    <!--              controls-position="right"-->
    <!--              class="xs-mini"-->
    <!--              :min="1"-->
    <!--              :value="cc.spawnRect ? cc.spawnRect.h : 1"-->
    <!--              @input="setSpawnRectH"-->
    <!--            />-->
    <!--          </el-form-item>-->
    <!--        </el-col>-->
    <!--      </el-row>-->

    <!--      &lt;!&ndash;</el-tooltip>&ndash;&gt;-->
    <!--    </el-form-item>-->
    <!--    &lt;!&ndash;Emission Burst&ndash;&gt;-->
    <!--    <el-form-item-->
    <!--        v-show="cc.spawnType === SPAWN_TYPE_BURST"-->
    <!--        label-width="100px"-->
    <!--    >-->
    <!--      <el-form-item label="Particle Spacing">-->
    <!--        <el-tooltip placement="left">-->
    <!--          <div slot="content">-->
    <!--            Spacing in degrees between <br>-->
    <!--            particles within a wave. <br>-->
    <!--            0 gives a random angle for <br>-->
    <!--            each particle-->
    <!--          </div>-->
    <!--          <el-input-number-->
    <!--            :min="0"-->
    <!--            :max="360"-->
    <!--            :step="1"-->
    <!--            :value="cc.particleSpacing || 0"-->
    <!--            @input="setPSpacing"-->
    <!--          />-->
    <!--        </el-tooltip>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="Start Angle">-->
    <!--        <el-tooltip placement="left">-->
    <!--          <div slot="content">-->
    <!--            Angle to start spawning <br> particles at in each wave-->
    <!--          </div>-->
    <!--          <el-input-number-->
    <!--            :min="0"-->
    <!--            :max="360"-->
    <!--            :step="1"-->
    <!--            :value="cc.angleStart || 0"-->
    <!--            @input="setAngleStart"-->
    <!--          />-->
    <!--        </el-tooltip>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item label="Particles Per Wave">-->
    <!--        <el-tooltip placement="left">-->
    <!--          <div slot="content">-->
    <!--            Number of particles to spawn <br>-->
    <!--            time that the frequency allows <br>-->
    <!--            for particles to spawn.-->
    <!--          </div>-->
    <!--          <el-input-number-->
    <!--            :min="1"-->
    <!--            :value="cc.particlesPerWave || 1"-->
    <!--            @input="setPPerWave"-->
    <!--          />-->
    <!--        </el-tooltip>-->
    <!--      </el-form-item>-->
    <!--    </el-form-item>-->
    <!--    &lt;!&ndash;Emission Polygonal&ndash;&gt;-->
    <!--    <el-form-item-->
    <!--                  v-show="cc.spawnType === SPAWN_TYPE_POLYGONAL"-->
    <!--                  label-width="100px"-->
    <!--    >-->
    <!--      <el-row>-->
    <!--        <el-col>-->
    <!--          <el-switch-->
    <!--            inactive-text="Simple"-->
    <!--            active-text="Inputs"-->
    <!--            v-model="polygonInputsEdit"-->
    <!--          >-->
    <!--          </el-switch>-->
    <!--        </el-col>-->
    <!--      </el-row>-->
    <!--      <div v-show="!polygonInputsEdit">-->
    <!--        <el-tooltip>-->
    <!--          <pre slot="content">-->
    <!--  Input raw JSON with array of points <br>-->
    <!--  Example (Z letter): <br>-->
    <!--  [-->
    <!--    {x: 0,    y: 0},-->
    <!--    {x: 100,  y: 0},-->
    <!--    {x: 0,    y: 200},-->
    <!--    {x: 100,  y: 200}-->
    <!--  ]-->
    <!--          </pre>-->
    <!--          <el-input-->
    <!--            type="textarea"-->
    <!--            :rows="6"-->
    <!--            :value="JSON.stringify(cc.spawnPolygon || [])"-->
    <!--            @input="setSimplePolygonalPints"-->
    <!--          >-->

    <!--          </el-input>-->
    <!--        </el-tooltip>-->
    <!--      </div>-->
    <!--      <div v-show="polygonInputsEdit">-->

    <!--      </div>-->
    <!--    </el-form-item>-->
  </el-form>
</template>

<script>
import { Message } from 'element-ui';
import { mapMutations, mapGetters } from 'vuex';

import {
  SPAWN_TYPE_DEFAULT,
  SPAWN_TYPE_CIRCLE,
  SPAWN_TYPE_RING,
  SPAWN_TYPE_RECT,
  SPAWN_TYPE_BURST,
  SPAWN_TYPE_POLYGONAL,
} from '../../store/modules/emitters/names';

export default {
  name: 'ThePanelEmitterProps',
  data() {
    return {
      polygonInputsEdit: false,
      SPAWN_TYPE_DEFAULT,
      SPAWN_TYPE_CIRCLE,
      SPAWN_TYPE_RING,
      SPAWN_TYPE_RECT,
      SPAWN_TYPE_BURST,
      SPAWN_TYPE_POLYGONAL,
    };
  },
  computed: {
    ...mapGetters({
      cc: 'currentConfig',
    }),
  },
  methods: {
    setSpawnPosX(value) {
      this.setSpawnPos({ attr: 'x', value });
    },
    setSpawnPosY(value) {
      this.setSpawnPos({ attr: 'y', value });
    },
    setSpawnCircleX(value) {
      this.setSpawnCircle({ attr: 'x', value });
    },
    setSpawnCircleY(value) {
      this.setSpawnCircle({ attr: 'y', value });
    },
    setSpawnCircleR(value) {
      this.setSpawnCircle({ attr: 'r', value });
    },
    setSpawnCircleMinR(value) {
      this.setSpawnCircle({ attr: 'minR', value });
    },
    setSpawnRectX(value) {
      this.setSpawnRect({ attr: 'x', value });
    },
    setSpawnRectY(value) {
      this.setSpawnRect({ attr: 'y', value });
    },
    setSpawnRectW(value) {
      this.setSpawnRect({ attr: 'w', value });
    },
    setSpawnRectH(value) {
      this.setSpawnRect({ attr: 'h', value });
    },
    setSimplePolygonalPints(value) {
      let points = [];
      try {
        points = JSON.parse(value.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '));
      } catch (e) {
        Message.error(`JSON is not valid: ${e.message}`);
      }
      // eslint-disable-next-line no-prototype-builtins
      if (points.filter((point) => !point.hasOwnProperty('x') || !point.hasOwnProperty('y')).length) {
        Message.error('Some points has missing "x" or "y" property');
        return;
      }
      if (points.length < 2) {
        Message.error('Need at least 2 points');
        return;
      }
      this.$store.commit(
        'setSpawnPolygon',
        points,
      );
    },
    ...mapMutations([
      'setFrequency',
      'setEmitterLifetime',
      'setMaxParticles',
      'setSpawnChance',
      'setAddAtBack',
      'setSpawnType',
      'setPPerWave',
      'setPSpacing',
      'setAngleStart',
      'setSpawnPos',
      'setSpawnCircle',
      'setSpawnRect',
    ]),
  },
};
</script>

<style scoped>

</style>
