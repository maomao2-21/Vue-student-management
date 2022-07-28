export default [{
        path: '/StudentMgr/BasicInfo/Index',
        name: 'StudentMgr_BasicInfo',
        component: resolve => require(['../StudentMgr/BasicInfo/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/StudentMgr/ClassScore/Index',
        name: 'StudentMgr_ClassScore',
        component: resolve => require(['../StudentMgr/ClassScore/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/StudentMgr/ExcellentCadre/Index',
        name: 'StudentMgr_ExcellentCadre',
        component: resolve => require(['../StudentMgr/ExcellentCadre/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
];