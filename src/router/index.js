import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: () => import('@/views/LandingView.vue'),
    },
    {
      path: '/main',
      name: 'main-page',
      component: () => import('@/views/MainView.vue'),
    },
  ],
});

export default router;
