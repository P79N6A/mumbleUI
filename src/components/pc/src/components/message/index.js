import Vue from "vue";
import messageComponent from "./message.vue";
import * as util from "../../utils/util.js";

var showingMessage = null;
var defaultOpt = {
    title: '',
    template: '',
    buttons: [{
        text: '确定',
        class: "",
        show: true
    },{
        text: "取消",
        class: "",
        show: false
    }]
};

var init = function () {
    var opt = {};
    if(typeof arguments[0] == "string"){
       util.merge(opt, defaultOpt);
        if(arguments[1]){
            opt.title = arguments[0];
            opt.template = arguments[1];
        }else{
            opt.template = arguments[0];
        }
    }else{
        var config = arguments[0];
        if(Vue.util.isPlainObject(config) && config.buttons && Vue.util.isArray(config.buttons)){
            if(config.buttons.length > 2){
                config.buttons.splice(2)
            }
        }else{
            if(config.buttons){
                delete config.buttons
            }
        }
        util.merge(opt, defaultOpt, config)
    }
    return opt;
};

var create = function (option) {
    if(showingMessage){
        showingMessage.$destroy(true);
        showingMessage = null
    }
    var promise = new Promise(function(resolve, reject) {
        var message = showingMessage = new Vue({
            data: option,
            components: {
                'message': messageComponent
            },
            template: '<message :title="title" :template="template" :buttons="buttons"></message>',
            ready: function () {
                this.$on("message.close", function (index) {
                    this.$destroy(true);
                    resolve(index)
                })
            }
        });
        message.$mount().$appendTo('body');
    });
    return promise
};

var message = function() {
    return create(init.apply(this, arguments))
};

message.alert = function () {
    var opt = init.apply(this, arguments);
    //alert只显示一个按钮
    opt.buttons[1].show = false;
    return create(opt);
};

message.confirm = function (option) {
    var opt = init.apply(this, arguments);
    //confirm显示两个按钮
    opt.buttons[1].show = true;
    return create(opt);
};

export default message;
