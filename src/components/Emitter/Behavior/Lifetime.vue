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
            The lifetime of each particle in seconds.
          </div>
          <div>Lifetime</div>
        </el-tooltip>
      </div>
      <el-row>
        <el-col>
          <el-form-item label="Min" label-width="3em">
            <el-input-number
              class="xs-mini"
              :precision="2"
              :step="0.01"
              :min="0"
              :value="cc.lifetime.min"
              @input="setLifetimeMin"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="Max" label-width="3em">
            <el-input-number
              class="xs-mini"
              :precision="2"
              :step="0.01"
              :min="0"
              :value="cc.lifetime.max"
              @input="setLifetimeMax"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ThePanelEmitterParticlePropLifetime',
  computed: {
    ...mapGetters({
      cc: 'currentConfig',
    }),
  },
  methods: {
    ...mapMutations([
      'setLifetimeMin',
      'setLifetimeMax',
    ]),
  },
};
</script>

<style scoped>

</style>
