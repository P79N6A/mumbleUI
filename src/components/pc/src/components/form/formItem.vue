<template>
    <div class="ui-form-item" :class="getClsss">
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
            },
        },
        data: function () {
            return {
                labelPosition: "",
                hasLabel: true,
                validateState: "",
                validateMessage:  "",
                rule: [],
                required: false
            }
        },
        computed: {
            getClsss(){
                var arr = [];
                if(this.required){
                    arr.push("ui-form-item-required")
                }
                if(this.validateState == "error"){
                    arr.push("ui-form-item-error")
                }
                return arr
            },
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
            validate(value){
                this.validateState = "validating";
                var descriptor = {};
                var model = {};
                descriptor[this.prop] = this.rule;
                model[this.prop] = value;
                var validator = new AsyncValidator(descriptor);
                validator.validate(model, (errors, fields) => {
                    if(errors) {
                        this.validateState = "error";
                        this.validateMessage = errors[0].message;
                    }
                });
            },
            onFieldBlur(val){
                this.validate(val)
            },
            onFieldChange(val){
                this.validate(val)
            }
        }
    }
</script>
