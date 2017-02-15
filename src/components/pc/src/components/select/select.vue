<template>
    <div class="ui-select" :class="{'ivu-select-visible': show}" v-clickoutside="close">
        <div class="ui-select-selection" @click="toggle">
            <span class="ui-select-placeholder" v-show="value==''">{{placeholder}}</span>
            <span class="ui-select-selected-value" v-show="value!=''">{{selectedOption && selectedOption.showLabel}}</span>
            <i class="ui-icon ui-icon-caret-down"></i>
        </div>
        <div class="ui-select-dropdown" v-show="show" transition="slide">
            <ul class="ui-select-dropdown-list">
                <slot></slot>
            </ul>
        </div>
    </div>
</template>
<script>
    import * as util from "../../util.js";
    import clickoutside from "../../directives/clickoutside.js";
    export default {
        props: {
            value: {
                type: [String, Number],
                default: "",
                required: true
            },
            placeholder: {
                type: String,
                default: "请选择"
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
        },
        directives: {
            clickoutside
        },
        data: function () {
            return {
                show : false,
                options: [],
                selectedOption: null,
            }
        },
        computed: {},
        watch: {},
        ready: function () {
            this.initChildren();
            this.$on("option.selected", function (value) {
                if(this.selectedOption){
                    this.selectedOption.selected = false;
                }
                var len = this.options.length;
                for(var i=0; i<len; i++){
                    var option = this.options[i];
                    if(option.value == value){
                        option.selected = true;
                        this.selectedOption = option;
                        this.value = option.value;
                        this.$emit("on-change", this.value);
                        break;
                    }
                }
                this.show = false;
            })
        },
        methods: {
            toggle(){
                this.show = !this.show;
            },
            close(){
                this.show = false;
            },
            initChildren: function () {
                if(this.$children){
                    this.$children.forEach((option, index) =>{
                        option.index = index + 1;
                        option.label = (option.label === undefined) ? option.$el.innerHTML : option.label;
                        this.options.push(option);
                    })
                }
            }
        }
    }
</script>
