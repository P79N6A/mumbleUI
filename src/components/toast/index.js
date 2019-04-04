import Vue from 'vue';
import toastComponent from './toast.vue';
import swapComponent from './swap.vue';
import * as util from '../../utils/util.js';

let swapTop = null;
let swapCenter = null;

let init = function (align, parent) {
    if (!(parent instanceof Vue)) {
        // 使用mixin事先收集了root
        parent = toast.root;
    }
    if (align == 'top') {
        if (!swapTop) {
            swapTop = new Vue({
                parent,
                components: {
                    'swap': swapComponent
                },
                template: '<swap align="top"></swap>'
            });
            let vm = swapTop.$mount();
            document.body.appendChild(vm.$el);
            return swapTop
        } else {
            return swapTop
        }
    }
    if (align == 'center') {
        if (!swapCenter) {
            swapCenter = new Vue({
                parent,
                components: {
                    'swap': swapComponent
                },
                template: '<swap align="center"></swap>'
            });
            let vm = swapCenter.$mount();
            document.body.appendChild(vm.$el);
            return swapCenter
        } else {
            return swapCenter
        }
    }
}

let create = function (option, parent) {
    // 初始化
    let $swap = init(option.align, parent);

    let toast = new Vue({
        parent: $swap,
        components: {
            'toast': toastComponent
        },
        data: function () {
            return option
        },
        mounted: function () {
            setTimeout(()=> {
                this.$destroy();
            }, this.duration);
        },
        destroyed: function () {
            this.onClose && this.onClose();
            this.$el.remove();
        },
        template: '<toast :message="message" :type="type"></toast>'
    });

    toast.$mount();
    $swap.$el.appendChild(toast.$el);

    return function () {
        toast.$destroy();
        toast = null;
    }
};

let param = function (option) {
    option = option || {}
    option.duration = option.duration || 3000;
    option.align = option.align || 'center';
    option.onClose = option.onClose || new Function();
    return option
}

var toast = function (message, option) {
    if (!message) {
        return
    }
    let vm = this;
    return create(util.merge(param(option), {
        message: message,
        type: 'info'
    }), vm)
};

toast.error = (message, option)=> {
    if (!message) {
        return
    }
    return create(util.merge(param(option), {
        message: message,
        type: 'error'
    }))
};

toast.warn = function (message, option) {
    if (!message) {
        return
    }
    return create(util.merge(param(option), {
        message: message,
        type: 'warn'
    }))
};

toast.success = function (message, option) {
    if (!message) {
        return
    }
    return create(util.merge(param(option), {
        message: message,
        type: 'success'
    }))
};

export default toast;
