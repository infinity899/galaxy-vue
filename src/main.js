import Vue from 'vue';
import VueGoodTablePlugin from 'vue-good-table';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';

// import the styles
import 'vue-good-table/dist/vue-good-table.css';

Vue.use(VueGoodTablePlugin, VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
