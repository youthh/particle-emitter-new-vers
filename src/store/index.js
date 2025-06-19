import Vue from 'vue';
import Vuex from 'vuex';
import emitters from './modules/emitters';
import stage from './modules/stage';
import uiState from './modules/uiState';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    emitters,
    stage,
    uiState,
  },
});
