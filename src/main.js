import { createApp } from 'vue';
import './assets/all.scss';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.mount('#app');
