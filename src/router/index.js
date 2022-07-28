import Vue from 'vue';
import VueRouter from 'vue-router';
import studentMgrRoutes from '../views/StudentMgr/StudentMgr';
import classThingRoutes from '../views/ClassThing/ClassThing';
import studentThingRoutes from '../views/StudentThing/StudentThing';
import basicInfoRoutes from '../views/BasicInfo/BasicInfo';
import systemMgrRoutes from '../views/SystemMgr/SystemMgr';
import systemLogRoutes from '../views/SystemLog/SystemLog';
import dataDicRoutes from '../views/SystemMgr/DataDic/DataDic';
import myMgrRoutes from '../views/MyMgr/MyMgr';
// import myMgrRoutes from '../views/MyMgr/MyMgr';



Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}



// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//         return originalPush.call(this, location).catch(err => err)
//     }
// var logierData = JSON.parse(localStorage.getItem("loginData")).RoleCode;


const routes = [{
        path: '',
        redirect: '/Login'
    },
    {
        path: "/404",
        name: "404",
        component: resolve => require(['../views/error.vue'], resolve),
    },
    {
        path: "/Forget",
        name: 'Forget',
        component: resolve => require(['../views/Forget.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        }
    },
    {
        path: "/Login",
        name: 'Login',
        component: resolve => require(['../views/Login.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        }
    },
    {
        path: '/Register',
        name: 'Register',
        component: resolve => require(['../views/Register.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },
    {
        path: '/Headmaster',
        name: '/Headmaster',
        hidden: true,
        component: resolve => require(['../views/Headmaster.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
        redirect: '/Home/Index', // 默认起始页
        children: [{
                path: '/Home/Index',
                name: 'Home_Index',
                component: resolve => require(['../views/Home/Index.vue'], resolve),
                meta: {
                    title: "尧瑶科技-班主任工作手册"
                },
            },

            ...studentMgrRoutes,
            ...classThingRoutes,
            ...studentThingRoutes,
            ...basicInfoRoutes,
            ...systemMgrRoutes,
            ...dataDicRoutes,
            ...systemLogRoutes,
            ...myMgrRoutes
        ]
    },

];


const router = new VueRouter({
    //mode: 'history',  //去掉url中的#
    mode: 'hash',
    base: '',
    routes: routes
});


// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    const pathname = window.location.pathname;
    if (pathname == "/" || pathname == "/Admin/") {} else if (pathname.toLowerCase().indexOf("/admin") == 0) {
        window.location = window.location.origin + "/Admin/";
    } else {
        window.location = window.location.origin;
    }

    if (to.path === '/Login') return next();
    if (to.path === '/Register') return next();
    if (to.path === '/Forget') return next();
    if (to.matched.length == 0) return next('/404');
    if (to.path == "/404") return next();
    const logierData = JSON.parse(localStorage.getItem("loginData"));
    if (!logierData || !logierData.Id) return next('/Login');
    return next();
})



export default router;