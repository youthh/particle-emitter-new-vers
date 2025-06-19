<template>
  <el-form
    size="mini"
    label-width="140px"
    label-suffix=":"
    label-position="left"
  >
    <el-form-item label="Type">
      <el-select
        :value="cEmitter.type"
        @input="setEmitterType"
        placeholder="Please select emitter type"
      >
        <el-option
          :value="EMITTER_TYPE_DEFAULT"
          label="Default"
        />
        <el-option
          :value="EMITTER_TYPE_PATH"
          label="Path particle"
        />
        <el-option
          :value="EMITTER_TYPE_ANIM"
          label="Animated Particle"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="Path data"
      v-show="cEmitter.type === EMITTER_TYPE_PATH"
    >
      <el-tooltip>
        <div slot="content">
          An particle that follows a path defined by an algebraic expression, <br>
          e.g. "sin(x)" or"5x + 3". <br>
          To use this class, the particle config must have a "path" string in the <br>
          "extraData" parameter. This string should have "x" in it to represent <br>
          movement (from the speed settings of the particle). It may have numbers, <br>
          parentheses, the four basic operations, and the following Math functions <br>
          or properties (without the preceding "Math."): "pow", "sqrt", "abs", <br>
          "floor", "round", "ceil", "E", "PI", "sin", "cos", "tan", "asin", "acos", <br>
          "atan", "atan2", "log". <br>
          The overall movement of the particle and the expression value become x and <br>
          y positions for the particle, respectively. The final position is rotated by <br>
          the spawn rotation/angle of the particle. <br>
          <br>
          "sin(x/10) * 20" // A sine wave path. <br>
          "cos(x/100) * 30" // Particles curve counterclockwise <br>
          // (for medium speed/low lifetime particles) <br>
          "pow(x/10, 2) / 2" // Particles curve clockwise (remember, +y is down). <br>
        </div>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="e.g. sin(x/10) * 20"
          :value="cEmitter.config.extraData.path"
          @input="setEmitterPathWithDelay"
        >
        </el-input>
      </el-tooltip>
    </el-form-item>
    <div v-show="cEmitter.type === EMITTER_TYPE_ANIM">
      <el-form-item label="Frame rate">
        <el-tooltip>
          <div slot="content">
            It is the animation speed of the particle in frames per second. <br>
            A value of -1 ("matchLife") causes the animation to match the <br>
            lifetime of an individual particle, instead of at a constant framerate.<br>
            This causes the animation to play through one time, <br>
            completing when the particle expires.
          </div>
          <el-input-number
            :value="cEmitter.animConfig.framerate"
            @input="setAnimationFramerate"
            class="xs-mini"
            controls-position="right"
            :min="-1"
            :step="1"
            :max="100"
          />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="Loop">
        <el-switch
          :value="cEmitter.animConfig.loop"
          @input="setAnimationLoop"
        />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { debounce } from 'debounce';

import {
  EMITTER_TYPE_DEFAULT,
  EMITTER_TYPE_PATH,
  EMITTER_TYPE_ANIM,
} from '../../store/modules/emitters/names';

export default {
  name: 'ThePanelEmitterType',
  computed: {
    emitterPath() {
      const extData = this.cEmitter.config.extraData;
      return extData && extData.path ? extData.path : 'x';
    },
    ...mapGetters({
      cEmitter: 'getCurrentEmitter',
    }),
  },
  created() {
    this.setEmitterPathWithDelay = debounce((value) => {
      this.setEmitterPath(value);
    }, 50);
  },
  methods: {
    setEmitterPathWithDelay() {},
    ...mapMutations([
      'setEmitterType',
      'setEmitterPath',
      'setAnimationFramerate',
      'setAnimationLoop',
    ]),
  },
  data() {
    return {
      EMITTER_TYPE_DEFAULT,
      EMITTER_TYPE_PATH,
      EMITTER_TYPE_ANIM,
    };
  },
};
</script>

<style scoped>

</style>
