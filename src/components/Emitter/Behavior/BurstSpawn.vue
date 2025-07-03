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
          @change="(val) => setEnabled(val)"
        />
      </el-form-item>
    </el-tooltip>
    <div v-show="isEnabled">
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
          @change="(val) => setBurstSpawn('spacing', val)"
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
          @change="(val) => setBurstSpawn('start', val)"
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
          @change="(val) => setBurstSpawn('distance', val)"
        />
      </el-form-item>
    </div>
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
    isEnabled() {
      return this.$store.getters.getEnabledBehavior('spawnBurst');
    },
  },
  methods: {
    ...mapMutations(['updateBehaviorConfig', 'createBurstSpawnBehavior']),
    setBurstSpawn(key, value) {
      this.updateBehaviorConfig({
        type: 'spawnBurst',
        key,
        value,
      });
    },
    setEnabled(enabled) {
      this.createBurstSpawnBehavior({
        enabled
      });
    },

    getDescription() {
      // const prop = this.configProps?.find((p) => p.name === fieldName);
      return '';
    },
  },
};
</script>
