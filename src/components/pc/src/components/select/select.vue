<template>
    <div class="ui-select" :class="{'ui-select-visible': showList, 'ui-select-disabled': disabled}"
         v-clickoutside="close">
        <div class="ui-select-selection" @click="toggle" @mouseenter="focus" @mouseleave="blur">
            <span class="ui-select-placeholder" v-show="value==''">{{placeholder}}</span>
            <span class="ui-select-selected-value"
                  v-show="value!=''">{{selectedOption && selectedOption.showLabel}}</span>
            <i v-show="!showClear" class="ui-icon ui-icon-caret-down"></i>
            <i v-if="clearable" v-show="showClear" class="ui-icon ui-icon-close-circle" @click.stop="clear"></i>
        </div>
        <div class="ui-select-dropdown" v-show="showList" transition="slide">
            <ul class="ui-select-dropdown-list">
                <slot></slot>
            </ul>
        </div>
    </div>
</template>
<script>
    import * as util from "../../utils/util.js";
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
            clearable: {
                type: Boolean,
                default: true
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
                showClear: false,
                showList: false,
                options: [],
                selectedOption: null,
            }
        },
        computed: {},
        watch: {},
        ready: function () {
            this.initChildren();
            this.$on("option.selected", function (value) {
                if (this.selectedOption) {
                    this.selectedOption.selected = false;
                }
                var len = this.options.length;
                for (var i = 0; i < len; i++) {
                    var option = this.options[i];
                    if (option.value == value) {
                        option.selected = true;
                        this.selectedOption = option;
                        this.value = option.value;
                        this.$emit("on-change", this.value);
                        break;
                    }
                }
                this.showList = false;
            })
        },
        methods: {
            blur(){
                if (!this.disabled && this.clearable && this.value != '') {
                    this.showClear = false;
                }
            },
            focus(){
                if (!this.disabled && this.clearable && this.value != '') {
                    this.showClear = true;
                }
            },
            toggle(){
                if (this.disabled) return;
                this.showList = !this.showList;
            },
            clear(){
                this.value = "";
                this.showClear = false;
                this.$emit("on-change", this.value);
            },
            close(){
                this.showList = false;
            },
            initChildren: function () {
                if (this.$children) {
                    this.$children.forEach((option, index) => {
                        option.index = index + 1;
                        option.label = (option.label === undefined) ? option.$el.innerHTML : option.label;
                        this.options.push(option);
                    })
                }
            }
        }
    }
</script>
