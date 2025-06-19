<template>
  <div class="list-value-step-item">
    <el-row>
      <el-col>
        <el-form-item label="Time" label-width="4em">
          <el-slider
            :show-input="true"
            input-size="mini"
            :min="0"
            :max="1"
            :precision="2"
            :step="0.01"
            :value="time"
            @input="(newTime) => setListedStepTime({ propName, index: idx, time: newTime })"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item :label="label" label-width="4em">
          <slot />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10" :offset="14">
        <el-button
          icon="el-icon-delete"
          type="warning"
          @click="() => removeListedStep({ propName, idx })"
        >
          Remove Step
        </el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'StepItem',
  props: {
    propName: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    idx: {
      required: true,
      type: Number,
    },
    time: {},
  },
  methods: {
    ...mapMutations([
      'removeListedStep',
      'setListedStepTime',
    ]),
  },
};
</script>

<style scoped>
  .list-value-step-item {
    border: 1px solid #dedede;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
  }
</style>
