<template>
  <el-form
    size="mini"
    label-width="140px"
    label-suffix=":"
    label-position="left"
  >

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
