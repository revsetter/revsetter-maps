import {createApp } from 'vue';

import VueBlocksTree from '../dist/revsetter-maps.common';
import '../dist/revsetter-maps.css';

import App from './demo-app.vue';

createApp(App)
    .use(VueBlocksTree)
    .mount('#app');