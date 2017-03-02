import Vue from "vue";
import zoom from "./zoom.vue";
import * as util from "../../utils/util.js";

function create(parent, zoomOption){
    var zoomComponent = new Vue({
        data: function () {
            var defaultOption = {
                show: false,
                src: undefined,
                minWidth: undefined,
                maxWidth: undefined
            };
            return util.merge(defaultOption, zoomOption || {})
        },
        components: {
            zoom: zoom
        },
        template: '<zoom v-show="show" :src="src" :min-width="minWidth" :max-width="maxWidth" @zoom.close="close"></zoom>',
        methods: {
            close: function () {
                this.show = false;
            }
        }
    });
    zoomComponent.$mount().$appendTo(parent.el.parentNode);
    return zoomComponent;
}

function trigger(e) {
    if(!this.datePickerComponent){
        this.datePickerComponent = create(this, this.params.zoomOption)
    }
    this.datePickerComponent.show = true;
}

export  default {
    params: ["zoomOption"],
    bind: function () {
        if(this.el.src){
            if(!this.params.zoomOption){
                this.params.zoomOption = {}
            }
            this.params.zoomOption.src = this.el.src
        }
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
        //如果input不是相对定位
        this.el.addEventListener("click", trigger.bind(this), false)
    },
    update: function (newValue, oldValue) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
    },
    unbind: function () {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
        this.el.removeEventListener("click", trigger.bind(this))
    }
}
