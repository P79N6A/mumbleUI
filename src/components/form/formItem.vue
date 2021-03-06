<template>
    <div :class="getClass" class="ui-form-item">
        <label v-if="label" ref="label" :style="getLabelStyle" class="ui-form-label">{{ label }}</label>
        <div :style="getContentStyle" class="ui-form-content">
            <slot />
            <div v-if="validateState === 'error' && showMessage && form.currentShowMessage" class="ui-form-error-tip">{{ validateMessage }}</div>
        </div>
    </div>
</template>
<script>
import AsyncValidator from 'async-validator';
import './rule.js'
import { findComponentUpward, findComponentDownward } from '../../utils/util.js'
import emitter from '../../mixins/emitter';
export default {
    name: 'FormItem',
    mixins: [ emitter ],
    props: {
        prop: {
            type: String,
            default: undefined
        },
        label: {
            type: String,
            default: undefined
        },
        labelWidth: {
            type: Number,
            default: undefined
        },
        labelPosition: {
            type: String,
            default: undefined
        },
        showMessage: {
            type: Boolean,
            default: true
        },
        rule: {
            type: Array,
            default: undefined
        },
        value: {
            type: [String, Number, Array, Boolean, Object],
            default: null
        }
    },
    data: function () {
        return {
            // hasLabel: true,
            validateState: '',
            validateMessage: '',
            form: findComponentUpward(this, 'WbForm')
        }
    },
    computed: {
        currentRule() {
            return [].concat(this.rule || []).concat((this.form.rule && this.form.rule[this.prop]) || []);
        },
        required() {
            if (this.currentRule && this.currentRule.length > 0) {
                return this.currentRule.filter((rule)=>{ return rule.required }).length > 0
            }
        },
        getClass() {
            var arr = [];
            if (this.required) {
                arr.push('ui-form-item-required')
            }
            if (this.validateState == 'error') {
                arr.push('ui-form-item-error')
            }
            arr.push(`ui-form-position-${this.labelPosition || this.form.labelPosition}`);
            return arr
        },
        getLabelStyle() {
            return {
                width: `${this.labelWidth || this.form.labelWidth}px`
            }
        },
        getContentStyle() {
            return {
                marginLeft: (this.labelPosition || this.form.labelPosition) == 'top' ? 0 : `${this.labelWidth || this.form.labelWidth}px`
            }
        }
    },
    mounted: function () {
        if (this.prop) {
            this.$on('on-form-blur', this.onFieldBlur);
            this.$on('on-form-change', this.onFieldChange);
        }
        this.form.addItem(this);
    },
    beforeDestroy: function () {
        this.form.removeItem(this);
    },
    methods: {
        validate(trigger, callback, currentValue) {
            callback = callback || new Function();
            let value;
            if (currentValue !== undefined) {
                value = currentValue
            } else {
                if (this.value !== null) {
                    value = this.value
                } else {
                    let child = findComponentDownward(this, ['Input', 'CheckboxGroup', 'InputDatePicker', 'RadioGroup', 'WbSelect', 'Switch']);
                    if (child) {
                        value = child.value
                    } else {
                        return console.warn('表单组件请用FormItem组件包裹')
                    }
                }
            }
            if (!this.currentRule || this.currentRule.length == 0) {
                callback();
                return true;
            }
            var rules = this.currentRule.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
            if (rules.length === 0) {
                callback();
                return true;
            }
            this.validateState = 'validating';
            var descriptor = {};
            var model = {};
            descriptor[this.prop] = rules;
            model[this.prop] = value;
            var validator = new AsyncValidator(descriptor);
            validator.validate(model, (errors) => {
                this.dispatch('WbForm', 'on-item-validate', [errors])
                if (errors) {
                    this.validateState = 'error';
                    this.validateMessage = errors[0].message;
                    callback(errors);
                } else {
                    this.validateState = '';
                    callback();
                }
            });
        },
        resetField() {
            this.validateState = '';
            this.validateMessage = '';
        },
        onFieldBlur(currentValue) {
            this.validate('blur', null, currentValue)
        },
        onFieldChange(currentValue) {
            this.validate('change', null, currentValue )
        }
    }
}
</script>
