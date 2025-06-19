<template>
  <div id="proj-panel">
    <el-row style="display: none">
      <el-button-group>
        <el-tooltip content="Download project">
          <el-button icon="el-icon-download" type="primary"/>
        </el-tooltip>
        <el-tooltip content="Open project">
          <el-button icon="el-icon-upload2" type="primary"/>
          <!--<el-dropdown
            split-button
            type="primary"
          >
            <i class="el-icon-upload2" ></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Examples</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>-->
        </el-tooltip>
        <el-tooltip content="Export project">
          <el-button icon="el-icon-upload" type="primary"/>
        </el-tooltip>
      </el-button-group>
      &nbsp;
      <el-button-group>
        <el-tooltip content="Undo changes">
          <el-button ref="undo" icon="icon-ccw" size="small" round/>
        </el-tooltip>
        <el-tooltip content="Redo changes">
          <el-button ref="redo" icon="icon-cw" size="small" round/>
        </el-tooltip>
      </el-button-group>
      <!--<el-button icon="el-icon-refresh" plain type="primary">Refresh</el-button>-->

    </el-row>
    <br>
    <el-collapse accordion="">
      <el-collapse-item>
        <div slot="title">
          <i class="icon-tasks"></i>&nbsp;
          <b class="panel-group-title">Emitters</b>
        </div>
        <the-panel-project-emitters/>
      </el-collapse-item>
      <el-collapse-item>
        <div slot="title">
          <i class="icon-magic"></i>&nbsp;
          <b class="panel-group-title">Triggers</b>
        </div>
        <the-panel-project-triggers/>
      </el-collapse-item>
      <el-collapse-item>
        <div slot="title">
          <i class="el-icon-picture-outline"></i>&nbsp;
          <b class="panel-group-title">Project Assets</b>
        </div>
        <the-panel-project-assets/>
      </el-collapse-item>
      <el-collapse-item>
        <div slot="title">
          <i class="el-icon-picture"></i>&nbsp;
          <b class="panel-group-title">Background Props</b>
        </div>
        <the-panel-project-stage-props/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

import ThePanelProjectEmitters from './Project/ThePanelProjectEmitters.vue';
import ThePanelProjectAssets from './Project/ThePanelProjectAssets.vue';
import ThePanelProjectStageProps from './Project/ThePanelProjectStageProps.vue';
import ThePanelProjectTriggers from './Project/ThePanelProjectTriggers.vue';

export default {
  name: 'ThePanelProject',
  components: {
    ThePanelProjectTriggers,
    ThePanelProjectStageProps,
    ThePanelProjectAssets,
    ThePanelProjectEmitters,
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">

</style>
