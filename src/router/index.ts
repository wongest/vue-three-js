import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../pages/Home.vue';
import Zhuxing from '../pages/Zhuxing.vue';
import Zhuxing01 from '../pages/Zhuxing-01.vue';
import Space from '../pages/Space.vue';
import Canvas from '../pages/canvas/Canvas.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/zhuxing',
    name: 'Zhuxing',
    component: Zhuxing,
  },
  {
    path: '/zhuxing-01',
    name: 'Zhuxing-01',
    component: Zhuxing01,
  },
  {
    path: '/space',
    name: 'Space',
    component: Space,
  },
  {
    path: '/canvas',
    name: 'Canvas',
    component: Canvas,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
