<template>
    <div class="ui-toast ui-toast-{{type}}">
        <i class="ui-icon {{iconClasses[type]}}"></i>
        <span>{{message}}</span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            message: [String, Number],
            type: String
        },
        data: function () {
            return {
                iconClasses: {
                    info: "ui-icon-info-circle",
                    warn: "ui-icon-exclamation-circle",
                    error: "ui-icon-close-circle",
                    success: "ui-icon-check-circle"
                }
            }
        }
    }
</script>
