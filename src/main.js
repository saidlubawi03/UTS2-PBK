import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.css';
import './styles.css';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(Quasar);
app.mount('#app');