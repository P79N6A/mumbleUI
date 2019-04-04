<template>
    <div v-clickoutside="outside" class="ui-date-picker">
        <Icon v-if="!disabled && !readonly" class="ui-date-picker-clear" type="close-circle" @click.stop="clear" />
        <wb-input :value="text" :placeholder="placeholder"
                  :disabled="disabled"
                  icon="calendar"
                  readonly
                  @on-enter="handleEnter"
                  @on-focus="handleFocus"
                  @on-blur="handleBlur"
                  @on-click="trigger"
                  @click="trigger" />
        <Picker v-show="show" ref="picker" :inline="false"
                :model="model"
                v-model="currentValue"
                :enable-time="enableTime"
                :enable-seconds="enableSeconds"
                :hour-increment="hourIncrement"
                :minute-increment="minuteIncrement"
                :second-increment="secondIncrement"
                :max-date="maxDate"
                :min-date="minDate"
                :max-range="maxRange"
                :disable="disable"
                :enable="enable"
                :only-month="onlyMonth"
                class="ui-date-picker-picker"
                @on-change="update"
                @on-finish="over" />
    </div>
</template>
<script>
import locale from '../../i18n/mixin.js';
import WbInput from '../input';
import Picker from './datePicker.vue';
import clickoutside from '../../directives/clickoutside.js';
import emitter from '../../mixins/emitter';
export default {
    name: 'InputDatePicker',
    directives: {
        clickoutside
    },
    components: {
        WbInput,
        Picker
    },
    mixins: [emitter, locale],
    props: {
        model: {
            // 模式：single、multiple、range
            type: String,
            default: 'single'
        },
        onlyMonth: {
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
        },
        placeholder: {
            type: String,
            default: function () {
                return this.defaultPlaceholder
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            show: false,
            currentValue: this.value
        };
    },
    computed: {
        text: function () {
            return this.setInputValue();
        },
        defaultPlaceholder() {
            return this.t('el.datepicker.selectDate')
        }
    },
    watch: {
        value: function (value) {
            this.currentValue = value;
        }
    },
    methods: {
        outside: function () {
            this.show = false;
            if (this.$refs.picker) {
                this.$refs.picker.rangeOne = false;
            }
        },
        trigger: function (e) {
            e.stopPropagation();
            if (this.readonly || this.disabled) return;
            this.show = !this.show;
            if (!this.show) {
                this.$refs.picker.rangeOne = false;
            }
        },
        dateToString: function (time, enableTime, enableSeconds, onlyMonth) {
            time = new Date(time);
            let { year, month, date, hour, minute, second } = {
                year: time.getFullYear(),
                month: time.getMonth(),
                date: time.getDate(),
                day: time.getDay() ? time.getDay() : 7,
                hour: time.getHours(),
                minute: time.getMinutes(),
                second: time.getSeconds()
            };
            var str = year + '-' + (month + 1) + '-' + date;
            if (enableTime) {
                str += ' ' + hour + ':' + (minute < 10 ? '0' + minute : minute);
                if (enableSeconds) {
                    str += ':' + (second < 10 ? '0' + second : second);
                }
            }
            if (onlyMonth) {
                str = year + '-' + (month + 1);
            }
            return str;
        },
        setInputValue() {
            var str = '';
            if (this.currentValue) {
                if (this.model == 'single') {
                    str += this.dateToString(
                        this.currentValue,
                        this.enableTime,
                        this.enableSeconds,
                        this.onlyMonth
                    );
                } else if (this.model == 'multiple') {
                    if (
                        Array.isArray(this.currentValue) &&
                        this.currentValue.length > 0
                    ) {
                        var len = this.currentValue.length;
                        this.currentValue.slice(0).sort(function (a, b) {
                            return a - b
                        }).forEach((item, index)=>{
                            str += this.dateToString(
                                item,
                                this.enableTime,
                                this.enableSeconds
                            );
                            if (index < len - 1) {
                                str += '，'
                            }
                        })
                    }
                } else if (this.model == 'range') {
                    if (
                        Array.isArray(this.currentValue) &&
                        this.currentValue.length > 0
                    ) {
                        var arr = this.currentValue.sort(function (a, b) {
                            return a > b;
                        });
                        str +=
                            this.dateToString(
                                arr[0],
                                this.enableTime,
                                this.enableSeconds
                            ) +
                            ' 至 ' +
                            this.dateToString(
                                arr[arr.length - 1],
                                this.enableTime,
                                this.enableSeconds
                            );
                    }
                }
            }
            return str;
        },
        update: function (data) {
            this.$emit('input', data);
            this.$emit('on-input', data);
            this.$emit('on-change', data);
            this.$emit('on-input-change', data);
            this.dispatch('FormItem', 'on-form-change', [data]);
        },
        over: function () {
            this.show = false;
        },
        handleEnter(event) {
            this.$emit('on-enter', event);
        },
        handleFocus(event) {
            this.$emit('on-focus', event);
        },
        handleBlur(event) {
            this.$emit('on-blur', event);
            this.dispatch('FormItem', 'on-form-blur', [this.currentValue]);
        },
        clear() {
            this.update(null);
        }
    }
};
</script>
