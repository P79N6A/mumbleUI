<template>
    <div class="ui-form-item">
        <label v-if="labelPosition=='top'" class="ui-form-label">{{label}}</label>
        <Row>
            <Cell :span="labelWidth" v-if="labelPosition!='top'">
                <label class="ui-form-label">{{label}}</label>
            </Cell>
            <Cell :span="contentWdith">
                <div class="ui-form-content"><slot></slot></div>
            </Cell>
        </Row>
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
                default: 7
            }
        },
        data: function () {
            return {
                labelPosition: ""
            }
        },
        computed: {
            contentWdith(){
                return  this.labelPosition=='top' ? 24 : (24 - this.labelWidth)
            }
        },
        ready: function () {
        },
        destroy: function () {
        },
        methods: {
        }
    }
</script>
