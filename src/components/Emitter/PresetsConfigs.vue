<template>
  <el-form
    size="mini"
    label-width="150px"
    label-suffix=":"
    label-position="left"
  >
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
        @input="setType"
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
  name: 'ThePanelEmitterParticlePreset',
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
    setType(value) {
      this.setTypeSpawn(value);
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
