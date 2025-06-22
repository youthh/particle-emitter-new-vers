<template>
  <el-form size="mini" label-width="150px" label-suffix=":" label-position="left">
    <el-form-item>
      <div slot="label">
        <el-tooltip placement="left" content="How the particles will be spawned.">
          <span>Spawn Type</span>
        </el-tooltip>
      </div>

      <el-select :value="type" @input="setType">
        <el-option :value="SPAWN_TYPE_DEFAULT" label="Point" />
        <el-option :value="SPAWN_TYPE_CIRCLE" label="Circle" />
        <el-option :value="SPAWN_TYPE_RING" label="Ring" />
        <el-option :value="SPAWN_TYPE_RECT" label="Rect" />
        <el-option :value="SPAWN_TYPE_BURST" label="Burst" />
        <el-option :value="SPAWN_TYPE_POLYGONAL" label="Polygonal Chain" />
      </el-select>
    </el-form-item>
    <!--Emission Circle-->
    <el-form-item v-show="type === SPAWN_TYPE_CIRCLE" label-width="100px">
      <div slot="label">
        <el-tooltip
          placement="left"
          content="Circle relative to the Spawn Position inside which particles are spawned"
        >
          <span>Emission Circle</span>
        </el-tooltip>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="x" label-width="2em">
            <el-input-number
              controls-position="right"
              class="xs-mini"
              :min="0"
              :value="cc.data.x"
              @input="setSpawnCircleX"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="y" label-width="2em">
            <el-input-number
              controls-position="right"
              class="xs-mini"
              :min="0"
              :value="cc.data.y"
              @input="setSpawnCircleY"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label-width="2em">
            <el-tooltip content="Radius">
              <el-input-number
                :min="1"
                :value="cc.spawnCircle ? cc.spawnCircle.r : 1"
                @input="setSpawnCircleR"
              />
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label-width="2em">
            <el-tooltip content="Inner radius">
              <el-input-number
                :min="1"
                :value="cc.data.innerRadius"
                @input="setSpawnCircleR"
              />
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Rotate with movement">
        <el-switch :value="cc.rotate"  />
      </el-form-item>
    </el-form-item>
    <!--Emission Ring-->
    <el-form-item v-show="type === SPAWN_TYPE_RING" label-width="100px">
      <div slot="label">
        <el-tooltip
          placement="left"
          content="Ring relative to the Spawn Position inside which particles are spawned"
        >
          <span>Emission Ring</span>
        </el-tooltip>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="x" label-width="3em">
            <el-input-number
              controls-position="right"
              class="xs-mini"
              :min="0"
              :value="cc.spawnCircle ? cc.spawnCircle.x : 0"
              @input="setSpawnCircleX"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="y" label-width="3em">
            <el-input-number
              controls-position="right"
              class="xs-mini"
              :min="0"
              :value="cc.spawnCircle ? cc.spawnCircle.y : 0"
              @input="setSpawnCircleY"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Inner" label-width="3em">
            <el-tooltip content="Minimum Radius">
              <el-input-number
                controls-position="right"
                class="xs-mini"
                :min="1"
                :max="cc.spawnCircle ? cc.spawnCircle.r : 1"
                :value="cc.spawnCircle ? cc.spawnCircle.minR : 1"
                @input="setSpawnCircleMinR"
              />
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Outer" label-width="3em">
            <el-tooltip content="Maximum Radius">
              <el-input-number
                controls-position="right"
                class="xs-mini"
                :min="cc.spawnCircle ? cc.spawnCircle.minR : 1"
                :value="cc.spawnCircle ? cc.spawnCircle.r : 1"
                @input="setSpawnCircleR"
              />
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    Emission Rectangle
    <el-form-item v-show="type === SPAWN_TYPE_RECT" label-width="100px">
      <div slot="label">
        <el-tooltip placement="left">
          <div slot="content">
            Rectangle relative to the Spawn Position inside which particles are spawned
          </div>
          <span>Emission Rectangle</span>
        </el-tooltip>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item label="x" label-width="3em">
            <el-input-number
              controls-position="right"
              class="xs-mini"
              :value="cc.data.x"
              @input="setSpawnRectX"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="y" label-width="3em">
            <el-input-number
              controls-position="right"
              class="xs-mini"
              :value="cc.data.y"
              @input="setSpawnRectY"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="width" label-width="3em">
            <el-input-number
              controls-position="right"
              class="xs-mini"
              :min="1"
              :value="cc.data.width"
              @input="setSpawnRectW"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="height" label-width="3em">
            <el-input-number
              controls-position="right"
              class="xs-mini"
              :min="1"
              :value="cc.data.height"
              @input="setSpawnRectH"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <!--</el-tooltip>-->
    </el-form-item>
    Emission Burst
    <el-form-item v-show="type === SPAWN_TYPE_BURST" label-width="100px">
      <el-form-item label="Particle Spacing">
        <el-tooltip placement="left">
          <div slot="content">
            Spacing in degrees between <br />
            particles within a wave. <br />
            0 gives a random angle for <br />
            each particle
          </div>
          <el-input-number
            :min="0"
            :max="360"
            :step="1"
            :value="cc.particleSpacing || 0"
            @input="setPSpacing"
          />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="Start Angle">
        <el-tooltip placement="left">
          <div slot="content">
            Angle to start spawning <br />
            particles at in each wave
          </div>
          <el-input-number
            :min="0"
            :max="360"
            :step="1"
            :value="cc.angleStart || 0"
            @input="setAngleStart"
          />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="Particles Per Wave">
        <el-tooltip placement="left">
          <div slot="content">
            Number of particles to spawn <br />
            time that the frequency allows <br />
            for particles to spawn.
          </div>
          <el-input-number :min="1" :value="cc.particlesPerWave || 1" @input="setPPerWave" />
        </el-tooltip>
      </el-form-item>
    </el-form-item>
    <!--Emission Polygonal-->
    <el-form-item v-show="type === SPAWN_TYPE_POLYGONAL" label-width="100px">
      <el-row>
        <el-col>
          <el-switch inactive-text="Simple" active-text="Inputs" v-model="polygonInputsEdit">
          </el-switch>
        </el-col>
      </el-row>
      <div v-show="!polygonInputsEdit">
        <el-tooltip>
          <pre slot="content">
  Input raw JSON with array of points <br>
  Example (Z letter): <br>
  [
    {x: 0,    y: 0},
    {x: 100,  y: 0},
    {x: 0,    y: 200},
    {x: 100,  y: 200}
  ]
          </pre>
          <el-input
            type="textarea"
            :rows="6"
            :value="JSON.stringify(cc.spawnPolygon || [])"
            @input="setSimplePolygonalPints"
          >
          </el-input>
        </el-tooltip>
      </div>
      <div v-show="polygonInputsEdit"></div>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import {
  SPAWN_TYPE_BURST,
  SPAWN_TYPE_CIRCLE,
  SPAWN_TYPE_DEFAULT,
  SPAWN_TYPE_POLYGONAL,
  SPAWN_TYPE_RECT,
  SPAWN_TYPE_RING,
} from '@/store/modules/emitters/names';
import { Message } from 'element-ui';

export default {
  name: 'ThePanelEmitterParticlePropShapeSpawn',
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
      cc: 'getShapeBehavior',
      type: 'getSpawnType',
    }),

  },
  methods: {
    ...mapMutations([
      'updateBehaviorConfig',
      'setFrequency',
      'setEmitterLifetime',
      'setMaxParticles',
      'setSpawnChance',
      'setAddAtBack',
      'setTypeSpawn',
      'setPPerWave',
      'setPSpacing',
      'setAngleStart',
      'setSpawnPos',
      'setSpawnCircle',
      'setSpawnRect',
    ]),
    setBurstSpawn(key, value) {
      this.updateBehaviorConfig({
        type: 'spawnBurst',
        key,
        value,
      });
    },
    setSpawnPosX(value) {
      this.setSpawnPos({ attr: 'x', value });
    },
    setType(value) {
      this.setTypeSpawn(value);
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
    setSpawnCircleMinR() {
      // this.setSpawnCircle({ attr: 'minR', value });
    },
    setSpawnRectX() {
      // this.setSpawnRect({ attr: 'x', value });
    },
    setSpawnRectY() {
      // this.setSpawnRect({ attr: 'y', value });
    },
    setSpawnRectW() {
      // this.setSpawnRect({ attr: 'w', value });
    },
    setSpawnRectH() {
      // this.setSpawnRect({ attr: 'h', value });
    },
    setSimplePolygonalPints(value) {
      let points = [];
      try {
        points = JSON.parse(value.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": '));
      } catch (e) {
        Message.error(`JSON is not valid: ${e.message}`);
      }
      // eslint-disable-next-line no-prototype-builtins
      if (
        points.filter((point) => !Object.prototype.hasOwnProperty.call(point, 'x')
          || !Object.prototype.hasOwnProperty.call(point, 'y')).length
      ) {
        Message.error('Some points has missing "x" or "y" property');
        return;
      }
      if (points.length < 2) {
        Message.error('Need at least 2 points');
        return;
      }
      this.$store.commit('setSpawnPolygon', points);
    },
  },
};
</script>
