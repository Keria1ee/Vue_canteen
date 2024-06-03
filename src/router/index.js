import {createRouter, createWebHistory} from 'vue-router'

import login from '/src/views/Login.vue'
import layout from '/src/views/layout.vue'
import canteen from '/src/views/canteen.vue'
import order from '/src/views/orderlist.vue'
import buy from '/src/views/orderbuy.vue'
import preorder from '/src/views/preorder.vue'
import room from '/src/views/room.vue'
const routes = [
    {path: '/login', component: login},
    {path: '/',
        component: layout,redirect: '/canteen',

        children: [
            {path: '/canteen', component: canteen},
            {path: '/order', component: order},
            {path: '/buy', component: buy},
            {path: '/preorder', component: preorder},
            {path: '/room', component: room}
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


export default router