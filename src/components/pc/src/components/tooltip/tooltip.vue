<template>
    <div class="ui-tooltip" :class="getClass()" :style="styleObject">
        <div class="ui-tooltip-arrow">
        </div>
        <div class="ui-tooltip-inner">
            <span v-if="text.length>0">{{text}}</span>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            text: String,
            styleObject: Object,
            direction: {
                type: String
            }
        },
        data: function () {
            return {
            }
        },
        methods:{
            getClass: function () {
                return "ui-tooltip-" +  this.direction
            }
        }
    }
</script>
