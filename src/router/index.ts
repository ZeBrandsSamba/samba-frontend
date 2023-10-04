import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from '../views/Dashboard.vue'
import Home from '../views/Home.vue';
import Responses from '../views/Responses.vue';
import Survey from '../views/Survey.vue';

const routes = [
    {
        path: '/',
        component: Home,
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
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
