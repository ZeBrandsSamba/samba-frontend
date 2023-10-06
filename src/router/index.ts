import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../views/Dashboard.vue'
import Responses from '../views/Responses.vue';
import Survey from '../views/Survey.vue';

const routes = [
    {
        path: '/',
        component: Dashboard,
    },
    {
        path: '/dashboard',
        component: Dashboard,
    },
    {
        path: '/responses',
        component: Responses,
    },
    {
        path: '/survey',
        component: Survey,
        meta: {
            fullPage: true,
        },
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
