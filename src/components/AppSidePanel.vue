<template>
  <!--<el-aside :style="{width: width + 'px'}">-->
  <el-aside
    class="side-panel"
    :class="{collapsed: collapsed}"
    v-bind:width="(collapsed ? collapsedWidth : width) + 'px'"
  >
    <el-container>
      <el-main>
        <slot v-if="!collapsed"/>
      </el-main>
      <el-footer height="40px" :class="{'el-footer-left': isLeft, 'el-footer-right': !isLeft}">
        <el-button type="primary" size="mini" @click="$_toggleCollapse">
          <i
            v-show="(!collapsed && isLeft) || (collapsed && !isLeft)"
            class="el-icon-arrow-left"
          ></i>
          <i
            v-show="(collapsed && isLeft) || (!collapsed && !isLeft)"
            class="el-icon-arrow-right"
          ></i>
        </el-button>
      </el-footer>
    </el-container>
  </el-aside>
</template>

<script>
export default {
  name: 'CollapsibleSidePanel',
  props: {
    isLeft: {
      isRequired: true,
      type: Boolean,
    },
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    // width: {
    //   type: Number,
    //   default: 350,
    // },
  },
  data() {
    return {
      width: 450,
      collapsedWidth: 65,
      collapsed: this.isCollapsed,
    };
  },
  methods: {
    $_toggleCollapse() {
      this.collapsed = !this.collapsed;
      this.$emit('collapse', this.collapsed);
    },
  },
};
</script>

<style scoped lang="scss">
  .side-panel {
    border: 1px solid #808080;
    background-color: white;
  }
  .el-container {
    height: 100%;
  }

  .el-footer {
    padding: 0;
    margin-top: 15px;
  }

  .el-footer-left {
    text-align: right;
  }

  .el-footer-right {
    text-align: left;
  }

  .el-aside {
    padding: 15px;
    /*transition: width .4s;*/
  }

  .el-aside.collapsed {
    padding-left: 5px;
    padding-right: 5px;
  }

  .collapsed {
    .el-main {
      visibility: hidden;
      padding: 5px;
    }
  }
</style>
