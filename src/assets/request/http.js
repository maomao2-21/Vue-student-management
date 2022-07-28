import axios from 'axios' // 引入axios
import router from '../../router/index'
import {
    Loading
} from 'element-ui';
import {
    Message,
} from 'element-ui'
let headers = null
//创建一个ajax get请求
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'https://localhost:5020'; // 开发环境
    // axios.defaults.baseURL = 'https://www.oknb.net'; // 开发环境
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = ''; // 生产环境
}
// 请求拦截器
let options = {
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(255,255,255,0.4)'
}
let loadingInstance

function loading() {
    loadingInstance = Loading.service(options);
}

function closeLoading() {
    app_this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close();
    });
}
var qs = require('qs');
axios.interceptors.request.use(
    config => {
        if (config.method == "get" || config.method == "delete") {
            config.paramsSerializer = function (params) {
                var query = qs.stringify(params, {
                    arrayFormat: 'repeat'
                });
                return query;
            }
        }
        if (localStorage.getItem("loginData")) {
            var logierData = JSON.parse(localStorage.getItem("loginData"));
            config.headers = {
                'Content-Type': 'application/json;charset=UTF-8',
                'access-token': 'Bearer' + " " + logierData.Token,
                'x-access-token': 'Bearer' + " " + logierData.RefreshToken,
                'Authorization': 'Bearer' + " " + logierData.Token,
                'X-Authorization': 'Bearer' + " " + logierData.RefreshToken,
            }
        }
        return config;
    },
    error => {
        return Promise.error(error)
    }
)
// 响应拦截器
axios.interceptors.response.use( // 服务码是200的情况
    response => {
        if (response.status === 200 || response.status === 204) {

            if (response.data.Succeeded) {
                return Promise.resolve(response);
            } else if (response.data.StatusCode === 401) {
                Message({
                    message: '登陆失效！',
                    type: 'warning',
                });
                router.push("/Login")
            } else if (response.data.StatusCode === 403) {
                Message({
                    message: '没有权限！',
                    type: 'warning',
                });
            } else {
                Message({
                    message: response.data.Errors,
                    type: 'warning',
                });
                return Promise.reject(response);
            }

        } else {
            return Promise.reject(response)
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 404请求不存在
                case 404:
                    Message({
                        message: '网络请求不存在',
                        type: 'warning',
                    });
                    break;

                case 401:
                    Message({
                        message: '登陆失效！',
                        type: 'warning',
                    });
                    router.push("/Login")
                    break;
                case 403:
                    Message({
                        message: '没有权限',
                        type: 'warning',
                    });
                    router.push("/Login")
                    break;
                case 415:
                    Message({
                        message: '请求错误',
                        type: 'warning',
                    });
                    break;
                case 500:
                    Message({
                        message: '服务器异常',
                        type: 'warning',
                    });
                    break;

                default:
                    Message({
                        message: error.response.data.Errors,
                        type: 'warning',
                    });
            }
            return Promise.reject(error.response)
        }
    }
)

export const baseURL = axios.defaults.baseURL;

export function get(url, params) {
    // loading()
    return new Promise((resolve) => {
        axios.get(url, {
            params: params
        }).then(res => {
            // closeLoading()
            resolve(res.data.Data)
        }).catch(res => {
            // closeLoading()
        })
    })
}

export function post(url, params) {
    loading()
    return new Promise((resolve) => {
        axios.post(url, params)
            .then(function (res) {
                closeLoading()
                Message.success("执行成功");
                resolve(res.data.Data)
            }).catch(res => {
                closeLoading()
            })
    })
}

export function put(url, params) {
    loading()
    return new Promise((resolve) => {
        axios.put(url, params)
            .then(function (res) {
                closeLoading()
                Message.success("执行成功");
                resolve(res.data.Data)
            }).catch(res => {
                closeLoading()
            })
    })
}

export function delet(url, params) {
    loading()
    return new Promise((resolve) => {
        axios.delete(url, {
            params: params
        }).then(function (res) {
            closeLoading()
            Message.success("执行成功");
            resolve(res.data.Data)
        }).catch(res => {
            closeLoading()
        })
    })
}