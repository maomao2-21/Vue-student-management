const formValidation = {
    // 邮编验证
    valMal: (rule, value, callback) => {
        const reg = /^[0-9]{6}$/;
        if (!reg.test(value)) {
            callback();
            return false;
        } else {
            callback();
            return true;
        }
    },
    valLicensePlate: (rule, value, callback) => {
        if (value == "" || value == undefined) {
            callback();
            return false;
        }
        const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}$/;
        const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
        if (value.length == 7) {
            if (!xreg.test(value.substr(0, 2))) {
                callback();
                return false;
            } else {
                callback();
                return true;
            }
        } else if (value.length == 8) {
            if (!xreg.test(value.substr(0, 2))) {
                callback();
                return false;
            } else {
                callback();
                return true;
            }
        } else {
            callback();
            return false;
        }
    },
    // 验证正整数
    valPositiveInt: (rule, value, callback) => {
        const reg = /^[0-9]*[1-9][0-9]*$/;
        if (!(reg.test(value) || (Number(value) === 0))) {
            callback();
            return false;
        } else {
            callback();
            return true;
        }
    },
    // 验证手机号码
    valMobile: (rule, value, callback) => {
        const reg = /^1\d{10}$/;
        if (!reg.test(value)) {
            callback(new Error('请输入正确的手机号 '));
        } else {
            callback();
        }
    },
    // 用户名
    Account: (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z]{5,24}$/
        if (!value) {
            callback(new Error('请输入账号'));
        } else if (!reg.test(value)) {
            callback(new Error('请输入正确的账号 '));
        } else {
            callback();
        }
    },
    Password: (rule, value, callback) => {
        let reg = /^[0-9a-zA-Z\x21-\x7e]{5,24}$/
        if (!value) {
            callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
            callback(new Error('必须由字母、数字、标点符号组成的5~24位字符！'));
        } else {
            callback();
        }
    },

    PasswordA: (value) => {
        let reg = /^[0-9a-zA-Z\x21-\x7e]{5,24}$/
        if (!value) {
            return '请输入密码'
        } else if (!reg.test(value)) {
            return '请输入正确的密码'
        } else {
            return true
        }
    }

};

export default formValidation;