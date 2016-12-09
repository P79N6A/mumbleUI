<template>
    <div class="ui-tooltip" :class="getClass()" :style="styleObject">
        <div class="ui-tooltip-arrow">
        </div>
        <div class="ui-tooltip-inner">
            <span v-if="component==null　&& !html &&　text.length>0 ">{{text}}</span>
            <div v-if="component==null &&　html.length>0 ">{{{html}}}</div>
            <div v-if="component != null" v-add-component="component"></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
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
        },
        data: function () {
            return {}
        },
        methods: {
            getClass: function () {
                return ["ui-tooltip-direction-" + this.direction, "ui-tooltip-align-" + this.align]
            }
        }
    }
</script>
