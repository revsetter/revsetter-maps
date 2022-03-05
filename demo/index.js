import {createApp } from 'vue';

import VueBlocksTree from '../dist/revsetter-maps.common';
import '../dist/revsetter-maps.css';


import App from './demo-app.vue';



createApp(App)
    // .component('blocks-tree',VueBlocksTree)
    .use(VueBlocksTree)
    .mount('#app');