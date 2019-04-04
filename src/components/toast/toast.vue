<template>
    <div class="ui-toast-parent">
        <div :class="'ui-toast-' + type" class="ui-toast">
            <i :class="getClass" class="ui-icon" />
            <span>{{ message }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Toast',
    props: {
        message: {
            type: [String, Number],
            default: undefined
        },
        type: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            iconClasses: {
                info: 'ui-icon-info-circle',
                warn: 'ui-icon-exclamation-circle',
                error: 'ui-icon-close-circle',
                success: 'ui-icon-check-circle'
            }
        }
    },
    computed: {
        getClass: function () {
            if (this.type) {
                return this.iconClasses[this.type]
            }
        }
    }
}
</script>
