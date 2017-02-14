<template>
    <div class="ui-input-swap" :class="getClass()">
        <template v-if="icon">
            <i class="ui-input-icon ui-icon ui-icon-{{icon}}" @click="clickIcon"></i>
        </template>
        <template v-if="password">
            <i class="ui-input-icon ui-icon ui-icon-eye" :class="{'ui-icon-eye': showPassword, 'ui-icon-eye-o': !showPassword}" @click="changeInputType"></i>
        </template>
        <template v-if="isNormal">
            <input class="ui-input" v-model="value" :maxlength="maxlength" :readonly="readonly" :type="type" :disabled="disabled" :placeholder="placeholder">
        </template>
        <template v-if="textarea">
            <textarea class="ui-input" :class="{'ui-input-auto-row': isAutoRow }" v-auto-row="autosize" v-model="value" :rows="rows"
                      :maxlength="maxlength" :readonly="readonly" :disabled="disabled" :placeholder="placeholder">
            </textarea>
        </template>
    </div>
</template>
<script>
    import * as util from "../../util.js";
    import autoRow from "../../directives/autoRow.js";
    export default {
        props: {
            value: {
                type: [Number, String],
                default: ""
            },
            type: {
                type: String,
                default: "text"
            },
            placeholder: String,
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            maxlength: Number,
            icon: String,
            rows: Number,
            autosize: [Boolean, Object]
        },
        data: function () {
            return {
                password: false,
                textarea: false,
                showPassword: true
            }
        },
        directives: {
            autoRow: autoRow
        },
        ready: function () {
            if(this.type == 'password'){
                this.password = true;
            }else if(this.type == 'textarea'){
                this.textarea = true;
            }
        },
        computed: {
            "isNormal": function () {
                return ["text", "password", "number"].indexOf(this.type) != -1;
            },
            "isAutoRow": function () {
                if(util.isObject(this.autosize) &&  this.autosize.min && this.autosize.max){
                    return true
                }
                if(this.autosize === true){
                    return true
                }
                return false
            }
        },
        methods: {
            getClass(){
                return `ui-input-${this.type}`
            },
            changeInputType(){
                this.showPassword = !this.showPassword;
                this.type = this.showPassword ? "password" : "text";
            },
            clickIcon(){
                this.$dispatch("input.click", this.value);
            }
        }
    }
</script>
