import {RouterConfig} from "@nuxt/schema";

export default <RouterConfig> {
    routes: (_routes) => [
        {
            name: 'login',
            path: '/authentication/login',
            component: () => import('~/pages/authentication/signin/basic.vue'),
            meta: {
                layout: 'authentication',
            },
        },
        {
            name: 'auth',
            path: '/',
            component: () => import('~/pages/authentication/signin/basic.vue'),
            meta: {
                layout: 'authentication',
            },
        },

        // security
        {
            name: 'dashboard',
            path: '/dashboard',
            component: () => import('~/pages/dashboards/default.vue').then(r => r.default || r)
        },
        {
            name: 'users',
            path: '/security/users',
            component: () => import('~/pages/security/mng/UserManagement.vue').then(r => r.default || r)
        },
        {
            name: 'menu-list',
            path: '/security/menu-list',
            component: () => import('~/pages/security/menu-definition/List.vue').then(r => r.default || r)
        },
        {
            name: 'systemDefinition',
            path: '/security/systemDefinition',
            component: () => import('~/pages/security/SystemDefinition.vue').then(r => r.default || r)
        },
        {
            name: 'ChangePass',
            path: '/security/ChangePass',
            component: () => import('~/pages/security/ChangePass.vue').then(r => r.default || r)
        },
        {
            name: 'security',
            path: '/security/roles',
            component: () => import('~/pages/security/roles/Management.vue').then(r => r.default || r)
        },


        // survey
        {
            name: 'management0',
            path: '/survey/monitoring-list/0',
            component: () => import('~/pages/survey/monitoring/List.vue').then(r => r.default || r)
        },
        {
            name: 'management1',
            path: '/survey/monitoring-list/1',
            component: () => import('~/pages/survey/monitoring/List.vue').then(r => r.default || r)
        },
        {
            name: 'management',
            path: '/survey/monitoring-list/3',
            component: () => import('~/pages/survey/monitoring/List.vue').then(r => r.default || r)
        },
        {
            name: 'management2',
            path: '/survey/monitoring-list/2',
            component: () => import('~/pages/survey/monitoring/List.vue').then(r => r.default || r)
        },
        {
            name: 'management4',
            path: '/survey/monitoring-list/4',
            component: () => import('~/pages/survey/monitoring/List.vue').then(r => r.default || r)
        },
        {
            name: 'wageList',
            path: '/survey/wageList',
            component: () => import('~/pages/survey/wage/List.vue').then(r => r.default || r)
        },
        {
            name: 'mngSubject',
            path: '/survey/mngSubject',
            component: () => import('~/pages/survey/mng-contract-subject/Base.vue').then(r => r.default || r)
        },

        // loan

        {
            name: 'loan',
            path: '/loan/all',
            component: () => import('~/pages/loan/all/List.vue').then(r => r.default || r)
        },
        {
            name: 'loanTotal',
            path: '/loan/:id',
            component: () => import('~/pages/loan/all/Total.vue').then(r => r.default || r)
        },
        {
            name: 'Setwage',
            path: '/mp/wage/set',
            component: () => import('~/pages/loan/wage/Set.vue').then(r => r.default || r)
        },
        {
            name: 'wagelist',
            path: '/mp/wage/list',
            component: () => import('~/pages/loan/wage/List.vue').then(r => r.default || r)
        },
        {
            name: 'actorPursuit',
            path: '/mp/loan/actorPursuit',
            component: () => import('~/pages/loan/actorPursuit/List.vue').then(r => r.default || r)
        },

        //customers

        {
            name: 'customers',
            path: '/mp/customers',
            component: () => import('~/pages/customers/List.vue').then(r => r.default || r)
        },

        //oraclesqldifference

        {
            name: 'oraclesqldifference',
            path: '/mp/oraclesqldifference',
            component: () => import('~/pages/oracle-sql-difference/List.vue').then(r => r.default || r)
        },
    ]
}