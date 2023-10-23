import * as VueRouter from 'vue-router';
import Base1 from '../pages/base/1.vue'
import Base2 from '../pages/base/2.vue'
import About from '../pages/about/About.vue'

const routes = [
  { path: '/', component: Base1 },
  { path: '/base2', component: Base2 },
  { path: '/about', component: About },
]

const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router;