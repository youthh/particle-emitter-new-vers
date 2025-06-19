<template>
  <div>
    <el-form
      size="mini"
      label-width="140px"
      label-suffix=":"
      label-position="left"
      ref="emittersForm"
      :rules="validationRules"
      :model="formData"
    >
      <el-form-item
        label="New emitter name"
        prop="newName"
      >
        <el-input
          clearable
          v-model="formData.newName"
        >
          <el-button
            slot="append"
            icon="el-icon-plus"
            @click="$_handleAddNewClick"
          />
        </el-input>
      </el-form-item>
      <el-form-item
        label="Engine version"
      >
        <el-switch
          active-text="3.x Syntax"
          active-color="#13ce66"
          inactive-text="2.x Syntax"
          :value="v3Syntax"
          @input="toggleSyntaxVersion"
        >
        </el-switch>

      </el-form-item>

    </el-form>
    <table class="emitters-list">
      <tr class="head">
        <td>Name</td>
        <td>Type</td>
        <td>On/Off</td>
        <td>&nbsp;</td>
      </tr>
      <tr
        v-for="emitter in emittersList"
        :key="emitter.name"
        :class="[
          emitter.enabled ? '': 'not-active',
          emitter.isCurrent ? 'current' : '',
        ]"
        >
        <td>
          {{emitter.name}}
        </td>
        <td>
          {{emitter.type}}
        </td>
        <td width="20%">
          <el-switch
            :value="emitter.enabled"
            @change="$_handleSwitchEnabled(emitter.name, $event)"
          />
        </td>
        <td width="45%">
          <el-button-group>
            <el-tooltip content="Download emitter">
              <el-button
                icon="el-icon-download"
                size="mini"
                plain
                type="primary"
                @click="$_handleDownloadEmitter(emitter.name)"
              />
            </el-tooltip>
            <el-tooltip content="Upload emitter">
              <el-button
                icon="el-icon-upload2"
                size="mini"
                plain
                type="primary"
                @click="$_handleOpenUploadEmitter(emitter.name)"
              />
            </el-tooltip>
            <el-tooltip content="Edit this emitter">
              <el-button
                icon="el-icon-edit"
                size="mini"
                plain
                type="primary"
                @click="setCurrentEmitter(emitter.name)"
              />
            </el-tooltip>
            <el-tooltip content="Delete emitter">
              <el-button
                icon="el-icon-delete"
                size="mini"
                plain
                type="danger"
                @click="removeEmitter(emitter.name)"
              />
            </el-tooltip>
          </el-button-group>
        </td>
      </tr>
    </table>
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input
      ref="emitterUpload"
      type="file"
      accept="application/json"
      style="display: none"
      @change="$_handleUploadEmitter"
    />
  </div>
</template>

<script>

import { Message } from 'element-ui';
import { mapGetters, mapMutations } from 'vuex';
import { checkName } from '../../store/modules/emitters';

export default {
  name: 'ThePanelProjectEmitters',
  computed: {
    ...mapGetters([
      'emittersList',
      'v3Syntax',
    ]),
  },
  data() {
    return {
      formData: {
        newName: '',
      },
      validationRules: {
        newName: [
          { validator: checkName(this.$store), trigger: 'change' },
        ],
      },
      uploadedEmitterName: null,
    };
  },
  mounted() {
    // prevent reload page (on form submit) by Enter
    this.$refs.emittersForm.$el.onsubmit = (ev) => {
      ev.preventDefault();
      this.$_handleAddNewClick();
    };
  },
  methods: {
    $_handleAddNewClick() {
      this.$refs.emittersForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch('addEmitter', this.formData.newName);
          this.$refs.emittersForm.resetFields();
        }
      });
    },
    $_handleSwitchEnabled(emitterName, enabled) {
      this.$store.dispatch('setEmitterEnabled', { emitterName, enabled });
    },
    $_handleDownloadEmitter(emitterName) {
      this.$store.dispatch('downloadEmitterConfig', emitterName);
    },
    $_handleOpenUploadEmitter(emitterName) {
      this.$refs.emitterUpload.click();
      this.uploadedEmitterName = emitterName;
    },
    $_handleUploadEmitter(e) {
      const file = (typeof e.target === 'undefined') ? e[0] : e.target.files[0];
      if (!file) {
        this.uploadedEmitterName = null;
        return;
      }
      this.$store
        .dispatch('uploadEmitterConfig', {
          emitterName: this.uploadedEmitterName,
          file,
        })
        .then(() => {
          this.uploadedEmitterName = null;
        })
        .catch((reason) => Message({
          message: reason.message,
          type: 'error',
          duration: 5e3,
          showClose: true,
        }));
    },
    ...mapMutations([
      'setCurrentEmitter',
      'removeEmitter',
      'toggleSyntaxVersion',
    ]),
  },
};
</script>

<style scoped lang="scss">
  .emitters-list {
    width: 100%;
    font-size: 1.3em;
    border-spacing: 0;
    border-collapse: separate;
    border-top: 2px solid rgba(198, 198, 198, 0.66);
    > .head {
      font-weight: bold;
    }
    td {
      padding: 4px 5px;
      border-bottom: 2px solid rgba(198, 198, 198, 0.66);
    }

    .not-active {
      color: gray;
    }
    .current {
      background-color: rgba(24, 255, 16, 0.16);
    }
  }
</style>
