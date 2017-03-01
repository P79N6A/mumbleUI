<template>
    <div class="ui-form-item">
        <label class="ui-form-label" :style="getLabelStyle">{{label}}</label>
        <div class="ui-form-content" :style="getContentStyle"><slot></slot></div>
        <!--<label v-if="labelPosition=='top'" class="ui-form-label">{{label}}</label>-->
        <!--<Row>-->
            <!--<Cell :span="labelWidth" v-if="labelPosition!='top'">-->
                <!--<label class="ui-form-label">{{label}}</label>-->
            <!--</Cell>-->
            <!--<Cell :span="contentWdith">-->
                <!--<div class="ui-form-content"><slot></slot></div>-->
            <!--</Cell>-->
        <!--</Row>-->
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: "FormItem",
        props: {
            prop: {
                type: String
            },
            label: {
                type: String
            },
            labelWidth: {
                type: Number,
                default: 80
            }
        },
        data: function () {
            return {
                labelPosition: ""
            }
        },
        computed: {
            getLabelStyle(){
                return {
                    width: `${this.labelWidth}px`
                }
            },
            getContentStyle(){
                return {
                    marginLeft: this.labelPosition=='top'? 0 : `${this.labelWidth}px`
                }
            },
        },
        ready: function () {
        },
        destroy: function () {
        },
        methods: {
        }
    }
</script>
