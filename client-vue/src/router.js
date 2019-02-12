import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import DayStats from './components/DayStats.vue'
import LastStats from './components/LastStats.vue'
import MonthStats from './components/MonthStats.vue'
import IndexSummary from './components/IndexSummary.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/sumindex/:days', name: 'sumindex', component: IndexSummary },
    { path: '/daystat/:days', name: 'dstats', component: DayStats },
    { path: '/last/:days', name: 'laststats', component: LastStats },
    { path: '/monthstat/:days', name: 'monthstats', component: MonthStats },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      /* eslint-disable */
      component: () => import(/* webpackChunkName: "about" */ './components/About.vue') // eslint-disable-line
      /* eslint-enable */
    }
  ]
})
