<template>
    <li :class="subMenuClassNames" @mouseover="toggle" @mouseout="toggle">
        <div class="ui-menu-submenu-title" @click="click">
            {{ title }}
            <div :class="arrowClassNames">
                <Icon type="down" size="12" />
            </div>
        </div>
        <ul v-show="active" ref="submenuSwap" class="ui-menu-submenu-ul">
            <slot />
        </ul>
    </li>
</template>
<script>
import Emitter from '../../mixins/emitter';
export default {
    name: 'SubMenu',
    mixins: [Emitter],
    props: {
        title: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            children: [],
            active: false,
            choosed: false
        };
    },
    computed: {
        arrowClassNames() {
            return {
                'ui-menu-arrow': true,
                'ui-menu-arrow-active': this.active
            };
        },
        subMenuClassNames() {
            return {
                'ui-menu-submenu': true,
                'ui-menu-submenu-actived': this.active,
                'ui-menu-submenu-choosed': this.choosed
            };
        }
    },
    mounted() {
        // 如果是垂直状态，计算下UL的最低宽度
        if (this.$parent.mode == 'horizontal') {
            this.$refs.submenuSwap.style['min-width'] = this.$el.clientWidth + 'px';
        }

        // 拿到它的子菜单
        this.children = this.getItems(this.$children);

        // 点击了一项菜单
        this.$on('fes_menu_activeName', name => {
            if (this.children.indexOf(name) != -1) {
                this.choosed = true;
                // this.active = true;
                // 水平模式下, 选择完子项，150毫秒之后消失下拉框
                if (this.$parent.mode == 'horizontal') {
                    setTimeout(() => {
                        this.active = false;
                    }, 150);
                }
            } else {
                this.choosed = false;
                // this.active = false;
            }
        });

        this.$on('fes_submenu_close_other', args => {
            if (args._uid != this._uid) {
                this.active = false;
            }
        });

        
    },
    methods: {
        toggle(e) {
            // 垂直模式下, 悬浮切换关闭
            if (this.$parent.mode == 'horizontal') {
                if (e.type == 'mouseover') {
                    if (this.toggleTimer) {
                        clearTimeout(this.toggleTimer);
                    }
                    this.active = true;
                }
                if (e.type == 'mouseout') {
                    this.toggleTimer = setTimeout(() => {
                        this.active = false;
                    }, 200);
                }
            }
        },
        click() {
            this.dispatch('Menu', 'fes_submenu_click', this);
            // 垂直模式下, 点击切换关闭
            if (this.$parent.mode == 'vertical') {
                this.active = !this.active;
            }
        },
        getItems(columns) {
            const result = [];
            if (columns) {
                columns.forEach(column => {
                    if (column.$options.name == 'MenuItem') {
                        result.push(column.name);
                    }
                    if (column.$children && column.$children.length > 0) {
                        result.push.apply(result, this.getItems(column.$children));
                    }
                });
            }
            return result;
        }
    }
};
</script>