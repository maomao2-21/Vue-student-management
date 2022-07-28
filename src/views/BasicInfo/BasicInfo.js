export default [{
        path: '/BasicInfo/ClassMgr/Index',
        name: 'BasicInfo_ClassMgr',
        component: resolve => require(['../BasicInfo/ClassMgr/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/BasicInfo/CurriculumType/Index',
        name: 'BasicInfo_CurriculumType',
        component: resolve => require(['../BasicInfo/CurriculumType/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/BasicInfo/CurriculumMgr/Index',
        name: 'BasicInfo_CurriculumMgr',
        component: resolve => require(['../BasicInfo/CurriculumMgr/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/BasicInfo/SemesterSetting/Index',
        name: 'BasicInfo_SemesterSetting',
        component: resolve => require(['../BasicInfo/SemesterSetting/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
];