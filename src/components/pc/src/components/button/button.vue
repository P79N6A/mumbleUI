<template>
    <div class="ui-button" :class="getClass">
        <i v-if="icon" class="ui-icon ui-icon-{{icon}}"></i>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: {
            type: String,
            long: {
                type: Boolean,
                default: false
            },
            circle: {
                type: Boolean,
                default: false
            },
            icon: String
        },
        data: function () {
            return {
            }
        },
        computed: {
            getClass(){
                var arr = [];
                if (this.type) {
                    arr.push("ui-button-type-" + this.type)
                }
                if(this.circle){
                    arr.push("ui-button-circle")
                }
                if(this.long){
                    arr.push("ui-button-long")
                }
                return arr;
            },
        },
        ready: function () {
        },
        methods: {
        }
    }
</script>
