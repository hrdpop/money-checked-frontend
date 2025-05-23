import { Home } from '../../pages/home'
import type { RouteRecordRaw } from 'vue-router'

export const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Домашняя страница',
    component: Home
  },
  {
    path: '/no-setting',
    name: 'Не настройки',
    component: Home,
    children: [
      {
        path: '/no-no-setting',
        name: 'Не не настройки',
        component: Home,
        children: [
          {
          path: '/no-no-no-setting',
          name: 'Не не не настройки',
          component: Home
          }
        ]
      },
    ]
  },
  {
    path: '/setting',
    name: 'Настройки',
    component: Home,
    children: [
      {
        path: '/setting-setting',
        name: 'Настройки настройки',
        component: Home,
        children: [
          {
            path: '/setting-setting-setting',
            name: 'Настройки настройки настройки',
            component: Home
          }
        ]
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
