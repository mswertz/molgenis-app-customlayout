import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import DynamicTemplate from './components/DynamicTemplate.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  base: __dirname,
  routes: [
    { path: '/:id?', component: DynamicTemplate },
    { path: '/:id/:id2', component: DynamicTemplate }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
