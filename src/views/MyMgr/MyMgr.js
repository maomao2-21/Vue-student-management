export default [{
        path: '/MyMgr/Info/Index',
        name: 'MyMgr_Info',
        component: resolve => require(['../MyMgr/Info/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/MyMgr/RePassword/Index',
        name: 'MyMgr_RePassword',
        component: resolve => require(['../MyMgr/RePassword/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/MyMgr/ChangePhoneNumber/Index',
        name: 'MyMgr_ChangePhoneNumber',
        component: resolve => require(['../MyMgr/ChangePhoneNumber/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
];