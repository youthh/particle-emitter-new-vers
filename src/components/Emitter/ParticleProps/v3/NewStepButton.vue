<template>
  <el-button
    icon="el-icon-plus"
    type="success"
    @click="() => addNewListedStep(propName)"
  >
    Add new step
  </el-button>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'NewStepButton',
  props: {
    propName: {
      required: true,
      type: String,
    },
  },
  methods: {
    ...mapMutations([
      'addNewListedStep',
    ]),
  },
};
</script>

<style scoped>

</style>
