<template>
    <div class="ui-tabs">
        <div :class="{'ui-tabs-header-card': isCard}" class="ui-tabs-header">
            <div ref="container" :class="{'ui-tabs-header-scroll': scrollable }" class="ui-tabs-header-container">
                <template v-if="scrollable">
                    <Icon :class="{disabled:scrollIndex==0}" class="button-left" type="left" size="14" @click="scrollPrev" />
                    <Icon :class="{disabled:scrollIndex==tabs.length-1}" class="button-right" type="right" size="14" @click="scrollNext" />
                </template>
                <div ref="nav" :style="navStyle" class="ui-tabs-header-swap">
                    <div v-for="(tab, index) in tabs" :ref="tab.tabName" :key="tab.tabName" :class="getHeaderClass(tab, index)" :draggable="draggable" class="ui-tabs-header-item"
                         @click="choose(tab, index)" @dragstart.stop="dragstart($event, index)" @dragenter.stop="dragenter($event, index)" @dragend.stop="dragend">
                        <div class="ui-tabs-header-label">
                            <i v-if="tab.icon" :class="getIconClass(tab)" />
                            <template v-if="isString(tab.label)">
                                {{ tab.label }}
                            </template>
                            <template v-if="isObject(tab.label)">
                                <tab-component :component="tab.label" />
                            </template>
                        </div>
                        <Icon v-if="closable" type="close" size="14" class="button-close" @click.stop="removeTab(tab)" />
                    </div>
                </div>
            </div>
            <div class="ui-tab-buttons">
                <slot name="action" />
            </div>
        </div>
        <div class="ui-tabs-body">
            <slot />
        </div>
    </div>
</template>
<script>
import { isObject, isString } from '../../utils/util'
import WbButton from '../button'
import tabComponent from './tabComponent.vue';
export default {
    name: 'Tabs',
    components: {
        WbButton,
        tabComponent
    },
    props: {
        value: {
            type: [Number, String],
            default: 1
        },
        type: {
            type: String,
            default: undefined
        },
        closable: {
            type: Boolean,
            default: false
        },
        draggable: {
            type: Boolean,
            default: false
        }
    },
    data: function () {
        return {
            uid: 1,
            activeKey: this.value,
            tabs: [],
            cacheTabs: [],
            scrollable: false,
            navStyle: {
                transform: ''
            },
            dragIndex: null,
            dragItem: null,
            scrollIndex: 0
        }
    },
    computed: {
        isCard() {
            return this.type === 'card'
        }
    },
    watch: {
        'value': function () {
            this.activeKey = this.value;
        },
        'tabs': function () {
            if (this.tabs.length > 0) {
                this.$nextTick(()=> {
                    this.isScrollable();
                })
            }
        },
        'scrollIndex': function () {
            let offset = 0;
            for (let i = 0; i < this.scrollIndex; i++) {
                let tabDom = this.$refs[this.tabs[i].tabName];
                offset += tabDom ? tabDom[0].offsetWidth : 0;
            }
            this.setOffset(offset);
        }
    },
    methods: {
        isString,
        isObject,
        isScrollable() {
            const navWidth = this.$refs.nav ? this.$refs.nav.offsetWidth : 0;
            const containerWidth = this.$refs.container ? this.$refs.container.offsetWidth : 0;
            this.scrollable = navWidth > containerWidth;
            if (!this.scrollable) {
                this.scrollIndex = 0;
            }
        },
        getIconClass(item) {
            return `ui-icon ui-icon-${item.icon}`
        },
        getHeaderClass(tab, index) {
            var arr = [];
            if (tab.show) {
                arr.push('ui-tabs-header-current')
            }
            if (tab.disabled) {
                arr.push('ui-tabs-header-disabled')
            }
            if ( index == this.dragIndex ) {
                arr.push('ui-tabs-header-draging')
            }
            return arr
        },
        addTab(tab) {
            tab.tabName = tab.name || this.uid;
            this.tabs.push(tab);
            this.cacheTabs.push(tab);
            this.uid++;
        },
        removeTab(tab) {
            let index = this.tabs.indexOf(tab);
            if (index != -1) {
                this.tabs.splice(index, 1);
                this.$emit('on-tab-remove', tab.tabName, index);
            }
            if (tab.show && this.tabs.length > 0) {
                let newIndex = index - 1 < 0 ? index : index - 1;
                this.activeKey = this.tabs[newIndex].tabName;
            }
        },
        choose(tab) {
            this.activeKey = tab.tabName;
            this.$emit('input', tab.tabName);
            this.$emit('on-click', tab.tabName);
        },
        getCurrentScrollOffset() {
            return this.navStyle.transform ?
                Number(this.navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1])
                : 0;
        },
        scrollNext() {
            if (this.scrollIndex < this.tabs.length - 1) {
                this.scrollIndex += 1;
            }
        },
        scrollPrev() {
            if (this.scrollIndex > 0) {
                this.scrollIndex -= 1;
            }
        },
        setOffset(newOffset) {
            this.navStyle.transform = `translateX(-${newOffset}px)`
        },
        dragstart(e, index) {
            if (!this.draggable) {
                return;
            }
            this.dragIndex = index;
            this.dragItem = this.tabs[index];
        },
        dragenter(e, index) {
            if (!this.draggable) {
                return;
            }
            if (this.dragIndex != index) {
                var obj = this.tabs[this.dragIndex];
                this.tabs.splice(this.dragIndex, 1);
                this.tabs.splice(index, 0, obj);
                this.$emit('on-tab-change', {
                    from: this.dragIndex,
                    to: index
                });
                this.dragIndex = index;
            }
        },
        dragend() {
            if (!this.draggable) {
                return;
            }
            this.dragItem = null;
            this.dragIndex = null;
        },
        reset() {
            // 保存开始的顺序，提供接口恢复原状
            this.tabs = this.cacheTabs;
            this.cacheTabs = [];
            this.tabs.forEach(item=>{
                this.cacheTabs.push(item)
            })
        }
    }
}
</script>

