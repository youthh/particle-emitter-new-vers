<template>
  <div
    ref="wrapper"
    class="app-image-res"
    :class="[
      sizeClass
    ]"
  >
    <div class="app-image-res__placeholder">
      <!-- eslint-disable vuejs-accessibility/label-has-for -->
      <label
        :for="inputId"
        class="app-image-res__label"
      />
      <div class="app-image-res__placeholder_add">
        +
      </div>
      <p class="app-image-res__placeholder_text">
        {{ progress > 0 ? progress + "%" : placeholder }}
      </p>
    </div>
    <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
    <input
      :id="inputId"
      ref="input"
      type="file"
      :accept="accept"
      :multiple="multiple && features.html5"
      class="app-image-res__input"
      @change="$_handleFileChange"
    >
    <transition name="a-fade-in">
      <div
        v-if="errText.length"
        class="app-image-res__err"
      >
        {{ errText }}
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'AppImageUploader',
  props: {
    size: {
      type: String,
    },
    accept: {
      default: 'image/*',
      type: String,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    id: {
      default: '',
      type: String,
    },
    maxSize: {
      default: 5120,
      type: Number,
    },
    placeholder: {
      type: String,
      default: 'No image',
    },
  },
  data() {
    return {
      errText: '',
      inputId: '',
      progress: 0,
      // filesList: [], // {filename, imgData}
      features: {
        html5: true,
        directory: false,
        // drag: false,
      },
    };
  },
  computed: {
    sizeClass() {
      if (this.size) {
        return `app-image-res--${this.size.trim().toLowerCase()}`;
      }
      return '';
    },
    maxSizeFormatted() {
      let rst = 0;
      if (this.maxSize < 1024) {
        rst = `${this.maxSize}K`;
      } else {
        rst = `${(this.maxSize / 1024).toFixed(this.maxSize % 1024 > 0 ? 2 : 0)}M`;
      }
      return rst;
    },
  },
  mounted() {
    // check available features
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;

    if (window.FormData && input.files) {
      if (typeof input.webkitdirectory === 'boolean' || typeof input.directory === 'boolean') {
        this.features.directory = true;
      }
      if (this.features.html5 && typeof input.ondrop !== 'undefined') {
        this.features.drop = true;
      }
    } else {
      this.features.html5 = false;
    }

    this.inputId = this.id || this.genId();

    if (!window.FileReader) {
      this.errText = 'FileReader not found';
      return;
    }

    const preventDefaultEvent = (eventName) => {
      document.addEventListener(eventName, this.$_preventDefaultHandler, false);
    };

    ['dragleave', 'drop', 'dragenter', 'dragover'].forEach((e) => preventDefaultEvent(e));

    this.$refs.wrapper.addEventListener('drop', this.$_onDrop);
  },
  beforeUnmount() {
    const removeDefaultEvent = (eventName) => {
      document.removeEventListener(eventName, this.$_preventDefaultHandler);
    };

    ['dragleave', 'drop', 'dragenter', 'dragover'].forEach((e) => removeDefaultEvent(e));
    this.$_preventDefaultHandler = null;

    this.$refs.wrapper.removeEventListener('drop', this.$_onDrop);
  },
  methods: {
    genId() {
      const hash = Math.random().toString(18).substring(5);
      if (!document.getElementById(hash)) {
        return hash;
      }
      return this.genId();
    },
    $_preventDefaultHandler(e) {
      e.preventDefault();
    },
    $_handleFileChange(e) {
      let files = (typeof e.target === 'undefined') ? e : e.target.files;
      if (!(this.features.html5 && this.multiple) && files.length > 1) {
        files = files.slice(0, 1);
      }

      this.progress = 0;

      Array.from(files)
        .map(this.$_processFile)
        .reduce(
          (promiseChain, currentTask) => promiseChain.then(
            (chainResults) => currentTask.then(
              (currentResult) => [...chainResults, currentResult],
            ),
          ),
          Promise.resolve([]),
        );
    },
    $_processFile(file, idx, allFiles) {
      return new Promise((resolve, reject) => {
        const size = Math.floor(file.size / 1024);

        if (size > this.maxSize) {
          reject(new Error(`File is bigger ${this.maxSizeFormatted}`));
          return;
        }

        if (!(/^image/.test(file.type))) {
          reject(new Error(`File ${file.name} is not an image`));
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onerror = reject;
        const self = this;
        reader.onloadend = function onLoadEnd() {
          self.progress = Math.round(((idx + 1) * 100) / allFiles.length);
          self.$emit('onItemUploaded', reader.result, file.name);
        };
      });
    },
    $_onDrop(e) {
      e.preventDefault();
      if (this.readonly) return;

      this.$_handleFileChange(e.dataTransfer.files);
    },
    reset() {
      this.errText = '';

      this.progress = 0;
      this.$refs.input.value = '';
      this.$emit('onReset');
    },
  },
};

</script>

<style scoped lang="scss">
  .app-image-res {
    border: dashed 2px gray;
    position: relative;
    display: inline-block;
    /*overflow: hidden;*/
    /*font-size: .8em;*/

    // middle
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647), 0 1px 4px rgba(0, 0, 0, 0.117647);
    width: 100px;
    height: 100px;
    border-radius: 8px;

    /*will-change: transform;*/
    /*transition: transform 0.2s;*/

    &:hover {
      /*transform: scale(1.05);*/
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
      0 2px 4px -1px rgba(0, 0, 0, 0.3);
    }

    &--small {
      width: 50px;
      height: 50px;
      border-radius: 4px;

      .app-image-res__placeholder {
        font-size: .7em;
        line-height: 1.2em;
      }

    }

    &--large {
      width: 150px;
      height: 150px;
      border-radius: 4px;

      .app-image-res__placeholder {
        font-size: 1.4em;
      }
    }

    &__placeholder {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 2px;
      color: #aaa;
      /*width: 94%;*/
      text-align: center;
      line-height: 1.2em;

      cursor: pointer;

      &_add {
        margin: 5px;
        font-size: 3em;
        font-weight: bold;
        color: #606060;
      }

      &_text {

      }
    }

    &__preview {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      background-color: rgba(128, 128, 128, 0.25);
    }

    &__preview-img {
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      width: 100%
    }

    &__input {
      position: absolute;
      top: -1000px;
    }

    &__label {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
    }

    &__err {
      color: #e55;
      font-size: 12px;
      position: absolute;
      bottom: 0;
      width: 100%;
      text-align: center;
    }

    &:hover {
      .app-image-res__toolbar {
        opacity: 1;
      }
    }
  }

  .a-fade-in {
    &-enter-active, &-leave-active {
      will-change: opacity;
      transition: opacity .5s;
    }

    &-enter, &-leave-to {
      opacity: 0;
    }
  }
</style>
