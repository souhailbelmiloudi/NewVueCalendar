import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'Calendar',
      component: () => import('@/components/Calendar.vue')
    },
    {
      path: '/event',
      name: 'Event',
      component: () => import('@/components/Tareas.vue')
    }
   
  ]
})

export default router
