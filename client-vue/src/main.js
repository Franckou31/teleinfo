import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import feather from 'feather-icons';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

feather.replace();
