import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './plugins/element';
import './registerServiceWorker';
import 'vue-resize/dist/vue-resize.css';
import './style/fontello.css';
// eslint-disable-next-line import/order
import * as PIXI from 'pixi.js';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
// eslint-disable-next-line no-underscore-dangle,no-unused-expressions
window.__PIXI_INSPECTOR_GLOBAL_HOOK__ && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI });
