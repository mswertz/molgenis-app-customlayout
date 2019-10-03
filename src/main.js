import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import DynamicTemplate from './components/DynamicTemplate.vue'
// import RecordViewer from './components/RecordViewer.vue'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/:id?', component: DynamicTemplate }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
