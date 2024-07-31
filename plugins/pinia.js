import { createApp } from 'vue';
import pinia from '../store/store';

const app = createApp({});
app.use(pinia);
app.mount('#app');