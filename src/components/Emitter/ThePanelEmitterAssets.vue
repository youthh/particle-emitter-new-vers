<template>
  <el-form
    size="mini"
    label-suffix=":"
    label-position="left"
  >
    <el-form-item label="Blend mode">
      <el-select v-model="blendMode">
        <el-option
          v-for="item in modesList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          />
      </el-select>
    </el-form-item>
    <el-form-item label="Active assets">
      <el-checkbox-group
        v-model="currentAssetsList"
      >
        <el-checkbox
          v-for="asset in assetsList"
          :key="asset.name"
          :label="asset.name"
        >
          <app-asset-item
            size="small"
            :img-src="asset.body"
            :img-filename="asset.name"
          />
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Or add new">
      <app-image-uploader
        class="new-asset"
        ref="newEmitterAsset"
        size="small"
        id="newEmitterAsset"
        :multiple="true"
        @onItemUploaded="$_onNewAssetUploaded"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex';
import { Message } from 'element-ui';
import AppImageUploader from '../AppImageUploader.vue';
import AppAssetItem from '../AppAssetItem.vue';

export default {
  name: 'ThePanelEmitterAssets',
  components: {
    AppAssetItem,
    AppImageUploader,
  },
  created() {
    this.modesList = [
      { value: 'normal', label: 'Normal' },
      { value: 'add', label: 'Add' },
      { value: 'multiply', label: 'Multiply' },
      { value: 'screen', label: 'Screen' },
      { value: 'overlay', label: 'Overlay (Canvas2D only)' },
      { value: 'darken', label: 'Darken (Canvas2D only)' },
      { value: 'lighten', label: 'Lighten (Canvas2D only)' },
      { value: 'color_dodge', label: 'Color Dodge (Canvas2D only)' },
      { value: 'color_burn', label: 'Color Burn (Canvas2D only)' },
      { value: 'hard_light', label: 'Hard Light (Canvas2D only)' },
      { value: 'soft_light', label: 'Soft Light (Canvas2D only)' },
      { value: 'difference', label: 'Difference (Canvas2D only)' },
      { value: 'exclusion', label: 'Exclusion (Canvas2D only)' },
      { value: 'hue', label: 'Hue (Canvas2D only)' },
      { value: 'saturation', label: 'Saturation (Canvas2D only)' },
      { value: 'color', label: 'Color (Canvas2D only)' },
      { value: 'luminosity', label: 'Luminosity (Canvas2D only)' },
    ];
  },
  computed: {
    currentAssetsList: {
      get() { return this.$store.getters.currentAssetsList; },
      set(items) {
        this.$store.commit('setEmitterAssets', items);
      },
    },
    blendMode: {
      get() { return this.getCurrentEmitter.config.blendMode || 'normal'; },
      set(mode) { this.$store.commit('setBlendMode', mode); },
    },
    ...mapGetters([
      'assetsList',
      'getCurrentEmitter',
    ]),
  },
  methods: {
    $_onNewAssetUploaded(fileData, filename) {
      this.$store.dispatch('addAssetToEmitter', {
        filename,
        fileData,
      }).catch((reason) => Message({
        message: reason.message,
        type: 'error',
        duration: 5e3,
        showClose: true,
      }));
      this.$refs.newEmitterAsset.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
  .el-checkbox {
    display: flex;
    align-items: center;
    &:nth-child(1) {
      margin-left: 30px;
    }
  }
  .el-checkbox-group {
    display: flex;
    flex-wrap: wrap;
  }
</style>
