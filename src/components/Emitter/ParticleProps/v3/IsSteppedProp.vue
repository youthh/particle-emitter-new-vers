<template>
  <el-form-item>
    <div slot="label">
      <el-tooltip placement="left">
        <div slot="content">
          If this is the first node in the list,<br>
          controls if the entire list is stepped or not.
        </div>
        <span>Is stepped?</span>
      </el-tooltip>
    </div>
    <el-switch
      v-model="isStepped"
    />
  </el-form-item>
</template>

<script>
export default {
  name: 'IsSteppedProp',
  props: {
    name: {
      required: true,
      type: String,
    },
  },
  computed: {
    isStepped: {
      get() {
        const pProp = this.$store.getters.currentConfig[this.name];
        return pProp ? pProp.isStepped : false;
      },
      set(value) {
        this.$store.commit('setPPropIsSteppedValue', { propName: this.name, value });
      },
    },
  },
};
</script>

<style scoped>

</style>
