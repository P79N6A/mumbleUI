<template>
    <div v-clickoutside="close" :class="{'ui-select-visible': showList,
                                         'ui-select-disabled': disabled,
                                         'ui-select-readonly': readonly,
                                         'ui-select-multiple': multiple}" class="ui-select">
        <div ref="selection" :tabindex="getTabindex" class="ui-select-selection" @click="toggle" @focus="focus" @blur="blur" @keydown="keydown">
            <template v-if="multiple">
                <span v-if="currentValue==='' || currentValue.length==0" class="ui-select-placeholder">
                    {{ placeholder || localPlaceholder }}
                </span>
                <template v-else>
                    <span v-for="(option, index) in selectedOption" :key="index" class="ui-select-selected-value">
                        {{ option.currentLabel }}
                        <Icon type="close" @click.stop="removeSelectedOption(option)" />
                    </span>
                </template>
            </template>
            <template v-else>
                <span :class="getUISelectClass">
                    {{ (selectedOption && selectedOption.currentLabel) || placeholder || localPlaceholder }}
                </span>
            </template>
            <div class="ui-select-selection-icons">
                <Icon v-show="!showClear" type="caret-down" />
                <Icon v-if="clearable" v-show="showClear" type="close-circle" @click.stop="clear" />
            </div>
        </div>
        <div v-show="showList" ref="list" :class="{'no-option-children': noChildren}" class="ui-select-dropdown" transition="slide">
            <template v-if="filterable">
                <input ref="searchInput" v-model="searchValue" :placeholder="t('el.select.searchPlaceholder')" class="ui-select-selected-input" @input="changeSearchValue" @keydown="keydown">
            </template>
            <ul class="ui-select-dropdown-list" @click="selectOption">
                <slot />
                <template v-if="noChildren">
                    <li v-for="(item, index) in currentOptions" :key="index" :data-key="item.value" :class="{
                            'ui-select-item-selected': item.selected,
                            'ui-select-item-disabled': item.disabled || (disableLimit && !item.selected),
                            'focus': item.isFocus
                        }"
                        class="ui-select-item"
                        @mouseover="doFocus(item)">
                        {{ item.text }}
                    </li>
                    <li class="ui-select-pagination">
                        <wb-button :disabled="pagination.current == 0" icon="swap-left" type="text" @click.stop="prev" />
                        <wb-button :disabled="pagination.current == Math.ceil(searchOptions.length / pagination.size) - 1" icon="swap-right" type="text" @click.stop="next" />
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script>
import clickoutside from '../../directives/clickoutside.js';
import emitter from '../../mixins/emitter';
import * as util from '../../utils/util.js';
import keyCode from '../../utils/keyCode.js';
import locale from '../../i18n/mixin.js';
export default {
    name: 'WbSelect',
    directives: {
        clickoutside
    },
    mixins: [emitter, locale],
    props: {
        value: {
            type: [String, Number, Array],
            default: ''
        },
        placeholder: {
            type: String,
            default() {
                return ''
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        filterable: {
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
        multiple: {
            type: Boolean,
            default: false
        },
        multipleLimit: {
            type: Number,
            default: 0
        },
        options: {
            type: Array,
            default() {
                return []
            }
        },
        optionsValueName: {
            type: String,
            default: 'value'
        },
        optionsTextName: {
            type: String,
            default: 'text'
        }
    },
    data: function () {
        let myOptions = this.makeData();
        return {
            focusOption: null,
            currentValue: this.value,
            searchValue: '',
            showClear: false,
            showList: false,
            myOptions,
            noChildren: myOptions.length,
            pagination: {
                size: 100,
                current: 0
            },
            searching: false
        }
    },
    computed: {
        getTabindex() {
            if (this.disabled || this.readonly) {
                return -1
            }
            return 0
        },
        getUISelectClass() {
            if (this.selectedOption && this.selectedOption.currentLabel) {
                return 'ui-select-selected-value';
            } else {
                return 'ui-select-placeholder';
            }
        },
        localPlaceholder() {
            return this.t('el.select.placeholder')
        },
        selectedOption() {
            var arr = [];
            this.myOptions.forEach((option) => {
                if (option.selected) {
                    arr.push(option)
                }
            });
            if (this.multiple) {
                return arr
            } else {
                if (arr.length > 0) {
                    return arr[0]
                } else {
                    return null
                }
            }
        },
        disableLimit() {
            let { currentValue, multiple, multipleLimit } = this;
            let disableLimit = false;
            if (multiple) {
                disableLimit = (currentValue || []).length >= multipleLimit && multipleLimit > 0;
            }
            return disableLimit
        },
        searchOptions() {
            let searchOptions = [];
            this.myOptions.forEach(option=>{
                if (this.searchValue && option.text.indexOf(this.searchValue) != -1) {
                    searchOptions.push(option)
                } else if (!this.searchValue) {
                    searchOptions.push(option)
                }
            })
            return searchOptions
        },
        currentOptions() {
            let start = this.pagination.size * this.pagination.current;
            let arr = this.searchOptions.slice(start, start + this.pagination.size);
            return arr
        }
    },
    watch: {
        value(value) {
            if (value === this.currentValue) return;
            this.currentValue = value;
            this.changeCurrentValue();
        },
        showList(value) {
            if (this.filterable && value) {
                this.$nextTick(function () {
                    this.$refs.searchInput.focus();
                })
            }
        },
        options: {
            handler() {
                this.myOptions = this.makeData();
                this.noChildren = this.myOptions.length;
            },
            deep: true
        }
    },
    created() {
        this.addOptionCache = [];
        const debounce = function (fn) {
            let waiting;
            return function () {
                if (waiting) return;
                waiting = true;
                const context = this,
                    args = arguments;
                const later = function () {
                    waiting = false;
                    fn.apply(context, args);
                };
                this.$nextTick(later);
            };
        };
        this.debouncedAppend = debounce(function () {
            this.myOptions = this.myOptions.concat(this.addOptionCache);
            this.addOptionCache = [];
        })
    },
    beforeDestroy() {
        // 如果Select组件销毁，则把这个清除。然后removeOption的逻辑就不会执行，则不会触发可能的改变currentValue的逻辑
        this.myOptions = [];
    },
    methods: {
        addOption(option) {
            this.addOptionCache.push(option);
            this.debouncedAppend();
        },
        removeOption(option) {
            if (this.myOptions.length === 0) {
                return;
            }
            var index = this.myOptions.indexOf(option);
            if (index != -1) {
                this.myOptions.splice(index, 1)
            }
            // 如果删除的option在选中状态，则清除选中的值
            if (option.selected) {
                if (this.multiple) {
                    let i = this.currentValue.indexOf(option.value);
                    if (i != -1) {
                        this.currentValue.splice(index, 1);
                    }
                } else {
                    this.currentValue = '';
                }
                this.changeCurrentValue();
            }
        },
        makeData() {
            let myOptions = [];
            let use = [];
            this.options.forEach(option=>{
                let text = option[this.optionsTextName];
                let value = option[this.optionsValueName];
                let selected;
                if (this.multiple) {
                    selected = (this.value.indexOf(value) != -1);
                } else {
                    selected = (this.value === value);
                }
                selected && use.push(value);
                myOptions.push(Object.assign({
                    selected: selected || false,
                    isFocus: false,
                    currentLabel: text,
                    value: value,
                    text: text
                }, option))
            })
            // 如果value中的某个值，不在options中的话，则清除value中的那个值
            // 只有初始化之后的才这样
            if (this.searching) {
                if (this.multiple) {
                    if (this.value.length !== use.length || !this.value.every(val=>{
                        return use.indexOf(val) != -1
                    })) {
                        this.currentValue = use;
                        this.changeCurrentValue();
                    }
                } else if (!use.some(val=>{
                    return val === this.value
                })) {
                    setTimeout(() => {
                        this.currentValue = '';
                        this.changeCurrentValue();
                    }, 0);
                }
                this.searching = false;
            }
            return myOptions
        },
        selectOption(e) {
            if (this.disabled || this.readonly) {
                return
            }
            let key = e.target.getAttribute('data-key');
            let options = this.myOptions.filter(option=>{
                return option.value == key;
            })
            if (options.length > 0) {
                let option = options[0];
                if (option.disabled) {
                    return;
                }
                if (this.disableLimit && !option.selected) {
                    return;
                }
                this.clickOption(option);
            }
        },
        clickOption(option) {
            if (this.disabled || this.readonly) return;
            if (this.multiple) {
                var index = this.currentValue.indexOf(option.value);
                if (index != -1) {
                    this.currentValue.splice(index, 1);
                } else if (this.multipleLimit <= 0 || this.currentValue.length < this.multipleLimit) {
                    this.currentValue.push(option.value);
                }
            } else {
                this.showList = false;
                this.currentValue = option.value;
            }
            this.changeCurrentValue();
        },
        changeCurrentValue() {
            // 如果是高性能模式，则当值改变时，需要变更selected状态
            if (this.noChildren) {
                this.myOptions.forEach(option=>{
                    let selected;
                    if (this.multiple) {
                        selected = (this.currentValue.indexOf(option.value) != -1);
                    } else {
                        selected = (this.currentValue === option.value);
                    }
                    option.selected = selected;
                })
            }
            this.$emit('input', this.currentValue);
            this.$emit('change', this.currentValue);
            this.$emit('on-change', this.currentValue);
            this.dispatch('FormItem', 'on-form-change', [this.currentValue]);
        },
        removeSelectedOption(option) {
            if (this.disabled || this.readonly) return;
            var index = this.currentValue.indexOf(option.value);
            if (index != -1) {
                this.currentValue.splice(index, 1)
            }
            this.changeCurrentValue();
        },
        changeSearchValue: util.debounce(function () {
            this.searching = true;
            this.$emit('on-search', this.searchValue);
            this.pagination.current = 0;
        }, 200),
        blur() {
            this.$emit('on-blur');
            if (!this.disabled && !this.readonly && this.clearable) {
                this.showClear = false;
            }
        },
        focus() {
            this.$emit('on-focus');
            if (!this.disabled && !this.readonly && this.clearable && (this.currentValue != '' || this.currentValue.length > 0)) {
                this.showClear = true;
            }
        },
        toggle() {
            this.$emit('on-click');
            if (this.disabled || this.readonly) return;
            this.showList = !this.showList;
            this.$nextTick(function () {
                let bottom = util.getViewport().height - this.$el.getBoundingClientRect().bottom;
                if (!this.listHeight) {
                    this.listHeight = this.$refs.list.clientHeight;
                }
                if (bottom - this.listHeight < 0) {
                    this.$refs.list.style.top = '-' + (this.listHeight + 10) + 'px'
                } else {
                    this.$refs.list.style.top = '32px'
                }
            })
        },
        clear() {
            if (this.disabled || this.readonly) return;
            this.showClear = false;
            if (!this.multiple) {
                this.currentValue = '';
            } else {
                this.currentValue = [];
            }
            this.searchValue = '';
            this.changeCurrentValue();
        },
        close() {
            if (this.showList) {
                this.dispatch('FormItem', 'on-form-blur', [this.currentValue]);
            }
            this.showList = false;
            this.searchValue = '';
        },
        prev() {
            if (this.pagination.current > 0) {
                this.pagination.current -= 1;
                this.$nextTick(function () {
                    this.$refs.list.scrollTop = 0;
                })
            }
        },
        next() {
            if (this.pagination.current < Math.ceil(this.searchOptions.length / this.pagination.size)) {
                this.pagination.current += 1;
                this.$nextTick(function () {
                    this.$refs.list.scrollTop = 0;
                })
            }
        },
        doFocus(option) {
            if (this.focusOption) {
                this.focusOption.isFocus = false
            }
            option.isFocus = true;
            this.focusOption = option;
        },
        keydown(e) {
            if (this.disabled || this.readonly) return;
            if (!this.showList) {
                if (e.keyCode == keyCode.SPACE || e.keyCode == keyCode.ENTER || e.keyCode == keyCode.MAC_ENTER) {
                    e.preventDefault();
                    this.showList = true;
                }
            } else {
                if (e.keyCode == keyCode.DOWN || e.keyCode == keyCode.UP) {
                    e.preventDefault();
                    this.mouseChooseOption( e.keyCode );
                }
                if (e.keyCode == keyCode.ENTER || e.keyCode == keyCode.MAC_ENTER || e.keyCode == keyCode.SPACE) {
                    e.preventDefault();
                    if (!this.focusOption) return;
                    if (this.focusOption.disabled) return;
                    if (this.disableLimit && !this.focusOption.selected) {
                        return;
                    }
                    this.clickOption(this.focusOption);
                    this.$refs.selection.focus();
                }
            }
        },
        mouseChooseOption(direction) {
            let index = direction == keyCode.DOWN ? 0 : this.myOptions.length - 1;
            this.myOptions.forEach((item, _index)=>{
                if (this.focusOption && item.value === this.focusOption.value) {
                    index = direction == keyCode.DOWN ? _index + 1 : _index - 1;
                    if (direction == keyCode.DOWN) {
                        if (index > this.myOptions.length - 1 ) {
                            index = 0;
                        }
                    } else if (direction == keyCode.UP) {
                        if (index < 0) {
                            index = this.myOptions.length - 1;
                        }
                    }
                }
            })
            let focusOption = this.myOptions[index];
            if (this.focusOption) {
                this.focusOption.isFocus = false;
                this.focusOption = null;
            }
            focusOption.isFocus = true;
            this.focusOption = focusOption;
            if (this.focusOption.disabled || (this.disableLimit && !this.focusOption.selected)) {
                this.mouseChooseOption(direction);
            }
        }
    }
}
</script>
