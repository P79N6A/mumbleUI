<template>
    <div class="ui-input-swap" :class="getClass()">
        <div class="ui-input-group-prepend" v-el:prepend v-if="prepend"><slot name="prepend"></slot></div>
        <template v-if="icon">
            <i class="ui-input-icon ui-icon ui-icon-{{icon}}"
               @click="handleIconClick"></i>
        </template>
        <template v-if="password">
            <i class="ui-input-icon ui-icon ui-icon-eye"
               :class="{'ui-icon-eye': showPassword, 'ui-icon-eye-o': !showPassword}"
               @click="changeInputType"></i>
        </template>
        <template v-if="isNormal">
            <input class="ui-input"
                   v-model="value"
                   :maxlength="maxlength"
                   :readonly="readonly"
                   :type="type"
                   :disabled="disabled"
                   :placeholder="placeholder"
                   @keyup.enter="handleEnter"
                   @focus="handleFocus"
                   @blur="handleBlur"
                   @change="handleChange"
                   @input="handleInput"/>
        </template>
        <template v-if="textarea">
            <textarea class="ui-input"
                      v-auto-row="autosize"
                      :model="value"
                      v-model="value"
                      :rows="rows"
                      :maxlength="maxlength"
                      :readonly="readonly"
                      :disabled="disabled"
                      :placeholder="placeholder"
                      @keyup.enter="handleEnter"
                      @focus="handleFocus"
                      @blur="handleBlur"
                      @change="handleChange"
                      @input="handleInput">
            </textarea>
        </template>
        <div class="ui-input-group-append" v-el:append v-if="append"><slot name="append"></slot></div>
    </div>
</template>
<script>
    import * as util from "../../utils/util.js";
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
        directives: {
            autoRow: autoRow
        },
        data: function () {
            return {
                password: false,
                textarea: false,
                showPassword: true,
                prepend: true,
                append: true
            }
        },
        computed: {
            "isNormal": function () {
                return ["text", "password", "number"].indexOf(this.type) != -1;
            },
        },
        watch: {
            value () {
                this.$dispatch('on-form-change', this.value);
            }
        },
        ready: function () {
            if (this.type !== 'textarea') {
                this.prepend = this.$els.prepend.innerHTML !== '';
                this.append = this.$els.append.innerHTML !== '';
            } else {
                this.prepend = false;
                this.append = false;
            }
            this.slotReady = true;

            if(this.type == 'password'){
                this.password = true;
            }else if(this.type == 'textarea'){
                this.textarea = true;
            }
        },
        methods: {
            handleIconClick (event) {
                this.$emit('on-click', event);
            },
            handleEnter (event) {
                this.$emit('on-enter', event);
            },
            handleFocus (event) {
                this.$emit('on-focus', event);
            },
            handleBlur (event) {
                this.$emit('on-blur', event);
                this.$dispatch('on-form-blur', this.value);
            },
            handleInput(event){
                this.$emit('on-input', event);
            },
            handleChange (event) {
                this.$emit('on-change', event);
            },
            getClass(){
                var arr = [`ui-input-${this.type}`];
                if(this.prepend ||　this.append){
                    arr.push("ui-input-group")
                }
                return arr
            },
            changeInputType(){
                this.showPassword = !this.showPassword;
                this.type = this.showPassword ? "password" : "text";
            }
        }
    }
</script>
