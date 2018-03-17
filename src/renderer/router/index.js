import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Settings',
      component: require('@/components/Settings').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
