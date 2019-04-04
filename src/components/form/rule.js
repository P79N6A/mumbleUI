import AsyncValidator from 'async-validator';

// 手机号
AsyncValidator.register('mobile', function (rule, value, cb) {
    if (value != '' && !/^1\d{10}$/.test(value)) {
        cb(new Error(rule.message || `请输入正确的手机号码`))
    } else {
        cb()
    }
})

// 中文名
AsyncValidator.register('cname', function (rule, value, cb) {
    if (value != '' && !/^[\u4E00-\u9FA50-9a-zA-Z]{2,10}$/.test(value)) {
        cb(new Error(rule.message || `请输入正确的中文名`))
    } else {
        cb()
    }
})

// 密码
AsyncValidator.register('password', function (rule, value, cb) {
    if (value != '' && (value.length > 16 || value.length < 8 || !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,16}$/.test(value))) {
        cb(new Error(rule.message || `请输入正确的密码，必须包含大写、小写字符和数字，8-16位`))
    } else {
        cb()
    }
})

// 金额
AsyncValidator.register('money', function (rule, value, cb) {
    var len = rule.afterPoint || 2;
    if (value != '' && !new RegExp(`(^[1-9]\\d*(\\.\\d{1,${len}})?$)|(^0(\\.\\d{1,${len}})?$)`).test(value)) {
        cb(new Error(rule.message || `请输入正确的金额`))
    } else {
        cb()
    }
})

// 相等
AsyncValidator.register('equal', function (rule, value, cb) {
    var enqualTo = rule.enqualTo;
    if (value != enqualTo) {
        cb(new Error(rule.message))
    } else {
        cb()
    }
})

// 不小于
AsyncValidator.register('min', function (rule, value, cb) {
    var minTo = rule.minTo;
    if (value !== '' && value !== null && value !== undefined && Number(value) < Number(minTo)) {
        cb(new Error(rule.message))
    } else {
        cb()
    }
});

// 不大于
AsyncValidator.register('max', function (rule, value, cb) {
    var maxTo = rule.maxTo;
    if (value !== '' && value !== null && value !== undefined && Number(value) > Number(maxTo)) {
        cb(new Error(rule.message))
    } else {
        cb()
    }
});