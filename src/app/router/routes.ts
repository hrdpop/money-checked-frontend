import { Home } from '../../pages/home'
import type { RouteRecordRaw } from 'vue-router'

export const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Домашняя страница',
    component: Home
  },
  {
    path: '/setting',
    name: 'Настройки',
    component: Home,
    children: [
      {
        path: '/no-setting',
        name: 'Не настройки',
        component: Home
      },
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('@pages/about-view'),
  // },
]
