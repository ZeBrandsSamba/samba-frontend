import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Survey from '../views/Survey.vue';
import Dashboard from '../views/Dashboard.vue'

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
        path: '/survey',
        component: Survey,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
