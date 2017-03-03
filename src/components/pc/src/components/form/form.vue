<template>
    <form class="ui-form" :class="getClass">
        <slot></slot>
    </form>
</template>
<script type="text/ecmascript-6">
    export default {
        name: "WbForm",
        props: {
            value: {
                type: Object
            },
            rules: {
                type: Object
            },
            labelPosition: {
                type: String,
                default: "right"   //left、right、top
            },
            labelWidth: {
                type: Number,
                default: 80
            },
            showMessage: {
                type: Boolean,
                default: true
            },
            rule: Object
        },
        data: function () {
            return {
                validateFormItems: []
            }
        },
        computed: {
            getClass(){
                var arr = [];
                arr.push(`ui-form-position-${this.labelPosition}`);
                return arr;
            }
        },
        ready: function () {
            this.initItem(this);
        },
        destroy: function () {
        },
        methods: {
            /**
             * 初始化item的状态
             * @param parent
             */
            initItem: function (parent) {
                this.validateFormItems = [];
                parent.$children.forEach((child, index) => {
                    let _child = child;
                    while (_child &&　_child.$options.name !== 'FormItem') {
                        _child = _child.$children[0];
                    }
                    if(_child){
                        _child.labelWidth = this.labelWidth;
                        _child.labelPosition = this.labelPosition;
                        if(_child.prop && this.rule){
                            _child.rule = this.rule[_child.prop] || [];
                            if(_child.rule.filter((rule)=>{
                                    return rule.required
                                }).length > 0){
                                _child.required = true
                            }
                            if(_child.rule.length > 0){
                                this.validateFormItems.push(_child);
                            }
                        }
                    }
                });
                console.log(this.validateFormItems)
            },
            /**
             * 校验整个form
             * @param callback
             */
            validate: function (callback) {
                let len = this.validateFormItems.length;
                let valid = true;
                for(var i=0; i<len; i++){
                    var item =  this.validateFormItems[i];
                    item.validate(item.$children[0].value, (error)=>{
                        if(error){
                            valid = false;
                        }
                        if(typeof callback === 'function' && (i == len-1)){
                            callback(valid)
                        }
                    })
                }
            },
            /**
             * 校验filed
             * @param  filed
             * @param  callback
             */
            validateField: function (filed, callback) {
                let len = this.validateFormItems.length;
                let valid = true;
                for(var i=0; i<len; i++){
                    var item =  this.validateFormItems[i];
                    if(filed && item.prop == filed){
                        item.validate(item.$children[0].value, (error)=>{
                            if(error){
                                valid = false;
                            }
                            if(typeof callback === 'function'){
                                callback(valid)
                            }
                        });
                        break;
                    }
                }
            },
            /**
             * 重置校验结果, 如果传了filed则只重置这个，如果没有则重置所有
             * @param filed
             */
            resetFields: function (filed) {
                this.validateFormItems.forEach(item =>{
                    if(!filed){
                        item.resetField();
                    }else{
                        if(item.prop == filed){
                            item.resetField();
                        }
                    }
                })
            }
        }
    }
</script>
