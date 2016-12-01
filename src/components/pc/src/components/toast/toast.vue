<template>
    <div class="toast">
        <i v-if="iconClass" class="{{iconClass}}"></i>
        <span>{{message}}</span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            message : [String, Number],
            iconClass : String
        }
    }
</script>
