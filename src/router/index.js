import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/views/Layout/LayoutIndex.vue';
import GameView from '@/views/Game/GameView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: GameView
        }
      ]
    }
  ]
})

export default router
