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
          <el-tooltip placement="top">
            <template #content>
              <div>
                {{ getDescription('spacing') }}
              </div>
            </template>
            <span>Particle Spacing</span>
          </el-tooltip>
        </div>
      </template>
      <el-input-number
        :step="1"
        :value="cc?.spacing"
        @input="(val) => setBurstSpawn('spacing', val)"
      />
    </el-form-item>

    <el-form-item>
      <template #label>
        <div>
          <el-tooltip placement="top">
            <template #content>
              <div>
                {{ getDescription('start') }}
              </div>
            </template>
            <span>Start Angle</span>
          </el-tooltip>
        </div>
      </template>
      <el-input-number
        :step="1"
        :value="cc?.start"
        @input="(val) => setBurstSpawn('start', val)"
      />
    </el-form-item>

    <el-form-item>
      <template #label>
        <div>
          <el-tooltip placement="top">
            <template #content>
              <div>
                {{ getDescription('distance') }}
              </div>
            </template>
            <span>Distance</span>
          </el-tooltip>
        </div>
      </template>
      <el-input-number
        :step="1"
        :min="0"
        :value="cc?.distance"
        @input="(val) => setBurstSpawn('distance', val)"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ThePanelEmitterParticlePropBurstSpawn',
  computed: {
    ...mapGetters({
      cc: 'getBurstSpawnBehavior',
    }),
    configProps() {
      return [];
    },
  },
  methods: {
    ...mapMutations(['updateBehaviorConfig']),
    setBurstSpawn(key, value) {
      this.updateBehaviorConfig({
        type: 'spawnBurst',
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
