import Vue from "vue";
import datePicker from "./index";
import * as util from "../../utils/util.js";

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
                model: "single",
                styleObject: {
                }
            };
            return util.extend(defaultOption, datePickerOption || {})
        },
        components: {
            datePicker: datePicker
        },
        template: '<date-picker v-show="show" :model="model" :value="value" :enable-time="enableTime" @click.stop="" \
                        :enable-seconds="enableSeconds"  \
                        :hour-increment="hourIncrement" \
                        :minute-increment="minuteIncrement" \
                        :second-increment="secondIncrement" \
                        :max-date="maxDate" :min-date="minDate" :disable="disable" :enable="enable" \
                        :inline="false" :style-object="styleObject" @update="update" @over="over"></date-picker>',
        ready: function () {
            this.setInputValue(this.value)
        },
        watch: {
            "value": function () {
                this.setInputValue(this.value)
            }
        },
        methods:{
            dateToString: function (time, enableTime, enableSeconds) {
                time = new Date(time);
                let {
                    year, month, date, day, hour, minute, second
                } = {
                    year: time.getFullYear(),
                    month: time.getMonth(),
                    date: time.getDate(),
                    day: time.getDay() ? time.getDay() : 7,
                    hour: time.getHours(),
                    minute: time.getMinutes(),
                    second: time.getSeconds()
                };
                var str = year + "-" + (month + 1) + "-" + date;
                if (enableTime) {
                    str += " " + hour + ":" + (minute < 10 ? ( "0" + minute ) : minute);
                    if (enableSeconds) {
                        str += ":" + (second < 10 ? ( "0" + second ) : second);
                    }
                }
                return str
            },
            setInputValue: function (value) {
                var str = "";
                if (value) {
                    if (this.model == "single") {
                        str += this.dateToString(value, this.enableTime, this.enableSeconds);
                    }
                    else if (this.model == "multiple") {
                        if (Array.isArray(value)) {
                            var len = value.length;
                            for (var i = 0; i < len; i++) {
                                if (i == len - 1) {
                                    str += this.dateToString(value[i], this.enableTime, this.enableSeconds)
                                } else {
                                    str += this.dateToString(value[i], this.enableTime, this.enableSeconds) + ";"
                                }
                            }
                        }
                    }
                    else if (this.model == "range") {
                        if (Array.isArray(value)) {
                            var _arr = value.slice(0).sort(function (a, b) {
                                return a > b
                            });
                            str += this.dateToString(_arr[0], this.enableTime, this.enableSeconds) + " 至 " +
                                this.dateToString(_arr[_arr.length - 1], this.enableTime, this.enableSeconds)
                        }

                    }
                }
                if(str){
                    parent.el.value = str
                }
            },
            update: function (data) {
                parent.vm[parent.expression] = data;
            },
            over: function () {
                this.show = false;
            }
        }
    });
    datePickerComponent.$mount().$appendTo(parent.el.parentNode);
    return datePickerComponent;
}



export  default {
    params: ["datePickerOption"],
    bind: function () {
        // 准备工作
        // 例如，添加事件处理器或只需要运行一次的高耗任务
        var $dom = this.el;
        $dom.setAttribute("readOnly", true);
        //如果input不是相对定位
        this.vm.$nextTick(()=> {
            if(this.vm[this.expression]){
                this.params.datePickerOption.value = this.vm[this.expression];
            }
            this.params.datePickerOption.styleObject = util.getPositionWhenAfterBorther($dom, "bottom", "left", 0, 10);
            this.datePickerComponent = create(this, this.params.datePickerOption);
        });
        //显示隐藏
        this.trigger = (e)=> {
            if(!this.datePickerComponent) return;
            if(e.target == this.el){
                this.datePickerComponent.show = true;
            }else {
                this.datePickerComponent.show = false;
            }
        };
        //刷新位置
        this.reFreshPosition = (e)=> {
            this.datePickerComponent.styleObject = util.getPositionWhenAfterBorther(this.el, "bottom", "left", 0, 10);
        };
        document.addEventListener("click", this.trigger, false);
        window.addEventListener("resize", this.reFreshPosition, false);
    },
    update: function (newValue, oldValue) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
        if(newValue){
            if(this.datePickerComponent){
                this.datePickerComponent.value = newValue;
            }
        }
    },
    unbind: function () {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
        document.removeEventListener("click", this.trigger);
        window.removeEventListener("resize", this.reFreshPosition);
    }
}
