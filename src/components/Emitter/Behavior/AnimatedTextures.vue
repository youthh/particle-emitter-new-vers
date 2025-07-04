<template>
  <el-form
    size="mini"
    label-width="100px"
    label-suffix=":"
    label-position="left"
  >
    <el-form-item>
      <template #label>
        <div>
          <el-tooltip
            placement="left"
            content="Textures Type"
          >
            <span>Textures Type</span>
          </el-tooltip>
        </div>
      </template>

      <el-select
        :value="type"
        @input="$_setTexturesType"
      >
        <el-option
          :value="SINGLE_TEXTURE"
          label="Single Texture"
        />
        <el-option
          :value="ANIMATED_SINGLE_TEXTURE"
          label="Animated Single Textures"
        />
        <el-option
          :value="RANDOM_TEXTURE"
          label="Random Textures"
        />
      </el-select>
    </el-form-item>

    <!--SINGLE_TEXTURE -->
    <div v-show="type === SINGLE_TEXTURE">
      <el-form-item label="Add Texture">
        <div class="assets-list">
          <app-image-resource
            v-for="asset in assets"
            :id="asset.name"
            :key="asset.name"
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
    </div>
    <!--ANIMATED_SINGLE_TEXTURE -->
    <div v-show="type === ANIMATED_SINGLE_TEXTURE">
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
            :id="asset.name"
            :key="asset.name"
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
            :disabled="true"
            @on-item-uploaded="$_onNewAssetUploaded"
          />
        </div>
      </el-form-item>
    </div>
    <!--Random Textures -->
    <div v-show="type === RANDOM_TEXTURE">
      <el-form-item label="Add Texture">
        <div class="assets-list">
          <app-image-resource
            v-for="asset in assets"
            :id="asset.name"
            :key="asset.name"
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
    </div>

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
  </el-form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import AppImageUploader from '@/components/AppImageUploader.vue';
import AppImageResource from '@/components/AppImageResource.vue';
import {Message} from 'element-ui';
import {
  ANIMATED_SINGLE_TEXTURE, RANDOM_TEXTURE,
  SINGLE_TEXTURE
} from "@/store/modules/emitters/names";
import {setTexturesType} from "@/store/modules/emitters/mutations";

export default {
  name: 'ThePanelEmitterAnimatedSingleTextures',
  components: {AppImageResource, AppImageUploader},
  data() {
    return {
      ANIMATED_SINGLE_TEXTURE,
      SINGLE_TEXTURE,
      RANDOM_TEXTURE
    };
  },
  computed: {
    ...mapGetters({
      cc: 'getAnimateSingleTexturesConfig',
      assets: 'getAnimateSingleTextures',
      type: 'getCurrentTypeTextures',
      blendModeType: 'getBlendMode',
    }),
    blendMode: {
      get() { return this.blendModeType || 'normal'; },
      set(value) { this.$store.commit('updateBehaviorConfig', {type: "blendMode", key: 'blendMode', value}); },
    },
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

  methods: {
    setTexturesType,
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
    $_setTexturesType(value) {
      this.$store.commit('setTexturesType', value);
    },
  },
};
</script>

<style scoped>

</style>
