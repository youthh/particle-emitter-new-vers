<template>
  <el-form
    size="mini"
    label-width="140px"
    label-suffix=":"
    label-position="left"
  >
    <el-form-item label="Emit click">
      <el-switch
        :value="emitOnMouseClick"
        @input="toggleEmitOnMouseClick"
      />
    </el-form-item>
    <el-form-item label="Update on mouse move">
      <el-switch
        :value="updateOnMouseMove"
        @input="toggleUpdateOnMouseMove"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'ThePanelProjectTriggers',
  computed: mapState('stage', {
    emitOnMouseClick: (state) => state.emitOnMouseClick,
    updateOnMouseMove: (state) => state.updateOnMouseMove,
  }),
  methods: {
    ...mapMutations('stage', [
      'toggleEmitOnMouseClick',
      'toggleUpdateOnMouseMove',
    ]),
  },
};
</script>

<style scoped>

</style>
