<template>
    <div class="flatpickr-calendar arrowTop open" :class="{inline: inline, hasTime: enableTime}" :style="styleObject">
        <div class="flatpickr-month">
        <span class="flatpickr-prev-month" @click="lastMonth">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 0 17 17">
                <g></g>
                <path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z"></path>
            </svg>
        </span>
            <span class="flatpickr-current-month">
            <span class="cur-month">
                {{months[current.month]}}
                <ul class="cur-month-months">
                    <li v-for="month in months" :class="{selected: $index==current.month }" @click="chooseMonth($index)">
                        {{month}}
                    </li>
                </ul>
            </span>
            <input class="cur-year" type="number" title="Scroll to increment" v-model="current.year"
                   @input="changeYear | debounce 300">
        </span>
            <span class="flatpickr-next-month" @click="nextMonth">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 0 17 17">
                <g></g>
                <path
                    d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></path>
            </svg>
        </span>
        </div>
        <div class="flatpickr-rContainer">
            <div class="flatpickr-weekdays">
                <span class="flatpickr-weekday" v-for="week in weeks" v-text="week"></span>
            </div>
            <div class="flatpickr-days" tabindex="-1">
                <span class="flatpickr-day" tabindex="0" v-for="item in days" track-by="$index"
                      @click="choose(item, $event)"
                      @mouseover="preChoose(item, $event)"
                      :class="{
                            disabled: item.disabled,
                            prevMonthDay: item.month<current.month,
                            nextMonthDay:item.month>current.month,
                            today: (item.year == today.year) && (item.month == today.month) && (item.date == today.date),
                            selected: isSelected(item),
                            inRange: isInRange(item)
                        }">
                    {{item.date}}
                </span>
            </div>
        </div>
        <div class="flatpickr-time" tabindex="-1" v-if="enableTime" :class="{'has-seconds': enableSeconds}">
            <input class="flatpickr-hour" tabindex="0" type="number" :step="hourIncrement" min="0" max="24"
                   @input="changeTime | debounce 300"
                   title="滚动选择" v-model="current.hour"/>
            <span class="flatpickr-time-separator">:</span>
            <input class="flatpickr-minute" tabindex="0" type="number" :step="minuteIncrement" min="0" max="60"
                   @input="changeTime | debounce 300"
                   title="滚动选择" v-model="current.minute"/>
            <span class="flatpickr-time-separator" v-if="enableSeconds">:</span>
            <input class="flatpickr-second" type="number" :step="secondIncrement" min="0" max="60" title="滑动选择"
                   @input="changeTime | debounce 300"
                   v-if="enableSeconds" v-model="current.second"/>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import * as util from "../../util.js";

    Date.prototype.fp_incr = function (days) {
        return new Date(this.getFullYear(), this.getMonth(), this.getDate() + parseInt(days, 10));
    };

    //静态数据
    var weeks = ["日", "一", "二", "三", "四", "五", "六"];
    var months = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    /**
     * 计算一个日期年月日
     * @param date
     * @returns {{date: (Date|*), year: number, month: number, day: number, hour: number, minute: number, second: number}}
     */
    var parseDay = function (date) {
        date = new Date(date);
        return {
            me: date,
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
            day: date.getDay() ? date.getDay() : 7,
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }
    };

    export default {
        props: {
            styleObject: Object,
            inline: {                      //是否是占用空间的显示方式
                type: Boolean,
                default: true
            },
            model: {                       //模式：single、multiple、range
                type: String,
                default: "single"
            },
            enableTime: {                  //是否显示时间
                type: Boolean,
                default: false
            },
            enableSeconds: {               //是否显示秒
                type: Boolean,
                default: false
            },
            hourIncrement: {               //滚动小时的间隔
                type: Number,
                default: 1
            },
            minuteIncrement: {             //滚动分钟的间隔
                type: Number,
                default: 5
            },
            secondIncrement: {             //滚动秒的间隔
                type: Number,
                default: 5
            },
            maxDate: Date,              //最大可选择日期
            minDate: Date,              //最小可选择日期
            disable: {                  //禁用的时间
                type: Array,
                default: function () {
                    return []
                }
            },
            enable: {                   //允许的时间
                type: Array,
                default: function () {
                    return []
                }
            },
            value: [Array, Number],
//            result: [Array, Number]
        },
        data: function () {
            var today = parseDay(new Date());
            return {
                weeks: weeks,
                months: months,
                today: today,
                current: {
                    year: today.year,
                    month: today.month,
                    hour: 0,
                    minute: 0,
                    second: 0
                },
                selectedDays: [],
                days: [],
                preChooseDate: null,
            }
        },
        watch: {
            "value": function () {
                this.changeValue();
            }
        },
        ready: function () {
            this.init();
        },
        destroy: function () {
            if (this.enableTime) {
                this.hourElem.removeEventListener("wheel", this.wheelHour);
                this.minuteElem.removeEventListener("wheel", this.wheelMinute);
                if (this.enableSeconds) {
                    this.secondElem.removeEventListener("wheel", this.wheelSeconds)
                }
            }
        },
        methods: {
            init: function () {
                this.changeValue();
                if (this.enableTime) {
                    this.hourElem = this.$el.querySelector(".flatpickr-hour");
                    this.hourElem.addEventListener("wheel", this.wheelHour, false);
                    this.minuteElem = this.$el.querySelector(".flatpickr-minute");
                    this.minuteElem.addEventListener("wheel", this.wheelMinute, false);
                    if (this.enableSeconds) {
                        this.secondElem = this.$el.querySelector(".flatpickr-second");
                        this.secondElem.addEventListener("wheel", this.wheelSeconds, false)
                    }
                }
            },
            changeValue: function () {
                //从外面改变value值，更新datePicker内部状态
                if (this.value) {
                    this.selectedDays = [];
                    if (this.model == "single") {
                        if (util.isNumber(this.value)) {
                            var _current = parseDay(this.value);
                            this.current.year = _current.year;
                            this.current.month = _current.month;
                            this.current.hour = _current.hour;
                            this.current.minute = _current.minute;
                            this.current.second = _current.second;
                            this.selectedDays.push(_current)
                        }
                    }
                    else if (this.model == "multiple" || this.model == "range") {
                        if (util.isArray(this.value)) {
                            var _arr = this.value.slice(0).sort(function (a, b) {
                                return a > b
                            });
                            var len = _arr.length;
                            for (var i = 0; i < len; i++) {
                                var date = parseDay(_arr[i]);
                                if (i == 0) {
                                    this.current.year = date.year;
                                    this.current.month = date.month;
                                }
                                if (i == len - 1) {
                                    this.current.hour = date.hour;
                                    this.current.minute = date.minute;
                                    this.current.second = date.second;
                                }
                                this.selectedDays.push(date);
                            }
                        }
                    }
                }
                this.getDays();
            },
            updateValue: function () {
                this.$dispatch("update", this.value);
            },
            getDays: function () {
                var firstDay = parseDay(new Date(this.current.year, this.current.month, 1));
                var arr = [];
                for (var i = 0; i < 42; i++) {
                    var date = parseDay(new Date(this.current.year, this.current.month, i + 1 - firstDay.day));
                    date.disabled = !this.isEnable(date);
                    arr.push(date)
                }
                this.days = arr;
            },
            /**
             * disable和enable交叉的，disable权重大
             * @param date
             * @returns {boolean}
             */
            isEnable: function (date) {
                if (this.maxDate) {
                    if (date.me.getTime() > this.maxDate.getTime()) {
                        return false
                    }
                }

                if (this.minDate) {
                    if (date.me.getTime() < this.minDate.getTime()) {
                        return false
                    }
                }

                //判断时间是否在禁用范围
                var len = this.disable.length;
                if (len > 0) {
                    for (var i = 0; i < len; i++) {
                        var item = this.disable[i];
                        if (util.isDate(item)) {
                            var disableDate = parseDay(item);
                            if (date.year == disableDate.year && date.month == disableDate.month && date.date == disableDate.date) {
                                return false
                            }
                        } else if (util.isFunction(item)) {
                            if (item(date)) {
                                return false
                            }
                        } else if (util.isObject(item) && item.from && item.to && util.isDate(item.from) && util.isDate(item.to)) {
                            if (date.me.getTime() >= item.from.getTime() && date.me.getTime() <= item.to.getTime()) {
                                return false
                            }
                        }
                    }
                }
                //判断时间是否在可选取范围
                len = this.enable.length;
                if (len > 0) {
                    for (i = 0; i < len; i++) {
                        var item = this.enable[i];
                        if (util.isDate(item)) {
                            var disableDate = parseDay(item);
                            if (date.year == disableDate.year && date.month == disableDate.month && date.date == disableDate.date) {
                                return true
                            }
                        } else if (util.isFunction(item)) {
                            if (item(date)) {
                                return true
                            }
                        } else if (util.isObject(item) && item.from && item.to && util.isDate(item.from) && util.isDate(item.to)) {
                            if (date.me.getTime() >= item.from.getTime() && date.me.getTime() <= item.to.getTime()) {
                                return true
                            }
                        }
                    }
                    return false
                } else {
                    return true
                }
            },
            preChoose: function (date, $event) {
                if (this.model == "range") {
                    this.preChooseDate = date
                }
                return false
            },
            choose: function (date, $event) {
                if (date.disabled) {
                    return false
                }
                if (date.month != this.current.month || date.year != this.current.year) {
                    this.current.month = date.month;
                    this.current.year = date.year;
                    this.getDays();
                    //因为采用的是track by index，切换月份时点击的那个target其实没变，只是值变了
                    $event.target.blur();
                }
                if (this.model == "multiple") {
                    var index = this.isSelected(date);
                    if (index) {
                        this.selectedDays.splice(index - 1, 1);
                        this.value.splice(index - 1, 1)
                    } else {
                        this.selectedDays.push(date);
                        var thatDate = new Date(date.year, date.month, date.date, this.current.hour, this.current.minute, this.current.second);
                        if (!this.value) {
                            this.value = [];
                        }
                        this.value.push(thatDate.getTime())
                    }
                }
                else if (this.model == "single") {
                    this.selectedDays = [];
                    this.selectedDays.push(date);
                    var thatDate = new Date(date.year, date.month, date.date, this.current.hour, this.current.minute, this.current.second);
                    this.value = thatDate.getTime();
                    this.$dispatch("over");
                }
                else if (this.model == "range") {
                    if (!this.value) {
                        this.value = [];
                    }
                    if(this.selectedDays.length == 2 && !this.rangeOne){
                        this.selectedDays = [];
                        this.value = [];
                    }
                    var thatDate = new Date(date.year, date.month, date.date, this.current.hour, this.current.minute, this.current.second);
                    if(this.value.length == 0){
                        this.value.push(thatDate.getTime());
                        this.value.push(thatDate.getTime());
                        this.selectedDays.push(date);
                        this.selectedDays.push(date);
                        this.rangeOne = true;
                    }else{
                        if(thatDate.getTime() < this.value[0]){
                            this.selectedDays.$set(0, date);
                            this.value.$set(0, thatDate.getTime());
                        }else{
                            this.selectedDays.$set(1, date);
                            this.value.$set(1, thatDate.getTime());
                        }
                        this.rangeOne = false;
                        //选完两次就关闭日历
                        this.$dispatch("over");
                    }

                }
                this.updateValue();
                return false
            },
            lastMonth: function () {
                if (this.current.month > 0) {
                    this.current.month -= 1;
                } else {
                    this.current.year -= 1;
                    this.current.month = 11;
                }
                this.getDays();
            },
            nextMonth: function () {
                if (this.current.month < 11) {
                    this.current.month += 1;
                } else {
                    this.current.year += 1;
                    this.current.month = 0;
                }
                this.getDays();
            },
            chooseMonth(index){
                this.current.month = index;
                this.getDays();
            },
            wheelHour: function (e) {
                var min = parseInt(e.target.min, 10),
                    max = parseInt(e.target.max, 10),
                    step = parseInt(e.target.step, 10);
                this.current.hour += step * Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
                if (this.current.hour > max) {
                    this.current.hour = max
                }
                if (this.current.hour < min) {
                    this.current.hour = min
                }
                this.changeTime();
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;//IE
                }
            },
            wheelMinute: function (e) {
                var min = parseInt(e.target.min, 10),
                    max = parseInt(e.target.max, 10),
                    step = parseInt(e.target.step, 10);
                this.current.minute += step * Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
                if (this.current.minute > max) {
                    this.current.minute = max
                }
                if (this.current.minute < min) {
                    this.current.minute = min
                }
                this.changeTime();
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;//IE
                }
            },
            wheelSeconds: function (e) {
                var min = parseInt(e.target.min, 10),
                    max = parseInt(e.target.max, 10),
                    step = parseInt(e.target.step, 10);
                this.current.second += step * Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
                if (this.current.second > max) {
                    this.current.second = max
                }
                if (this.current.second < min) {
                    this.current.second = min
                }
                this.changeTime();
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;//IE
                }
            },
            changeTime: function () {
                if (this.model == "single") {
                    var date = this.selectedDays[0];
                    if (date) {
                        var thatDate = new Date(date.year, date.month, date.date, this.current.hour, this.current.minute, this.current.second);
                        this.value = thatDate.getTime();
                    }
                }
                if (this.model == "multiple" || this.model == "range") {
                    var lastIndex = this.selectedDays.length - 1;
                    var date = this.selectedDays[lastIndex];
                    if (date) {
                        var thatDate = new Date(date.year, date.month, date.date, this.current.hour, this.current.minute, this.current.second);
                        this.value[lastIndex] = thatDate.getTime();
                    }
                }
                this.updateValue();
            },
            changeYear: function () {
                this.getDays();
            },
            isSelected: function (date) {
                if (this.model == "single" || this.model == "multiple" || this.model == "range") {
                    var len = this.selectedDays.length;
                    var index = -1;
                    for (var i = 0; i < len; i++) {
                        var item = this.selectedDays[i];
                        if (item.year == date.year && item.month == date.month && item.date == date.date) {
                            index = i;
                        }
                    }
                    return index + 1
                }
            },
            isInRange: function (date) {
                if (this.model == "range") {
                    if (this.rangeOne && this.preChooseDate) {
                        var arr = [this.selectedDays[0], this.preChooseDate].sort(function (a, b) {
                            return a.me.getTime() > b.me.getTime()
                        });
                        if (date.me.getTime() > arr[0].me.getTime() && date.me.getTime() < arr[1].me.getTime()) {
                            return true
                        }
                    }
                    var _arr = this.selectedDays.slice(0).sort(function (a, b) {
                        return a.me.getTime() > b.me.getTime()
                    });
                    if (_arr.length > 0 && date.me.getTime() > _arr[0].me.getTime() && date.me.getTime() < _arr[_arr.length - 1].me.getTime()) {
                        return true
                    }
                }
            },
        }
    }
</script>
