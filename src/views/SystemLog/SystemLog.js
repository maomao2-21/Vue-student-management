export default [{
        path: '/SystemLog/LoginLog/Index',
        name: 'SystemLog_LoginLog',
        component: resolve => require(['../SystemLog/LoginLog/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/SystemLog/OperateLog/Index',
        name: 'SystemLog_OperateLog',
        component: resolve => require(['../SystemLog/OperateLog/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/SystemLog/AuditLog/Index',
        name: 'SystemLog_AuditLog',
        component: resolve => require(['../SystemLog/AuditLog/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/SystemLog/ExceptionLog/Index',
        name: 'SystemLog_ExceptionLog',
        component: resolve => require(['../SystemLog/ExceptionLog/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/SystemLog/SmsLog/Index',
        name: 'SystemLog_SmsLog',
        component: resolve => require(['../SystemLog/SmsLog/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
];