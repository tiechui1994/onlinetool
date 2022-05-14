import Vue from 'vue'
import Router from 'vue-router'


const index = r => require.ensure([], () => r(require('@/pages/index')), 'index');

const image = r => require.ensure([], () => r(require('@/pages/image')), 'image');
const questions = r => require.ensure([], () => r(require('@/pages/questions')), 'questions');
const topic = r => require.ensure([], () => r(require('@/pages/topic')), 'topic');

const echart = r => require.ensure([], () => r(require('@/pages/echart')), 'echart');

Vue.use(Router);

const routes = [
    {
        path: '/',
        component: index,
    },
    {
        path: '/echart',
        name: 'echart',
        component: echart,
    },
    {
        path: '/questions/topic',
        name: 'topic',
        component: topic,
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
                path: '/questions',
                name: 'questions',
                component: questions,
                meta: ['SHL测试'],
            }
        ]
    },
];

export default new Router({
    routes,
    mode: 'history',
    strict: process.env.NODE_ENV !== 'production'
})
