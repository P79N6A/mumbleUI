import Vue from "vue";
import toastComponent from "./toast.vue";


var showingToast = null;

var init = function (option) {
    if(!option) return;
    if(typeof option == "string" || typeof option == "number"){
        var message = option;
        option = {
            message: message,
            duration: 2000
        }
    }else if(typeof option == "object"){
        if(!option.message) return;
        option.duration = option.duration || 3000;
    }else{
        return
    }
    return option
};

var create = function (option) {
    if(showingToast){
        showingToast.$destroy(true);
        showingToast = null
    }
    var toast = showingToast = new Vue({
        data: option,
        components: {
            'toast': toastComponent
        },
        template: '<toast :message="message" :type="type"></toast>',
        ready: function () {
            setTimeout(()=> {
                this.$destroy(true);
            }, this.duration);
        }
    });
    toast.$mount().$appendTo('body');
    return toast
};

var toast = function(option) {
    var _option = init(option);
    if(!_option) return;
    _option.type = "info";
    return create(_option)
};

toast.error = function (option) {
    var _option = init(option);
    if(!_option) return;
    _option.type = "error";
    return create(_option)
};

toast.warn = function (option) {
    var _option = init(option);
    if(!_option) return;
    _option.type = "warn";
    return create(_option)
};

toast.success = function (option) {
    var _option = init(option);
    if(!_option) return;
    _option.type = "success";
    return create(_option)
};

export default toast;
