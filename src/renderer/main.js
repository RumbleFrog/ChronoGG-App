import Vue from 'vue';
import Buefy from 'buefy';

// import fontawesome from '@fortawesome/fontawesome';

import App from './App';
import router from './router';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconpack: 'fas',
});

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
