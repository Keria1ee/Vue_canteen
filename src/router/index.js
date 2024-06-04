import {createRouter, createWebHistory} from 'vue-router'

import login from '/src/views/Login.vue'
import layout from '/src/views/layout.vue'
import canteen from '/src/views/canteen.vue'
import order from '/src/views/orderlist.vue'
import buy from '/src/views/orderbuy.vue'
import preorder from '/src/views/preorder.vue'
import room from '/src/views/room.vue'
import NotFound from '/src/views/Notfound.vue'
import {useTokenStore} from "@/stores/token.js";
const routes = [
    {path: '/login', component: login},
    {path: '/',
        component: layout,redirect: '/login',

        children: [
            {path: '/canteen', component: canteen},
            {path: '/order', component: order},
            {path: '/buy', component: buy},
            {path: '/preorder', component: preorder},
            {path: '/room', component: room}
        ]
    },
    {path: '/:pathMatch(.*)*', name :'Not Found',component: NotFound}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// router.beforeEach((to, from, next) => {
//     const token =useTokenStore().token;
//     if (!token && to.path !== '/login') {
//         next('/login');
//     }else {
//         next();
//     }
// })

export default router