import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import '@/assets/css/index.css'
import router from './router'
import { createProvider } from './vue-apollo'
import {Auth, AxiosTransport, Directus, LocalStorage} from '@directus/sdk';
import {API_URL} from "@/constants/settings";
import vuetify from './plugins/vuetify';

const storage = new LocalStorage();
// Transport used to communicate with the server.
const transport = new AxiosTransport(API_URL, storage, async () => {
  await auth.refresh(); // This is how axios checks for refresh
});

// Auth is how authentication is handled, stored, and refreshed.
const auth = new Auth(transport, storage, {
  mode: 'json'
});

export const directus = new Directus(API_URL, {
  auth,
  storage,
  transport,
});

Vue.config.productionTip = false
//Vue.config.errorHandler = (error) => ErrorService.onError(error);

new Vue({
  router,
  apolloProvider: createProvider(),
  vuetify,
  render: h => h(App)
}).$mount('#app')
