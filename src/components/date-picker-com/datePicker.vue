<template>
    <div :class="{ inline: inline, hasTime: enableTime}" class="flatpickr-calendar arrowTop">
        <div class="flatpickr-month">
            <span :title="t('el.datepicker.prevMonth')" class="flatpickr-prev-month" @click.stop.prevent="lastMonth">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17 17">
                    <g />
                    <path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z" />
                </svg>
            </span>
            <span :class="{'flatpickr-only-month': onlyMonth}" class="flatpickr-current-month">
                <span class="cur-month">
                    {{ t('el.datepicker.months.' + MONTHS[current.month]) }}
                    <ul class="cur-month-months">
                        <li v-for="(month, index) in MONTHS" :key="index" :class="{selected: isCurrentMonth(index)}" @click.stop.prevent="chooseMonth(index)">
                            {{ t('el.datepicker.months.' + month) }}
                        </li>
                    </ul>
                </span>
                <input v-model="current.year" class="cur-year" type="number" @change="chooseYear">
            </span>
            <span :title="t('el.datepicker.nextMonth')" class="flatpickr-next-month" @click.stop.prevent="nextMonth">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17 17">
                    <g />
                    <path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z" />
                </svg>
            </span>
        </div>
        <div v-if="!onlyMonth" class="flatpickr-rContainer">
            <div class="flatpickr-weekdays">
                <span v-for="(week, index) in WEEKS" :key="index" class="flatpickr-weekday">{{ t('el.datepicker.weeks.' + week) }}</span>
            </div>
            <div class="flatpickr-days" tabindex="-1">
                <span v-for="(item, index) in days" :key="index" :class="{
                    disabled: !isEnable(item),
                    prevMonthDay: item.month < current.month,
                    nextMonthDay: item.month > current.month,
                    today: (item.year == today.year) && (item.month == today.month) && (item.date == today.date),
                    selected: isSelected(item),
                    inRange: isInRange(item)
                }" class="flatpickr-day" tabindex="0" @click.stop.prevent="chooseDay(item, $event)" @mouseover="preChooseDay(item, $event)" @mouseleave="cancelPreChooseDay">
                    {{ item.date }}
                </span>
            </div>
        </div>
        <div v-if="enableTime" :class="{'has-seconds': enableSeconds}" class="flatpickr-time" tabindex="-1">
            <input :step="hourIncrement" v-model="time.hour" :title="t('el.datepicker.wheel')" class="flatpickr-hour" tabindex="0" type="number" min="0" max="24" @input="changeTime">
            <span class="flatpickr-time-separator">:</span>
            <input :step="minuteIncrement" v-model="time.minute" :title="t('el.datepicker.wheel')" class="flatpickr-minute" tabindex="0" type="number" min="0" max="60" @input="changeTime">
            <template v-if="enableSeconds">
                <span class="flatpickr-time-separator">:</span>
                <input :step="secondIncrement" v-model="time.second" :title="t('el.datepicker.wheel')" class="flatpickr-second" tabindex="0" type="number" min="0" max="60" @input="changeTime">
            </template>
        </div>
    </div>
</template>
<script>
import * as util from '../../utils/util.js';
import locale from '../../i18n/mixin.js';

const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

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
    };
};

export default {
    name: 'DatePicker',
    mixins: [locale],
    props: {
        inline: {
            // 是否是占用空间的显示方式
            type: Boolean,
            default: true
        },
        model: {
            // 模式：single、multiple、range
            type: String,
            default: 'single'
        },
        onlyMonth: {
            // 是否只显示年月
            type: Boolean,
            default: false
        },
        enableTime: {
            // 是否显示时间
            type: Boolean,
            default: false
        },
        enableSeconds: {
            // 是否显示秒
            type: Boolean,
            default: false
        },
        hourIncrement: {
            // 滚动小时的间隔
            type: Number,
            default: 1
        },
        minuteIncrement: {
            // 滚动分钟的间隔
            type: Number,
            default: 5
        },
        secondIncrement: {
            // 滚动秒的间隔
            type: Number,
            default: 5
        },
        maxDate: {
            // 最大可选择日期
            type: Date,
            default: undefined
        },
        minDate: {
            // 最小可选择日期
            type: Date,
            default: undefined
        },
        maxRange: {
            // 7D七天， 1M一个月， 2Y两年
            type: String,
            default: undefined
        },
        disable: {
            // 禁用的时间
            type: Array,
            default: function () {
                return [];
            }
        },
        enable: {
            // 允许的时间
            type: Array,
            default: function () {
                return [];
            }
        },
        value: {
            type: [Array, Number, null],
            default: undefined
        }
    },
    data() {
        var today = parseDay(new Date());
        return {
            WEEKS,
            MONTHS,
            today: today,
            current: {
                year: today.year,
                month: today.month
            },
            time: {
                hour: 12,
                minute: 0,
                second: 0
            },
            selectedDays: [],
            days: [],
            preChooseDate: null
        };
    },
    computed: {
        weeks() {
            return this.t('el.datepicker.weeks');
        }
    },
    watch: {
        value: function () {
            this.changeValue();
        },
        current: {
            handler: function () {
                this.getDays();
            },
            deep: true
        }
    },
    mounted: function () {
        this.init();
    },
    beforeDestroy: function () {
        if (this.enableTime) {
            this.hourElem.removeEventListener('wheel', this.wheelHour);
            this.minuteElem.removeEventListener('wheel', this.wheelMinute);
            if (this.enableSeconds) {
                this.secondElem.removeEventListener('wheel', this.wheelSeconds);
            }
        }
    },
    methods: {
        init: function () {
            this.changeValue();
            this.getDays();
            if (this.enableTime) {
                this.hourElem = this.$el.querySelector('.flatpickr-hour');
                this.hourElem.addEventListener('wheel', this.wheelHour, false);
                this.minuteElem = this.$el.querySelector('.flatpickr-minute');
                this.minuteElem.addEventListener(
                    'wheel',
                    this.wheelMinute,
                    false
                );
                if (this.enableSeconds) {
                    this.secondElem = this.$el.querySelector(
                        '.flatpickr-second'
                    );
                    this.secondElem.addEventListener(
                        'wheel',
                        this.wheelSeconds,
                        false
                    );
                }
            }
        },
        changeValue: function () {
            // 从外面改变value值，更新datePicker内部状态
            if (this.value) {
                this.selectedDays = [];
                if (this.model == 'single') {
                    if (util.isNumber(this.value)) {
                        var _current = parseDay(this.value);
                        this.current.year = _current.year;
                        this.current.month = _current.month;
                        if (this.enableTime) {
                            this.time.hour = _current.hour;
                            this.time.minute = _current.minute;
                        }
                        if (this.enableSeconds) {
                            this.time.second = _current.second;
                        }
                        this.selectedDays.push(_current);
                    }
                } else if (this.model == 'multiple' || this.model == 'range') {
                    if (util.isArray(this.value)) {
                        var _arr = this.value.slice(0).sort(function (a, b) {
                            return a > b;
                        });
                        var len = _arr.length;
                        for (var i = 0; i < len; i++) {
                            var date = parseDay(_arr[i]);
                            if (i == 0) {
                                this.current.year = date.year;
                                this.current.month = date.month;
                            }
                            if (i == len - 1) {
                                if (this.enableTime) {
                                    this.time.hour = date.hour;
                                    this.time.minute = date.minute;
                                }
                                if (this.enableSeconds) {
                                    this.time.second = date.second;
                                }
                            }
                            this.selectedDays.push(date);
                        }
                    }
                }
            } else {
                this.selectedDays = [];
                this.preChooseDate = null;
            }
        },
        updateValue: function () {
            let value;
            // 要做处理
            if (this.model == 'range') {
                if (this.selectedDays.length > 1) {
                    var one = this.selectedDays[0];
                    var two = this.selectedDays[1];
                    if (this.enableTime) {
                        value = [one.me.getTime(), two.me.getTime()];
                    } else {
                        value = [
                            new Date(
                                one.year,
                                one.month,
                                one.date,
                                0,
                                0,
                                0
                            ).getTime(),
                            new Date(
                                two.year,
                                two.month,
                                two.date,
                                23,
                                59,
                                59
                            ).getTime()
                        ];
                    }
                } else {
                    value = [];
                }
            } else if (this.model == 'multiple') {
                value = [];
                this.selectedDays.forEach(date => {
                    value.push(date.me.getTime());
                });
            } else if (this.model == 'single') {
                if (this.onlyMonth) {
                    value = +new Date(this.current.year, this.current.month, 1);
                } else if (this.selectedDays.length > 0) {
                    value = this.selectedDays[0].me.getTime();
                } else {
                    value = null;
                }
            }
            this.$emit('input', value);
            this.$emit('on-change', value);
        },
        isCurrentMonth(index) {
            return index == this.current.month;
        },
        lastMonth: function () {
            if (this.current.month > 0) {
                this.current.month -= 1;
            } else {
                this.current.year -= 1;
                this.current.month = 11;
            }
            this.updateOnlyMonth();
        },
        nextMonth: function () {
            if (this.current.month < 11) {
                this.current.month += 1;
            } else {
                this.current.year += 1;
                this.current.month = 0;
            }
            this.updateOnlyMonth();
        },
        chooseMonth(index) {
            this.current.month = index;
            if (this.onlyMonth) {
                this.updateValue();
                this.$emit('on-finish');
            }
        },
        chooseYear() {
            this.updateOnlyMonth();
        },
        updateOnlyMonth() {
            if (this.onlyMonth) {
                this.updateValue();
            }
        },
        // disable和enable交叉的，disable权重大
        isEnable: function (date) {
            // 当区间模式时，可以添加长度控制
            let _minDate, _maxDate;
            if (this.model == 'range' && this.maxRange && this.rangeOne) {
                var maxTime = this.value[1];
                var maxDate = new Date(maxTime);
                var arr = this.maxRange.match(/(\d*)([MDY])/);
                if (arr) {
                    var length = arr[1];
                    var type = arr[2];
                    if (type == 'D') {
                        _minDate = new Date(
                            maxTime - Number(length) * 60 * 60 * 24 * 1000
                        );
                        _maxDate = new Date(
                            maxTime + (Number(length) - 1) * 60 * 60 * 24 * 1000
                        );
                    } else if (type == 'M') {
                        _minDate = new Date(
                            maxDate.getFullYear(),
                            maxDate.getMonth() - Number(length),
                            maxDate.getDate()
                        );
                        _maxDate = new Date(
                            maxDate.getFullYear(),
                            maxDate.getMonth() + Number(length),
                            maxDate.getDate()
                        );
                    } else if (type == 'Y') {
                        _minDate = new Date(
                            maxDate.getFullYear() - Number(length),
                            maxDate.getMonth(),
                            maxDate.getDate()
                        );
                        _maxDate = new Date(
                            maxDate.getFullYear() + Number(length),
                            maxDate.getMonth(),
                            maxDate.getDate()
                        );
                    }
                }
            }
            if (this.maxDate) {
                if (date.me.getTime() > this.maxDate.getTime()) {
                    return false;
                }
            }

            if (_maxDate) {
                if (date.me.getTime() > _maxDate.getTime()) {
                    return false;
                }
            }

            if (this.minDate) {
                if (date.me.getTime() < this.minDate.getTime()) {
                    return false;
                }
            }

            if (_minDate) {
                if (date.me.getTime() < _minDate.getTime()) {
                    return false;
                }
            }

            // 判断时间是否在禁用范围
            var len = this.disable.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    let item = this.disable[i];
                    if (util.isDate(item)) {
                        let disableDate = parseDay(item);
                        if (
                            date.year == disableDate.year &&
                            date.month == disableDate.month &&
                            date.date == disableDate.date
                        ) {
                            return false;
                        }
                    } else if (util.isFunction(item)) {
                        if (item(date)) {
                            return false;
                        }
                    } else if (
                        util.isObject(item) &&
                        item.from &&
                        item.to &&
                        util.isDate(item.from) &&
                        util.isDate(item.to)
                    ) {
                        if (
                            date.me.getTime() >= item.from.getTime() &&
                            date.me.getTime() <= item.to.getTime()
                        ) {
                            return false;
                        }
                    }
                }
            }
            // 判断时间是否在可选取范围
            len = this.enable.length;
            if (len > 0) {
                for (i = 0; i < len; i++) {
                    let item = this.enable[i];
                    if (util.isDate(item)) {
                        let disableDate = parseDay(item);
                        if (
                            date.year == disableDate.year &&
                            date.month == disableDate.month &&
                            date.date == disableDate.date
                        ) {
                            return true;
                        }
                    } else if (util.isFunction(item)) {
                        if (item(date)) {
                            return true;
                        }
                    } else if (
                        util.isObject(item) &&
                        item.from &&
                        item.to &&
                        util.isDate(item.from) &&
                        util.isDate(item.to)
                    ) {
                        if (
                            date.me.getTime() >= item.from.getTime() &&
                            date.me.getTime() <= item.to.getTime()
                        ) {
                            return true;
                        }
                    }
                }
                return false;
            } else {
                return true;
            }
        },
        isSelected: function (date) {
            if (
                this.model == 'single' ||
                this.model == 'multiple' ||
                this.model == 'range'
            ) {
                var len = this.selectedDays.length;
                var index = -1;
                for (var i = 0; i < len; i++) {
                    var item = this.selectedDays[i];
                    if (
                        item.year == date.year &&
                        item.month == date.month &&
                        item.date == date.date
                    ) {
                        index = i;
                    }
                }
                return index + 1;
            }
        },
        isInRange: function (date) {
            if (this.model == 'range') {
                if (this.rangeOne && this.preChooseDate) {
                    var arr = [this.selectedDays[0], this.preChooseDate].sort(
                        function (a, b) {
                            return a.me.getTime() > b.me.getTime();
                        }
                    );
                    if (
                        date.me.getTime() > arr[0].me.getTime() &&
                        date.me.getTime() < arr[1].me.getTime()
                    ) {
                        return true;
                    }
                }
                var _arr = this.selectedDays.slice(0).sort(function (a, b) {
                    return a.me.getTime() > b.me.getTime();
                });
                if (
                    _arr.length > 0 &&
                    date.me.getTime() > _arr[0].me.getTime() &&
                    date.me.getTime() < _arr[_arr.length - 1].me.getTime()
                ) {
                    return true;
                }
            }
        },
        getDays: function () {
            var firstDay = parseDay(
                new Date(this.current.year, this.current.month, 1, 12)
            );
            var arr = [];
            for (var i = 0; i < 42; i++) {
                var date = parseDay(
                    new Date(
                        this.current.year,
                        this.current.month,
                        i + 1 - firstDay.day,
                        12
                    )
                );
                arr.push(date);
            }
            this.days = arr;
        },
        preChooseDay: function (date) {
            if (this.model == 'range') {
                this.preChooseDate = date;
            }
        },
        cancelPreChooseDay: function () {
            this.preChooseDate = null;
        },
        chooseDay: function (date, $event) {
            if (!this.isEnable(date)) {
                return false;
            }
            if (
                date.month != this.current.month ||
                date.year != this.current.year
            ) {
                this.current.month = date.month;
                this.current.year = date.year;
                // 因为采用的是track by index，切换月份时点击的那个target其实没变，只是值变了
                $event.target.blur();
            }
            if (this.model == 'multiple') {
                var index = this.isSelected(date);
                if (index) {
                    this.selectedDays.splice(index - 1, 1);
                } else {
                    this.selectedDays.push(date);
                }
            } else if (this.model == 'single') {
                this.selectedDays = [];
                this.selectedDays.push(date);
                this.$emit('on-finish');
            } else if (this.model == 'range') {
                if (this.selectedDays.length == 2 && !this.rangeOne) {
                    this.selectedDays = [];
                }
                if (this.selectedDays.length == 0) {
                    this.selectedDays.push(date);
                    this.selectedDays.push(date);
                    this.rangeOne = true;
                } else {
                    if (date.me.getTime() < this.value[0]) {
                        this.selectedDays.splice(0, 1, date);
                    } else {
                        this.selectedDays.splice(1, 1, date);
                    }
                    this.rangeOne = false;
                    // 选完两次就关闭日历
                    this.$emit('on-finish');
                }
            }
            this.updateValue();
        },
        wheelHour: function (e) {
            var min = parseInt(e.target.min, 10),
                max = parseInt(e.target.max, 10),
                step = parseInt(e.target.step, 10);
            this.time.hour +=
                step * Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
            if (this.time.hour > max) {
                this.time.hour = max;
            }
            if (this.time.hour < min) {
                this.time.hour = min;
            }
            this.changeTime();
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false; // IE
            }
        },
        wheelMinute: function (e) {
            var min = parseInt(e.target.min, 10),
                max = parseInt(e.target.max, 10),
                step = parseInt(e.target.step, 10);
            this.time.minute +=
                step * Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
            if (this.time.minute > max) {
                this.time.minute = max;
            }
            if (this.time.minute < min) {
                this.time.minute = min;
            }
            this.changeTime();
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false; // IE
            }
        },
        wheelSeconds: function (e) {
            var min = parseInt(e.target.min, 10),
                max = parseInt(e.target.max, 10),
                step = parseInt(e.target.step, 10);
            this.time.second +=
                step * Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
            if (this.time.second > max) {
                this.time.second = max;
            }
            if (this.time.second < min) {
                this.time.second = min;
            }
            this.changeTime();
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false; // IE
            }
        },
        changeTime: function () {
            if (this.model == 'single') {
                if (this.selectedDays.length > 0) {
                    let date = this.selectedDays[0];
                    this.selectedDays.splice(
                        0,
                        1,
                        parseDay(
                            new Date(
                                date.year,
                                date.month,
                                date.date,
                                this.time.hour,
                                this.time.minute,
                                this.time.second
                            )
                        )
                    );
                }
            }
            if (this.model == 'multiple') {
                if (this.selectedDays.length > 0) {
                    let lastIndex = this.selectedDays.length - 1;
                    let date = this.selectedDays[lastIndex];
                    this.selectedDays.splice(
                        lastIndex,
                        1,
                        parseDay(
                            new Date(
                                date.year,
                                date.month,
                                date.date,
                                this.time.hour,
                                this.time.minute,
                                this.time.second
                            )
                        )
                    );
                }
            }
            if (this.model == 'range') {
                if (this.selectedDays.length > 0) {
                    let start = this.selectedDays[0];
                    let end = this.selectedDays[1];
                    if (this.rangeOne) {
                        this.selectedDays.splice(
                            0,
                            1,
                            parseDay(new Date(
                                start.year,
                                start.month,
                                start.date,
                                this.time.hour,
                                this.time.minute,
                                this.time.second
                            ))
                        );
                    } else {
                        this.selectedDays.splice(
                            1,
                            1,
                            parseDay(new Date(
                                end.year,
                                end.month,
                                end.date,
                                this.time.hour,
                                this.time.minute,
                                this.time.second
                            ))
                        );
                    }
                }
            }
            this.updateValue();
        }
    }
};
</script>

