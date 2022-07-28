import {post,get,delet,put} from '../request/http';
import moment from 'moment/moment';
export function requestHandle(id,url,data){       // 编辑与新增统一的
    if(id){

        put(url,data).then(function (r) {
            history.go(-1);
        });
        } else {

        post(url,data).then(function (r) {
            history.go(-1);
        });

        }
}
export function sysPow(code){
    let have=false
    let pows=JSON.parse(localStorage.getItem("loginData")).FunctionCodes
    pows.forEach(element => {
        if(element==code){
            have=true
        }
    });
    return have
}

export function timeToDay(time){

    return moment(time).format('YYYY/MM/DD');
}

export function timeToMin(time){

    return moment(time).format('YYYY/MM/DD hh:mm:ss');
}