import { createWebHistory, createRouter } from 'vue-router';
import Base from '@/views/base.vue';
import List from '@/views/list.vue';
import Computed from '@/views/computeds.vue';
import Hello from '@/views/HelloWorld.vue';
import Form from '@/views/formModel.vue';
import Welcome from '@/views/welcome.vue';

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
  },
  { path: '/base', name: 'Base', component: Base },
  { path: '/list', name: 'List', component: List },
  { path: '/computed', name: 'Computed', component: Computed },
  { path: '/hello', name: 'Hello', component: Hello },
  { path: '/form', name: 'Form', component: Form },
  { path: '/life', name: 'Life', component: () => import('@/views/life.vue') },
  {
    path: '/user/:id',
    name: 'User',
    meta: {
      title: '用户详情'
    },
    component: () => import('@/views/user.vue')
  },
  {
    path: '/fa',
    name: 'Fa',
    component: () => import('@/views/father.vue'),
    children: [
      {
        path: 'son',
        name: 'Son',
        component: () => import('@/views/son.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const hasEntered = sessionStorage.getItem('hasEntered');
  if (!hasEntered && to.name !== 'Welcome') {
    next({ name: 'Welcome' });
  } else {
    next();
  }
});

export default router;
