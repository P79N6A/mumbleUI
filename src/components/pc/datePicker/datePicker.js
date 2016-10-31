/**
 * Created by Administrator on 2016/8/28.
 */
import Vue from "vue";
import datePicker from "./datePicker.vue";
import * as util from "../../util.js";

function create(parent, datePickerOption){
    var datePickerComponent = new Vue({
        data: function () {
            var defaultOption = {
                show: false,
                value: null,
                enableTime: false,
                enableSeconds: false,
                hourIncrement: 1,
                minuteIncrement: 5,
                secondIncrement: 5,
                maxDate: null,
                minDate: null,
                disable: [],
                enable: [],
                styleObject: {
                }
            };
            return util.extend(defaultOption, datePickerOption || {})
        },
        components: {
            datePicker: datePicker
        },
        template: '<date-picker v-show="show" :value="value" :enable-time="enableTime" @click.stop="" \
                        :enable-seconds="enableSeconds"  \
                        :hour-increment="hourIncrement" \
                        :minute-increment="minuteIncrement" \
                        :second-increment="secondIncrement" \
                        :max-date="maxDate" :min-date="minDate" :disable="disable" :enable="enable" \
                        :inline="false" :style-object="styleObject" @update="update"></date-picker>',
        ready: function () {
        },
        methods:{
            update: function (data) {
                parent.vm[parent.expression] = data.value;
                parent.el.value = data.text;
            }
        }
    });
    datePickerComponent.$mount().$appendTo(parent.el.parentNode);
    return datePickerComponent;
}
function trigger(e) {
    if(!this.datePickerComponent) return;
    if(e.target == this.el){
        this.datePickerComponent.show = true;
    }else {
        this.datePickerComponent.show = false;
    }
}

export  default {
    params: ["datePickerOption"],
    bind: function () {
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
        var $dom = this.el;
        $dom.setAttribute("readOnly", true);
        this.offset = {
            left: 0,
            top: 0,
            position: null,
        };
        //如果input不是相对定位
        this.vm.$nextTick(()=> {
            var style =  window.getComputedStyle($dom, null);
            var rect = $dom.getBoundingClientRect();
            var height = rect.height || (rect.bottom - rect.top);
            var width = rect.width || (rect.right - rect.left);
            if(style.position == "fixed" || style.position == "absolute"){
                this.offset.position = style.position;
                this.offset.left = Number(/^([0-9]*)/.exec(style.left)[0]) + "px";
                this.offset.top = height + Number(/^([0-9]*)/.exec(style.top)[0]) + 10 + "px";
            }else{
                this.offset.position = "absolute";
                //如果target元素不在任何相对定位下，则直接计算离屏幕的高度
                if(!$dom.offsetParent){
                    this.offset.left = rect.left + document.documentElement.scrollLeft + "px";
                    this.offset.top = height + rect.top + document.documentElement.scrollTop + 10 + "px";
                }else{
                    // offsetTop和offsetLeft表示该元素的左上角（边框外边缘）与已定位的父容器（offsetParent对象）左上角的距离
                    this.offset.left = $dom.offsetLeft + "px";
                    this.offset.top =  $dom.offsetTop + height + 10 + "px";
                }
            }
            this.params.datePickerOption.styleObject = this.offset;
            if(this.vm[this.expression]){
                this.params.datePickerOption.value = this.vm[this.expression];
            }
            this.datePickerComponent = create(this, this.params.datePickerOption);
        });
        document.addEventListener("click", trigger.bind(this), false)
    },
    update: function (newValue, oldValue) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
    },
    unbind: function () {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
        document.removeEventListener("click", trigger.bind(this))
    }
}
