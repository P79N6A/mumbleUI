<template>
    <div class="ui-tooltip" :class="getClass()" :style="styleObject">
        <div class="ui-tooltip-swap">
            <div class="ui-tooltip-arrow">
            </div>
            <div class="ui-tooltip-inner">
                <div v-if="isText" class="ui-tooltip-text">
                    <i class="ui-icon ui-icon-question-circle" v-if="confirm"></i>
                    {{text}}
                </div>
                <div v-if="isHtml">{{{html}}}</div>
                <div v-if="isComponent" v-add-component="component"></div>
                <div class="ui-tooltip-buttons" v-if="confirm">
                    <div class="ui-button" @click="ok">确定</div>
                    <div class="ui-button" @click="cancel">取消</div>
                </div>
            </div>
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
            align: String,
            confirm: [Boolean, String],
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
                if(this.confirm === "true" || this.confirm === "confirm" || this.confirm){
                    arr.push("ui-tooltip-confirm")
                }
                return arr
            },
            ok: function () {
                this.$dispatch("tooltip.ok");
            },
            cancel: function () {
                this.$dispatch("tooltip.cancel");
            }
        }
    }
</script>
