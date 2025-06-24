<template>
  <el-button
    icon="el-icon-plus"
    type="success"
    @click="() => handleClick(propName, behaviorName)"
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
    behaviorName: {
      required: true,
      type: String,
    },
  },
  methods: {
    ...mapMutations([
      'addNewListedStep',
    ]),
    handleClick(propName, behavior) {
      this.addNewListedStep({propName, behavior});
    },
  },
};
</script>

<style scoped>

</style>
