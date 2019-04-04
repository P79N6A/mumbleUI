<template>
    <i :class="getClass" :style="getStyle" class="ui-icon" @click="click" />
</template>
<script>
export default {
    name: 'Icon',
    props: {
        type: {
            required: true,
            type: String
        },
        size: {
            type: String,
            default: undefined
        },
        color: {
            type: String,
            default: undefined
        }
    },
    data: function () {
        return {
        }
    },
    computed: {
        getClass() {
            return `ui-icon-${this.type}`
        },
        getStyle() {
            let style = {
            };
            if (this.size) {
                style['font-size'] = `${this.size}px`
            }
            if (this.color) {
                style.color = this.color
            }
            return style
        }
            
    },
    methods: {
        click(event) {
            this.$emit('click', event)
        }
    }
}
</script>
