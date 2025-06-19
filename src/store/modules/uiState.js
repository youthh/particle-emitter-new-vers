export default {
  namespaced: true,
  state: {
    projectPanel: {
      collapsed: false,
    },
    emitterPanel: {
      collapsed: false,
      active: '2',
    },
  },
  mutations: {
    setProjectPanelCollapsed(state, collapsed) {
      state.projectPanel.collapsed = collapsed;
    },
    setEmitterPanelCollapsed(state, collapsed) {
      state.emitterPanel.collapsed = collapsed;
    },
    setActiveEmitterPanel(state, panelName) {
      state.emitterPanel.active = panelName;
    },
  },
  actions: {

  },
};
