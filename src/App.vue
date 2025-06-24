<template>
  <div id="app">
    <el-container id="main-container">
      <app-side-panel
        :is-left="true"
        :is-collapsed="projectPanelCollapsed"
      >
        <the-panel-project />
      </app-side-panel>
      <el-container>
        <el-main>
          <the-preview-stage />
        </el-main>
      </el-container>
      <app-side-panel
        :is-left="false"
        :is-collapsed="emitterPanelCollapsed"
      >
        <the-panel-emitter />
      </app-side-panel>
    </el-container>
  </div>
</template>

<script>

import ThePreviewStage from './components/ThePreviewStage.vue';
import ThePanelEmitter from './components/ThePanelEmitter.vue';
import AppSidePanel from './components/AppSidePanel.vue';
import ThePanelProject from './components/ThePanelProject.vue';

export default {
  name: 'App',
  components: {
    ThePanelProject,
    AppSidePanel,
    ThePreviewStage,
    ThePanelEmitter,
  },
  computed: {
    projectPanelCollapsed: {
      get() {
        return this.$store.state.uiState.projectPanel.collapsed;
      },
      set(v) {
        this.$store.commit('uiState/setProjectPanelCollapsed', v);
      },
    },
    emitterPanelCollapsed: {
      get() {
        return this.$store.state.uiState.emitterPanel.collapsed;
      },
      set(v) {
        this.$store.commit('uiState/setEmitterPanelCollapsed', v);
      },
    },
  },
};
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #808080;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

#main-container {
  height: 100%;

  .el-main {
    overflow: hidden;
    padding: 0;
  }

  /*
  .el-aside {
    padding: 20px;
  }*/
}

.el-input-number--mini {
  width: 110px !important;
}

.tooltip-link {
  color: orange;
}
</style>
