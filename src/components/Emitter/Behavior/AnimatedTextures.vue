<template>
  <el-form
    size="mini"
    label-width="100px"
    label-suffix=":"
    label-position="left"
  >
    <el-form-item label="">
      <template #label>
        <div>
          <el-tooltip placement="left">
            <template #content>
              <div>
                Speed in degrees per second that particles <br>
                rotate - Positive numbers are clockwise
              </div>
            </template>
            <span>Frame Rate</span>
          </el-tooltip>
        </div>
      </template>
      <el-row>
        <el-col>
          <el-tooltip
            content="Starting speed"
            placement="top"
          >
            <el-input-number
              class="xs-mini"
              :step="1"
              :value="cc?.framerate ? cc?.framerate : 30"
              @input="setFrameRate"
            />
          </el-tooltip>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <template #label>
        <div>
          <el-tooltip placement="left">
            <template #content>
              <div>
                If this is the first node in the list,<br>
                controls if the entire list is stepped or not.
              </div>
            </template>
            <span>Loop</span>
          </el-tooltip>
          <el-form-item label="">
            <el-switch
              :value="cc?.loop ? cc.loop : false"
              @input="$_onSwitchLoop"
            />
          </el-form-item>
        </div>
      </template>
    </el-form-item>
    <el-form-item label="Add animated Texture">
      <div class="assets-list">
        <app-image-resource
          v-for="asset in assets"
          :id="id"
          :key="asset"
          size="small"
          :img-src="asset.body"
          :img-filename="asset.name"
          @on-reset="$_onAssetDelete(asset.name)"
        />

        <app-image-uploader
          id="newBehaviorAsset"
          ref="newBehaviorAsset"
          class="new-asset"
          size="small"
          :multiple="true"
          @on-item-uploaded="$_onNewAssetUploaded"
        />
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import AppImageUploader from '@/components/AppImageUploader.vue';
import AppImageResource from '@/components/AppImageResource.vue';
import { Message } from 'element-ui';

export default {
  name: 'ThePanelEmitterAnimatedSingleTextures',
  components: { AppImageResource, AppImageUploader },
  computed: {
    ...mapGetters({
      cc: 'getAnimateSingleTexturesConfig',
      assets: 'getAnimateSingleTextures',
    }),
  },
  methods: {
    ...mapMutations([
      'setFrameRate',
      'setLoop',
    ]),
    $_onNewAssetUploaded(fileData, filename) {
      this.$store.dispatch('addBehaviorAsset', {
        filename,
        fileData,
      }).catch((reason) => Message({
        message: reason.message,
        type: 'error',
        duration: 5e3,
        showClose: true,
      }));
      this.$refs.newBehaviorAsset.reset();
    },
    $_onAssetDelete(filename) {
      this.$store.commit('removeBehaviorAsset', filename);
    },
    $_onSwitchLoop(value) {
      this.$store.commit('setLoop', value);
    },
  },
};
</script>

<style scoped>

</style>
