<template>
  <div class="asset-item">
    <el-tooltip
      placement="top"
      :content="imgFilename"
    >
      <img :alt="imgFilename" :src="imgSrc" class="asset-item__preview-img">
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'AppAssetItem',
  props: {
    imgSrc: {
      default: '',
      required: true,
      type: String,
    },
    imgFilename: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
  .asset-item {
    border: dashed 1px gray;
    position: relative;
    display: inline-block;
    background-color: rgba(128, 128, 128, 0.25);
    /*overflow: hidden;*/
    /*font-size: .8em;*/

    // middle
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647), 0 1px 4px rgba(0, 0, 0, 0.117647);
    width: 50px;
    height: 50px;
    border-radius: 4px;

    /*will-change: transform;*/
    /*transition: transform 0.2s;*/

    &:hover {
      /*transform: scale(1.05);*/
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
      0 2px 4px -1px rgba(0, 0, 0, 0.3);
    }

    &__preview-img {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      width: 100%
    }
  }
</style>
