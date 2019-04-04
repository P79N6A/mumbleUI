<template>
    <div :class="getClass" :style="styleObject" class="ui-tooltip" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <div class="ui-tooltip-swap">
            <div class="ui-tooltip-arrow" />
            <div class="ui-tooltip-inner">
                <div v-if="isText" class="ui-tooltip-text">
                    <i v-if="confirm" class="ui-icon ui-icon-question-circle" />
                    {{ text }}
                </div>
                <div v-if="isHtml" v-html="html" />
                <div v-if="isComponent">
                    <tooltip-component :component="component" />
                </div>
                <div v-if="confirm" class="ui-tooltip-buttons">
                    <div class="ui-button" @click="ok">{{ t('el.tooltip.confirm') }}</div>
                    <div class="ui-button" @click="cancel">{{ t('el.tooltip.cancel') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import emitter from '../../mixins/emitter';
import tooltipComponent from './tooltipComponent.vue';
import locale from '../../i18n/mixin.js';
export default {
    name: 'Tooltip',
    components: {
        tooltipComponent
    },
    mixins: [emitter, locale],
    props: {
        text: {
            type: String,
            default: undefined
        },
        html: {
            type: String,
            default: undefined
        },
        component: {
            type: [Object, null],
            default: undefined
        },
        styleObject: {
            type: Object,
            default: undefined
        },
        direction: {
            type: String,
            default: undefined
        },
        align: {
            type: String,
            default: undefined
        },
        confirm: {
            type: [Boolean, String],
            default: undefined
        }
    },
    computed: {
        isComponent: function () {
            return this.component != null && this.component.constructor == Vue
        },
        isHtml: function () {
            return !this.isComponent && this.html && this.html.length > 0
        },
        isText: function () {
            return !this.isComponent && !this.isHtml && this.text && this.text.length > 0
        },
        getClass: function () {
            var arr = ['ui-tooltip-direction-' + this.direction, 'ui-tooltip-align-' + this.align];
            if (this.isHtml || this.isComponent) {
                arr.push('ui-tooltip-rich')
            }
            if (this.confirm === 'true' || this.confirm === 'confirm' || this.confirm) {
                arr.push('ui-tooltip-confirm')
            }
            return arr
        }
    },
    methods: {
        ok: function () {
            this.dispatch('TooltipDirective', 'tooltip.ok');
        },
        cancel: function () {
            this.dispatch('TooltipDirective', 'tooltip.cancel');
        },
        mouseenter: function () {
            this.dispatch('TooltipDirective', 'tooltip.mouseenter');
        },
        mouseleave: function () {
            this.dispatch('TooltipDirective', 'tooltip.mouseleave');
        }
    }
}
</script>
