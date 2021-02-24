import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import store from '@/store/store'
 
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2,{toast:true,position:'bottom',grow:'column'})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
