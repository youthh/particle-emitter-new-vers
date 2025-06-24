<template>
  <el-form-item>
    <template #label>
      <div>
        <el-tooltip placement="left">
          <template #content>
            <div>
              Must be valid JSON. Example: [{s:0,cp:0.394,e:0.644},{s:0.644,cp:0.894,e:1}] <br>
              Generates a custom ease function, <br>
              based on the GreenSock custom ease, <br>
              as demonstrated by the related tool at
              <a
                class="tooltip-link"
                href="https://greensock.com/customease-as"
                target="_blank"
              >GreenSock</a>.
            </div>
          </template>
          <span>Easing</span>
        </el-tooltip>
      </div>
    </template>
    <el-input
      v-model="easingFunc"
      type="textarea"
      :rows="2"
      placeholder="[{s:0,cp:0.5,e:1}]"
    />
  </el-form-item>
</template>

<script>
import { Message } from 'element-ui';

export default {
  name: 'EasingProp',
  props: {
    name: {
      required: true,
      type: String,
    },
  },
  computed: {
    easingFunc: {
      get() {
        const pProp = this.$store.getters.currentConfig[this.name];
        return JSON.stringify(pProp ? pProp.ease : '');
      },
      set(value) {
        try {
          this.$store.commit('setPPropEasing', {
            propName: this.name,
            value,
          });
        } catch (e) {
          Message.error(e.message);
        }
      },
    },
  },
};
</script>

<style scoped>

</style>
