<template>
    <form :class="getClass" :autocomplete="autocomplete" class="ui-form" @submit="handleSubmit">
        <slot />
    </form>
</template>
<script>
export default {
    name: 'WbForm',
    props: {
        labelPosition: {
            type: String,
            default: 'right' // left、right、top
        },
        labelWidth: {
            type: Number,
            default: 80
        },
        rule: {
            type: [Object, Array],
            default: undefined
        },
        type: {
            type: String,
            default: 'normal' // normal、query
        },
        showMessage: {
            type: Boolean,
            default: true
        },
        autocomplete: {
            type: String,
            default: 'off'
        }
    },
    data: function () {
        return {
            validateFormItems: []
        }
    },
    computed: {
        getClass() {
            var arr = [];
            arr.push(`ui-form-type-${this.type}`);
            return arr;
        },
        currentShowMessage() {
            if (this.type == 'query') {
                return false
            }
            return this.showMessage
        }
    },
    mounted: function () {
        this.$on('on-item-validate', function (errors) {
            this.$emit('on-validate', errors)
        });
    },
    methods: {
        addItem(item) {
            if (this.validateFormItems.indexOf(item) == -1) {
                if (item.prop && item.currentRule.length > 0) {
                    this.validateFormItems.push(item);
                }
            }
        },
        removeItem(item) {
            var index = this.validateFormItems.indexOf(item);
            if (index != -1) {
                this.validateFormItems.splice(index, 1)
            }
        },
        validate(callback) {
            let len = this.validateFormItems.length;
            let k = 0;
            let valid = true;
            let errorArr = [];
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    var item = this.validateFormItems[i];
                    // 第一个参数为”“表示校验所有规则
                    item.validate('', (errors)=>{
                        k++;
                        if (errors) {
                            valid = false;
                            errorArr.push(errors)
                        }
                        if (typeof callback === 'function' && (k == len)) {
                            callback(valid, errorArr)
                        }
                    })
                }
            } else {
                callback(valid, errorArr)
            }
        },
        validateField(filed, callback) {
            let len = this.validateFormItems.length;
            let valid = true;
            for (var i = 0; i < len; i++) {
                var item = this.validateFormItems[i];
                if (filed && item.prop == filed) {
                    // 第一个参数为”“表示校验所有规则
                    item.validate('', (errors)=>{
                        if (errors) {
                            valid = false;
                        }
                        if (typeof callback === 'function') {
                            callback(valid, errors)
                        }
                    });
                }
            }
        },
        resetFields(filed) {
            this.validateFormItems.forEach(item =>{
                if (!filed) {
                    item.resetField();
                } else {
                    if (item.prop == filed) {
                        item.resetField();
                    }
                }
            })
        },
        handleSubmit() {
            this.validate((valid, errorArr)=>{
                this.$emit('submit', valid, errorArr);
            })
        }
    }
}
</script>
