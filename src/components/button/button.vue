<template>
    <button :type="buttonType" :class="getClass" class="ui-button" @click="handleClick">
        <i v-if="icon" :class="getIconClass" />
        <slot />
    </button>
</template>
<script>
export default {
    name: 'Button',
    props: {
        type: {
            type: String,
            default: ''
        },
        long: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },
        control: {
            type: Number,
            default: 300
        },
        disabled: {
            type: Boolean,
            default: false
        },
        buttonType: {
            type: String,
            default: 'button'
        }
    },
    data: function () {
        return {
            currentDisabled: this.disabled,
            iconOnly: false
        }
    },
    computed: {
        getClass() {
            var arr = [];
            if (this.type) {
                arr.push('ui-button-type-' + this.type)
            }
            if (this.circle) {
                arr.push('ui-button-circle')
            }
            if (this.long) {
                arr.push('ui-button-long')
            }
            if (this.iconOnly) {
                arr.push('ui-button-icon-only')
            }
            if (this.currentDisabled) {
                arr.push('ui-button-disabled')
            }
            return arr;
        },
        getIconClass() {
            return `ui-icon ui-icon-${this.icon}`
        }
    },
    watch: {
        disabled() {
            this.currentDisabled = this.disabled;
        }
    },
    created: function () {
        this.iconOnly = (this.$slots.default === undefined && this.icon)
    },
    methods: {
        handleClick(event) {
            if (this.currentDisabled) return;
            if (this.notAllowed) return;

            // 点击完多少秒不能继续点
            this.notAllowed = true;
            setTimeout(()=>{
                this.notAllowed = false;
            }, this.control)
            this.$emit('click', event, this);
        }
    }
}
</script>
