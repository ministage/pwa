import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import '@/assets/css/index.css'
import router from './router'
import ErrorService from './services/ErrorService'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.config.errorHandler = (error) => ErrorService.onError(error);


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
