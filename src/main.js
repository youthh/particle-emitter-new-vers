import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './plugins/element';
import './registerServiceWorker';
import 'vue-resize/dist/vue-resize.css';
import './style/fontello.css';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
// eslint-disable-next-line no-underscore-dangle
// window.__PIXI_APP__ = App;
