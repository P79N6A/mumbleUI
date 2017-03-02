<template>
    <div class="ui-form-item">
        <label class="ui-form-label" v-if="hasLabel" v-el:label :style="getLabelStyle">{{label}}</label>
        <div class="ui-form-content" :style="getContentStyle"><slot></slot></div>
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
                labelPosition: "",
                hasLabel: true
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
            this.hasLabel = this.$els.label.innerHTML !== '';
        },
        destroy: function () {
        },
        methods: {
        }
    }
</script>
