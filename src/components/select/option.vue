<template>
    <li v-show="show" :data-key="value"
        :class="{
            'ui-select-item-selected': selected,
            'ui-select-item-disabled': disabled || (wbSelect.disableLimit && !selected),
            'focus': isFocus
        }"
        class="ui-select-item" @mouseover="focus">
        <slot>{{ currentLabel }}</slot>
    </li>
</template>
<script>
import * as util from '../../utils/util.js';
import { findComponentUpward } from '../../utils/util.js'
import emitter from '../../mixins/emitter';
export default {
    name: 'SelectOption',
    mixins: [ emitter ],
    props: {
        value: {
            type: [String, Number],
            required: true
        },
        label: {
            type: [String, Number],
            default: undefined
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            currentLabel: this.label,
            wbSelect: findComponentUpward(this, 'WbSelect'),
            isFocus: false
        }
    },
    computed: {
        selected() {
            if (this.wbSelect.multiple) {
                return util.isArray(this.wbSelect.currentValue) && this.wbSelect.currentValue.indexOf(this.value) != -1
            } else {
                return this.wbSelect.currentValue == this.value
            }
        },
        show() {
            if (this.wbSelect.searchValue && this.currentLabel) {
                return this.currentLabel.indexOf(this.wbSelect.searchValue) != -1
            } else {
                return true
            }
        }
    },
    created() {
        if (this.wbSelect) {
            this.wbSelect.addOption(this);
        } else {
            findComponentUpward(this, 'WbSelect').addOption(this);
        }
    },
    mounted() {
        this.currentLabel = this.label || this.$el.innerHTML || this.value;
    },
    updated() {
        this.currentLabel = this.label || this.$el.innerHTML || this.value;
    },
    beforeDestroy() {
        if (this.wbSelect) {
            this.wbSelect.removeOption(this);
        } else {
            findComponentUpward(this, 'WbSelect').removeOption(this);
        }
    },
    methods: {
        focus() {
            if (this.wbSelect.focusOption) {
                this.wbSelect.focusOption.isFocus = false
            }
            this.isFocus = true;
            this.wbSelect.focusOption = this;
        }
    }
}
</script>
