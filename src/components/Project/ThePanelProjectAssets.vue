<template>
  <div class="assets-list">
    <app-image-resource
      v-for="asset in assetsList"
      :id="asset.name"
      :key="asset.name"
      size="small"
      :img-src="asset.body"
      :img-filename="asset.name"
      @on-reset="$_onAssetDelete(asset.name)"
    />

    <app-image-uploader
      id="newAsset"
      ref="newAsset"
      class="new-asset"
      size="small"
      :multiple="true"
      @on-item-uploaded="$_onNewAssetUploaded"
    />
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { Message } from 'element-ui';
import AppImageResource from '../AppImageResource.vue';
import AppImageUploader from '../AppImageUploader.vue';

export default {
  name: 'ThePanelProjectAssets',
  components: {
    AppImageResource,
    AppImageUploader,
  },
  computed: {
    ...mapGetters([
      'assetsList',
    ]),
  },
  methods: {
    $_onNewAssetUploaded(fileData, filename) {
      this.$store.dispatch('addAsset', {
        filename,
        fileData,
      }).catch((reason) => Message({
        message: reason.message,
        type: 'error',
        duration: 5e3,
        showClose: true,
      }));
      this.$refs.newAsset.reset();
    },
    $_onAssetDelete(filename) {
      this.$store.commit('removeAsset', filename);
    },
  },
};
</script>

<style lang="scss" scoped>
  .assets-list {
    margin-bottom: 20px;
  > div {
    margin-right: 25px;
    margin-bottom: 25px;
  }
  /*overflow: visible;*/
  }
</style>
