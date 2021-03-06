import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Veevalidation from './includes/validation';
import { auth } from './includes/firebase';
import './assets/tailwind.css';
import './assets/main.css';
import Icon from './directives/icon';
import i18n from './includes/i18n';
import './registerServiceWorker';
import GlobalComponents from './includes/_globals';
import ProgressBar from './includes/progress-bar';
import 'nprogress/nprogress.css';

ProgressBar(router);

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(i18n);

    app.use(store);
    app.use(router);
    app.use(Veevalidation);
    app.use(GlobalComponents);
    app.directive('icon', Icon);
    app.mount('#app');
  }
});
