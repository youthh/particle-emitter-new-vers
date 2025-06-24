<template>
  <div id="props-panel">
    <el-form
      ref="form"
      label-width="100px"
      size="mini"
      label-suffix=":"
      label-position="left"
      :rules="validationRules"
      :model="formData"
    >
      <el-form-item
        label="Name"
        prop="currentName"
      >
        <el-input
          :value="current"
          @input="$_handleChangeLocalName"
        >
          <template #append>
            <el-button
            
              icon="icon-floppy"
              @click="$_handleRename"
            />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-collapse
      accordion
      :value="activePanel"
      @input="setActiveEmitterPanel"
    >
      <el-collapse-item name="1">
        <template #title>
          <div>
            <i class="el-icon-document" />&nbsp;
            <b class="panel-group-title">Behaviors</b>
          </div>
        </template>
        <the-panel-emitter-particle-props />
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
          <div>
            <i class="el-icon-setting" />&nbsp;
            <b class="panel-group-title">Emitter Props</b>
          </div>
        </template>
        <the-panel-emitter-props />
      </el-collapse-item>
      <el-collapse-item name="3">
        <template #title>
          <div>
            <i class="el-icon-picture-outline" />&nbsp;
            <b class="panel-group-title">Emitter Assets</b>
          </div>
        </template>
        <the-panel-emitter-assets />
      </el-collapse-item>
      <el-collapse-item name="4">
        <template #title>
          <div>
            <i class=" icon-cog-alt" />&nbsp;
            <b class="panel-group-title">Emitter Type</b>
          </div>
        </template>
        <the-panel-emitter-type />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

import { mapMutations, mapState } from 'vuex';
import ThePanelEmitterParticleProps from './Emitter/ThePanelEmitterParticleProps.vue';
import ThePanelEmitterProps from './Emitter/ThePanelEmitterProps.vue';
import ThePanelEmitterType from './Emitter/ThePanelEmitterType.vue';
import ThePanelEmitterAssets from './Emitter/ThePanelEmitterAssets.vue';
import { checkName } from '../store/modules/emitters';

export default {
  name: 'PropertiesPanel',
  components: {
    ThePanelEmitterAssets,
    ThePanelEmitterType,
    ThePanelEmitterProps,
    ThePanelEmitterParticleProps,
  },
  computed: {
    current: {
      get() { return this.$store.state.emitters.current; },
      set(newName) {
        this.$store.dispatch('renameEmitter', {
          oldName: this.current,
          newName,
        });
      },
    },
    ...mapState({
      activePanel(state) {
        return state.uiState.emitterPanel.active;
      },
    }),
  },
  data() {
    return {
      formData: {
        currentName: '',
      },
      validationRules: {
        currentName: [
          { validator: checkName(this.$store), trigger: 'submit' },
        ],
      },
    };
  },
  mounted() {
    // prevent reload page (on form submit) by Enter
    this.$refs.form.$el.onsubmit = (ev) => {
      ev.preventDefault();
      this.$_handleRename();
    };
  },
  methods: {
    $_handleChangeLocalName(newValue) {
      this.formData.currentName = newValue;
    },
    $_handleRename() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$refs.form.clearValidate();
          this.current = this.formData.currentName;
        }
      });
    },
    ...mapMutations({
      setActiveEmitterPanel: 'uiState/setActiveEmitterPanel',
    }),
  },
};
</script>

<style lang="scss">
  .xs-mini.el-input-number.is-controls-right {
    width: 90px;

    .el-input__inner {
      padding-left: 5px;
      padding-right: 35px;
    }
  }

  .panel-group-title {
    font-size: 16px;
  }
</style>
