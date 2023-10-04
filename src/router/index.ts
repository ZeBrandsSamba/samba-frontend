import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Survey from '../views/Survey.vue';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/survey',
        component: Survey,
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
