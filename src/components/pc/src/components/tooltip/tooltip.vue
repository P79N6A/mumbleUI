<template>
    <div class="ui-tooltip" :class="getClass()" :style="styleObject">
        <div class="ui-tooltip-arrow">
        </div>
        <div class="ui-tooltip-inner">
            <span v-if="isText">{{text}}</span>
            <div v-if="isHtml">{{{html}}}</div>
            <div v-if="isComponent" v-add-component="component"></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue'
    import addComponent from '../../directives/initComponent.js';
    export default {
        directives: {
            addComponent: addComponent
        },
        props: {
            text: String,
            html: String,
            component: [Object, null],
            styleObject: Object,
            direction: String,
            align: String
        },
        computed: {
            isComponent: function () {
                return this.component != null && this.component.constructor == Vue
            },
            isHtml: function () {
                return !this.isComponent && this.html &&　this.html.length>0
            },
            isText: function () {
                return !this.isComponent && !this.isHtml && this.text  && this.text.length > 0
            }
        },
        data: function () {
            return {}
        },
        methods: {
            getClass: function () {
                var arr = ["ui-tooltip-direction-" + this.direction, "ui-tooltip-align-" + this.align];
                if(this.isHtml || this.isComponent){
                    arr.push("ui-tooltip-rich")
                }
                return arr
            }
        }
    }
</script>
