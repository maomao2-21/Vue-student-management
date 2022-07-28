export default [{
        path: '/SystemMgr/School/Index',
        name: 'SystemMgr_School',
        component: resolve => require(['../SystemMgr/School/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/SystemMgr/UserMgr/Index',
        name: 'SystemMgr_UserMgr',
        component: resolve => require(['../SystemMgr/UserMgr/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/SystemMgr/FunctionMgr/Index',
        name: 'SystemMgr_FunctionMgr',
        component: resolve => require(['../SystemMgr/FunctionMgr/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/SystemMgr/RoleMgr/Index',
        name: 'SystemMgr_RoleMgr',
        component: resolve => require(['../SystemMgr/RoleMgr/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
];