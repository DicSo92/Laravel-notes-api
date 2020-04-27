require('./bootstrap');

window.Vue = require('vue');

import store from './store'
import VueRouter from 'vue-router'

import Notifications from 'vue-notification'

Vue.use(Notifications)

Vue.use(require('vue-moment'));

Vue.use(VueRouter)

let bus = new Vue
Vue.prototype.$bus = bus



import Index from "./Index";
import Home from "./views/Home";
import Notes from "./views/Notes";
import Note from "./views/Note";

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/notes',
            name: 'notes',
            component: Notes,
        },
        {
            path: '/notes/:noteId',
            props: true,
            name: 'noteId',
            component: Note,
        },
    ],
});

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        index: Index
    }
});
