// eslint-disable-next-line
/* eslint-disable */
import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

// Opcional: Si quieres hacer axios disponible globalmente en todos tus componentes.

app.config.globalProperties.$axios = axios;



app.mount('#app');

