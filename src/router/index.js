import { createRouter, createWebHistory } from 'vue-router'
import DealsView from '../views/DealsView.vue'
import DealAboutView from '../views/DealAboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DealsView',
      component: DealsView
    },
    {
      path: '/:dealID',
      name: 'DealAbout',
      component: DealAboutView,
      beforeEnter: (to, from, next) => {
        if (from.name !== 'DealsView') {
          next({ name: 'DealsView' })
        } else {
          next()
        }
      }
    }
  ]
})

export default router
