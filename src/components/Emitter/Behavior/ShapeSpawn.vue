<template>
  <el-form
    size="mini"
    label-width="150px"
    label-suffix=":"
    label-position="left"
  >
    <el-tooltip
      content="Enabled behavior"
    >
      <el-form-item label="Enabled behavior">
        <el-switch
          :value="isEnabled"
          @input="(val) => setEnabled(val)"
        />
      </el-form-item>
    </el-tooltip>
    <div v-show="isEnabled">
      <el-form-item>
        <template #label>
          <div>
            <el-tooltip
              placement="left"
              content="How the particles will be spawned."
            >
              <span>Spawn Type</span>
            </el-tooltip>
          </div>
        </template>

        <el-select
          :value="type"
          @change="setType"
        >
          <el-option
            :value="SPAWN_TYPE_TORUS"
            label="Torus"
          />
          <el-option
            :value="SPAWN_TYPE_RECT"
            label="Rect"
          />
          <el-option
            :value="SPAWN_TYPE_POLYGONAL"
            label="Polygonal Chain"
          />
        </el-select>
      </el-form-item>
      <!--Emission Circle-->
      <el-form-item
        v-show="type === SPAWN_TYPE_TORUS"
        label-width="100px"
      >
        <template #label>
          <div>
            <el-tooltip
              placement="left"
              content="Circle relative to the Spawn Position inside which particles are spawned"
            >
              <span>Emission Circle</span>
            </el-tooltip>
          </div>
        </template>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="x"
              label-width="2em"
            >
              <el-input-number
                controls-position="right"
                class="xs-mini"
                :min="-Infinity"
                :value="cc?.data.x"
                @change="(val) => setShapeField('x', val)"
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
                :min="-Infinity"
                :value="cc?.data.y"
                @change="(val) => setShapeField('y', val)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label-width="2em">
              <el-tooltip content="Radius of circle, or outer radius of a ring">
                <el-input-number
                  :min="0"
                  :value="cc?.data.radius"
                  @change="(val) => setShapeField('radius', val)"
                />
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label-width="2em">
              <el-tooltip content="Inner radius of a ring. Use 0 to have a circle.">
                <el-input-number
                  :min="0"
                  :value="cc?.data.innerRadius"
                  @change="(val) => setShapeField('innerRadius', val)"
                />
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Rotate with movement">
          <el-switch
            :value="cc?.data.rotation"
            @change="(val) => setShapeField('rotation', val)"
          />
        </el-form-item>
      </el-form-item>
      <el-form-item
        v-show="type === SPAWN_TYPE_RECT"
        label-width="100px"
      >
        <template #label>
          <div>
            <el-tooltip placement="left">
              <template #content>
                <div>
                  Rectangle relative to the Spawn Position inside which particles are spawned
                </div>
              </template>
              <span>Emission Rectangle</span>
            </el-tooltip>
          </div>
        </template>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="x"
              label-width="3em"
            >
              <el-input-number
                controls-position="right"
                class="xs-mini"
                :value="cc?.data.x"
                @change="(val) => setShapeField('x', val)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="y"
              label-width="3em"
            >
              <el-input-number
                key="y"
                controls-position="right"
                class="xs-mini"
                :value="cc?.data.y"
                @change="(val) => setShapeField('y', val)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="width"
              label-width="3em"
            >
              <el-input-number
                controls-position="right"
                class="xs-mini"
                :min="1"
                :value="cc?.data.w"
                @change="(val) => setShapeField('w', val)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="height"
              label-width="3em"
            >
              <el-input-number
                controls-position="right"
                class="xs-mini"
                :min="1"
                :value="cc?.data?.h"
                @change="(val) => setShapeField('h', val)"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!--</el-tooltip>-->
      </el-form-item>

      <el-form-item
        v-show="type === SPAWN_TYPE_POLYGONAL"
        label-width="100px"
      >
        <el-row>
          <el-col>
            <el-switch
              v-model="polygonInputsEdit"
              inactive-text="Simple"
              active-text="Inputs"
            />
          </el-col>
        </el-row>
        <div v-show="!polygonInputsEdit">
          <el-tooltip>
            <template #content>
              <pre>
      Input raw JSON with array of points <br>
      Example (Z letter): <br>
      [
        {x: 0,    y: 0},
        {x: 100,  y: 0},
        {x: 0,    y: 200},
        {x: 100,  y: 200}
      ]
              </pre>
            </template>
            <el-input
              type="textarea"
              :rows="6"
              :value="JSON.stringify(cc?.data || [])"
              @input="setSimplePolygonalPints"
            />
          </el-tooltip>
        </div>
        <div v-show="polygonInputsEdit" />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import {
  SPAWN_TYPE_BURST,
  SPAWN_TYPE_DEFAULT,
  SPAWN_TYPE_POLYGONAL,
  SPAWN_TYPE_RECT,
  SPAWN_TYPE_RING, SPAWN_TYPE_TORUS,
} from '@/store/modules/emitters/names';
import {Message} from 'element-ui';

export default {
  name: 'ThePanelEmitterParticlePropShapeSpawn',
  data() {
    return {
      polygonInputsEdit: false,
      SPAWN_TYPE_DEFAULT,
      SPAWN_TYPE_TORUS,
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
    isEnabled() {
      return this.$store.getters.getEnabledBehavior('spawnShape');
    },
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
      'shapeBehaviorChange',
      'createSpawnShapeBehavior'
    ]),
    setEnabled(enabled) {
      this.createSpawnShapeBehavior({
        enabled
      });
    },
    setShapeField(key, value) {
      this.shapeBehaviorChange({
        type: this.type,
        key,
        value,
      });
    },
    setType(v) {
      this.setTypeSpawn(v);
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
