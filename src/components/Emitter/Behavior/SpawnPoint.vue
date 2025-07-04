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
  </el-form>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ThePanelEmitterParticleSpawnPoint',
  computed: {
    isEnabled() {
      return this.$store.getters.getEnabledBehavior('spawnPoint');
    },
  },
  methods: {
    ...mapMutations(['createSpawnPointBehavior']),
    setEnabled(enabled) {
      this.createSpawnPointBehavior({
        enabled
      });
    },

  },
};
</script>
