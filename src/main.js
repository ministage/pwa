import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import '@/assets/css/index.css'
import router from './router'
//import ErrorService from './services/ErrorService'
import vuetify from './plugins/vuetify'
import { createProvider } from './vue-apollo'
import {Auth, AxiosTransport, Directus, LocalStorage} from '@directus/sdk';
import {API_URL} from "@/constants/settings";
import LogRocket from 'logrocket';
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

LogRocket.init('lfdcpq/californiapp');

Sentry.init({
  Vue,
  dsn: "https://5187f989104a4d57bf501251f066210d@o722539.ingest.sentry.io/5781703",
  integrations: [new Integrations.BrowserTracing({
    environment: 'production',
    tracingOptions: {
      trackComponents: true,
    },
    logErrors: true,
    attachProps: true,
    attachStacktrace: true,
  })],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

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
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
