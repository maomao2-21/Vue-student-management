// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import otherRoutes from './Default';
// import classThingRoutes from '../views/ClassThing/ClassThing';
// import studentThingRoutes from '../views/StudentThing/StudentThing';
// import basicInfoRoutes from '../views/BasicInfo/BasicInfo';
// import systemMgrRoutes from '../views/SystemMgr/SystemMgr';
// import systemLogRoutes from '../views/SystemLog/SystemLog';
// import dataDicRoutes from '../views/SystemMgr/DataDic/DataDic';


// Vue.use(VueRouter);
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

// const routes = [{
//         path: '',

//         redirect: '/Login'
//     },
//     {

//         path: "/Login",
//         name: 'Login',
//         component: resolve => require(['../views/Login.vue'], resolve),
//         meta: {
//             title: "尧瑶科技-班主任工作手册"
//         }
//     },


//     {
//         path: '/Headmaster',
//         name: '/Headmaster',
//         component: resolve => require(['../views/Headmaster.vue'], resolve),
//         meta: {
//             title: "尧瑶科技-班主任工作手册"
//         },
//         redirect: '/Home/Index', // 默认起始页
//         children: [
//             ...otherRoutes,
//             ...classThingRoutes,
//             ...studentThingRoutes,
//             ...basicInfoRoutes,
//             ...systemMgrRoutes,
//             ...dataDicRoutes,
//             ...systemLogRoutes,
//         ]
//     },
// ];

// const router = new VueRouter({
//     //mode: 'history',  //去掉url中的#
//     // mode: 'history',
//     base: '',
//     routes: routes
// });


// // 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//     // to 将要访问的路径
//     // from 代表从哪个路径跳转而来
//     // next 是一个函数，表示放行
//     //     next()  放行    next('/login')  强制跳转
//     console.log('1');
//     if (to.path === '/Login') return next()
//         // 获取token
//     if (to.path === '/Home/Index') return next()


//     var logierData = JSON.parse(localStorage.getItem("loginData")).RoleCode;


//     const path = window.location.pathname


//     const HeadH = window.location.pathname.includes('Headmaster')
//     const HeadA = window.location.pathname.includes('Admin')
//     if (HeadH) {
//         if (logierData !== 'Headmaster') {
//             var newpath = path.replace('Headmaster', logierData)
//             window.location.pathname = newpath


//         }

//     } else if (HeadA) {
//         if (logierData !== 'Admin') {
//             var newpath = path.replace('Admin', logierData)
//             window.location.pathname = newpath

//         }
//     } else {

//         history.back()
//     }
//     next()


// })


// export default router;