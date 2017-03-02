<template>
    <div class="ui-form-item">
        <label class="ui-form-label" v-if="hasLabel" v-el:label :style="getLabelStyle">{{label}}</label>
        <div class="ui-form-content" :style="getContentStyle">
            <slot></slot>
            <div class="ui-form-error-tip" v-if="validateState === 'error' && showMessage && form.showMessage">{{ validateMessage }}</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import AsyncValidator from 'async-validator';
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
            },
            showMessage: {
                type: Boolean,
                default: true
            }
        },
        data: function () {
            return {
                labelPosition: "",
                hasLabel: true,
                validateState: "error",
                validateMessage:  "请输入XXXX"
            }
        },
        computed: {
            form(){
                let parent = this.$parent;
                while (parent.$options.name !== 'WbForm') {
                    parent = parent.$parent;
                }
                return parent;
            },
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
            if(this.prop){
                this.$on('on-form-blur', this.onFieldBlur);
                this.$on('on-form-change', this.onFieldChange);
            }
        },
        destroy: function () {
        },
        methods: {
            onFieldBlur(val){
                console.log("onFieldBlur")
                console.log(val)
            },
            onFieldChange(val){
                console.log("onFieldChange")
                console.log(val)
            }
        }
    }
</script>
