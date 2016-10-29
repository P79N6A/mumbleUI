/**
 * Created by Administrator on 2016/8/28.
 */
import Vue from "vue";
import datePicker from "./datePicker.vue";

function create($el, styleObject){
    var datePickerCompnent = new Vue({
        data: function () {
            return {
                value: null,
                styleObject: styleObject
            }
        },
        components: {
            datePicker: datePicker
        },
        template: '<date-picker :value="value" :inline="false" :style-object="styleObject" @update="update"></date-picker>',
        ready: function () {
        },
        methods:{
            update: function () {

            }
        }
    });
    datePickerCompnent.$mount().$appendTo($el.parentNode);
    return datePickerCompnent;
}

export  default {
    bind: function () {
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
        console.log(this)
        var $dom = this.el;
        this.offset = {
            left: 0,
            top: 0,
            position: null,
        };
        //如果input不是相对定位
        setTimeout(()=> {
            var style =  window.getComputedStyle($dom, null);
            var rect = $dom.getBoundingClientRect();
            var height = rect.height || (rect.bottom - rect.top);
            var width = rect.width || (rect.right - rect.left);
            if(style.position == "fixed" || style.position == "absolute"){
                this.offset.position = style.position;
                this.offset.left = Number(/^([0-9]*)/.exec(style.left)[0]) + "px";
                this.offset.top = height + Number(/^([0-9]*)/.exec(style.top)[0]) + 5 + "px";
            }else{
                this.offset.position = "absolute";
                //如果target元素不在任何相对定位下，则直接计算离屏幕的高度
                if(!$dom.offsetParent){
                    this.offset.left = rect.left + document.documentElement.scrollLeft + "px";
                    this.offset.top = height + rect.top + document.documentElement.scrollTop + 5 + "px";
                }else{
                    // offsetTop和offsetLeft表示该元素的左上角（边框外边缘）与已定位的父容器（offsetParent对象）左上角的距离
                    this.offset.left = $dom.offsetLeft + "px";
                    this.offset.top =  $dom.offsetTop + height + 5 + "px";
                }
            }
            this.datePickerCompnent = create(this.el, this.offset);
        });
    },
    update: function (newValue, oldValue) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
        if(newValue){
        }
    },
    unbind: function () {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
    }
}
