<template>
    <div :class="getClass" :style="getStyles" class="ui-step">
        <div v-show="showTail" class="ui-step-tail">
            <i />
        </div>
        <div class="ui-step-head">
            <div class="ui-step-head-swap">
                <template v-if="!$slots.default">
                    <i v-if="status=='done'" class="ui-icon ui-icon-check" />
                    <span v-else>
                        {{ index }}
                    </span>
                </template>
                <template v-else>
                    <slot />
                </template>
                
            </div>
        </div>
        <div class="ui-step-main">
            <div class="ui-step-title">{{ title }}</div>
            <div class="ui-step-desc">{{ content }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Step',
    props: {
        title: {
            type: String,
            default: ''
        },
        content: {
            type: String,
            default: undefined
        },
        icon: {
            type: String,
            default: undefined
        }
    },
    data: function () {
        return {
            status: 'ready', // ready, doing, done
            index: 0
        }
    },
    computed: {
        showTail() {
            return this.$parent.len != this.index
        },
        getClass() {
            return 'ui-step-' + this.status
        },
        getStyles() {
            return {width: this.$parent.sonWidth}
        }
    }
}
</script>
