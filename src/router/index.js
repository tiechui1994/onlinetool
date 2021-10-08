import Vue from 'vue'
import Router from 'vue-router'


const index = r => require.ensure([], () => r(require('@/pages/index')), 'index');

const image = r => require.ensure([], () => r(require('@/pages/image')), 'image');
const coding = r => require.ensure([], () => r(require('@/pages/coding')), 'coding');

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: index,
    },
    {
        path: '/index',
        name: '',
        component: index,
        children: [
            {
                path: '/image',
                name: 'image',
                component: image,
                meta: ['图片转换'],
            },
            {
                path: '/coding',
                name: 'coding',
                component: coding,
                meta: ['编码转换'],
            }
        ]
    },
];

export default new Router({
    routes,
    mode: 'history',
    strict: process.env.NODE_ENV !== 'production'
})
