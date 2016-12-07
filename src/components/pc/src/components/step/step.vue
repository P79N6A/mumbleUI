<template>
    <div class="ui-step" :class="getClass()" :style="getStyles()">
        <div class="ui-step-tail" v-show="showTail">
            <i></i>
        </div>
        <div class="ui-step-head">
            <div class="ui-step-head-swap">
                <i v-if="status=='done'" class="ui-icon ui-icon-check"></i>
                <span v-else>{{index}}</span>
            </div>
        </div>
        <div class="ui-step-main">
            <div class="ui-step-title">{{ title }}</div>
            <div class="ui-step-desc">{{ content }}</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String
            },
            icon: {
                type: String
            }
        },
        data: function () {
            return {
                status: "ready",   //ready,doing, done
                index: 0,
            }
        },
        computed: {
          showTail: function () {
              return this.$parent.len != this.index
          }
        },
        methods:{
            getClass: function () {
                return "ui-step-" + this.status
            },
            getStyles: function () {
                return {
                    width : this.$parent.sonWidth
                }
            }
        }
    }
</script>
