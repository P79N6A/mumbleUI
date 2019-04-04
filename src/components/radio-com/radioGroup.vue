<template>
    <div :class="getClass" class="ui-radio-group" tabindex="0" @keydown="keydown" @focus="focus" @blur="blur">
        <slot />
    </div>
</template>
<script>
import Emitter from '../../mixins/emitter';
import keyCode from '../../utils/keyCode.js';
export default {
    name: 'RadioGroup',
    mixins: [Emitter],
    props: {
        value: {
            type: [String, Number, Boolean],
            default: ''
        },
        vertical: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: ''
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
            name: `RadioGroup_${new Date().getTime()}`,
            currentValue: this.value,
            options: [],
            selectedOption: null,
            focusIndex: null
        }
    },
    computed: {
        getClass() {
            var arr = [];
            if (this.vertical) {
                arr.push('ui-radio-group-vertical')
            }
            if (this.type) {
                arr.push('ui-radio-group-' + this.type)
            }
            return arr;
        }
    },
    watch: {
        'value': function (val) {
            if (val === this.currentValue) return;
            this.currentValue = val;
            this.changeValue(this.currentValue);
        },
        'focusIndex': function (val, old) {
            if (this.$children[old]) this.$children[old].isFoucs = false;
            if (this.$children[val]) this.$children[val].isFoucs = true;
        }
    },
    methods: {
        addItem(radio) {
            radio.name = this.name;
            radio.group = true;
            this.options.push(radio);
            this.init(this.currentValue)
        },
        changeValue(val) {
            if (this.selectedOption) {
                this.selectedOption.checked = false;
                this.selectedOption = null;
            }
            this.init(val);
            this.$emit('input', val);
            this.$emit('change', val);
            this.$emit('on-change', val);
            this.dispatch('FormItem', 'on-form-change', [val]);
        },
        init: function (value) {
            if (this.options) {
                this.options.forEach((option) => {
                    if (option.value === value) {
                        option.checked = true;
                        this.selectedOption = option;
                    }
                })
            }
        },
        // 提供给子组件调用
        change: function (value) {
            if (this.currentValue == value) {
                this.currentValue = ''
            } else {
                this.currentValue = value
            }
            this.changeValue(this.currentValue);
        },
        keydown(e) {
            if (this.disabled || this.readonly) return
            if (e.keyCode == keyCode.DOWN || e.keyCode == keyCode.RIGHT) {
                e.preventDefault();
                this.focusIndex += 1;
                if (this.focusIndex > this.$children.length - 1) {
                    this.focusIndex = 0;
                }
                let option = this.$children[this.focusIndex];
                if (option.disabled || option.readonly) {
                    this.keydown(e);
                } else {
                    option.click();
                }
            }
            if (e.keyCode == keyCode.UP || e.keyCode == keyCode.LEFT) {
                e.preventDefault();
                this.focusIndex -= 1;
                if (this.focusIndex < 0) {
                    this.focusIndex = this.$children.length - 1;
                }
                let option = this.$children[this.focusIndex];
                if (option.disabled || option.readonly) {
                    this.keydown(e);
                } else {
                    option.click();
                }
            }
            if (e.keyCode == keyCode.ENTER || e.keyCode == keyCode.MAC_ENTER || e.keyCode == keyCode.SPACE) {
                e.preventDefault();
                let option = this.$children[this.focusIndex];
                if (option) option.click();
            }
        },
        focus() {
            if (this.disabled || this.readonly) return
            let len = this.$children.length;
            if (len > 0) {
                this.focusIndex = 0;
            }
        },
        blur() {
            this.focusIndex = null;
        }
    }
}
</script>
