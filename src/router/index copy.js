import Vue from 'vue';
import VueRouter from 'vue-router';
import studentMgrRoutes from '../views/StudentMgr/StudentMgr';
import classThingRoutes from '../views/ClassThing/ClassThing';
import studentThingRoutes from '../views/StudentThing/StudentThing';
import basicInfoRoutes from '../views/BasicInfo/BasicInfo';
import systemMgrRoutes from '../views/SystemMgr/SystemMgr';
import systemLogRoutes from '../views/SystemLog/SystemLog';
import dataDicRoutes from '../views/SystemMgr/DataDic/DataDic';



Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }
    // var logierData = JSON.parse(localStorage.getItem("loginData")).RoleCode;


const routes = [{
        path: '',
        // redirect: '/Headmaster/Login'
        redirect: '/Headmaster/Login'
    },
    // 404page
    // {
    //     path: '/errorinfo',
    //     name: 'Errorinfo',
    //     component: Errorinfo
    // }, {
    {
        path: '/Headmaster',
        // redirect: '/Headmaster/Login'
        redirect: '/Headmaster/Login'
    },


    {
        path: "/404",
        name: "msm",
        component: resolve => require(['../views/error.vue'], resolve),
    },
    // {
    //     path: "*", // 此处需特别注意置于最底部
    //     redirect: "/404"
    // },
    {
        // path: '/Headmaster/Login',
        path: "/Headmaster/Login",
        name: 'Login1',
        component: resolve => require(['../views/Login.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        }
    },
    {
        // path: '/Headmaster/Login',
        path: "/Admin/Login",
        name: 'Login2',
        component: resolve => require(['../views/Login.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        }
    },
    {
        //注册
        path: '/register/Index',
        name: 'register_Index',
        component: resolve => require(['../views/register/Index.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
    },

    {
        path: '/:logierData',
        name: '/Headmaster',

        component: resolve => require(['../views/Headmaster.vue'], resolve),
        meta: {
            title: "尧瑶科技-班主任工作手册"
        },
        redirect: '/:logierData/Home/Index', // 默认起始页
        children: [
            //**********> Home <*************** 首页
            {
                path: 'Home/Index',
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
        ]
    },
];

const router = new VueRouter({
    //mode: 'history',  //去掉url中的#
    mode: 'history',
    base: '',
    routes: routes
});


// 挂载路由导航守卫
router.beforeEach((to, from, next) => {

    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //     next()  放行    next('/login')  强制跳转

    if (to.path === '/Headmaster/Login') return next()
    if (to.path == '/Admin/Login') return next()
    if (to.path === '/register/Index') return next()
    if (to.path === '/register/Index') return next()

    if (to.path == "/404") return next()
    var nowpath = to.path
        // console.log(nowpath)
    nowpath = nowpath.slice(1)
    nowpath = nowpath.slice(0, nowpath.indexOf('/'))
        // console.log(nowpath)
    const logierData = JSON.parse(localStorage.getItem("loginData")) || [];
    // if (to.matched.length === 0) { //如果未匹配到路由
    //     console.log('如果未匹配到路由');
    //     from.name ? next({ name: from.name }) : next('/404'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    // }
    // console.log(logierData.RoleCode);
    if (nowpath == "Teacher" || nowpath == "Admin") {
        // if (to.matched.length === 0) { //如果未匹配到路由
        //     console.log('如果未匹配到路由');
        //     from.name ? next({ name: from.name }) : next('/404'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
        // }

        // console.log(logierData);
        if (JSON.parse(localStorage.getItem("loginData"))) {
            // console.log(logierData.RoleCode);
            // console.log(nowpath, '1');
            if (nowpath !== logierData.RoleCode) {

                // console.log('头有属性 有role但不相等');

                var a = to.path.replace(nowpath, logierData.RoleCode)
                    // console.log(a);
                next(a)
                    // history.back()
            } else {
                // console.log('未匹配路由');
                if (to.matched.length === 0) { //如果未匹配到路由
                    from.name ? next({ name: from.name }) : next('/404'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
                }
                next()
            }
            //     // localStorage.clear();
        } else {
            // console.log(nowpath, '111');

            // next('/404')
            if (to.path == '/Headmaster/Home/Index' || to.path == '/Admin/Home/Index') {
                next()
            } else { next('/Headmaster/Login'); }

        }

    } else {
        if (logierData == true) {
            // console.log(from.matched);
            // console.log(from, to);
            if (to.matched.length > 0) {
                // next('/404')
                if (nowpath !== logierData.RoleCode) {

                    // console.log('头有属性 有role但不相等');

                    var a = to.path.replace(nowpath, logierData.RoleCode)
                        // console.log(a);
                    next(a)
                        // history.back()
                }


            } else {
                // next('/404')


            }


        } else {
            // console.log('三五');
            // next('/notFound')
            next('/Headmaster/Login');
        }

    }


})

export default router;