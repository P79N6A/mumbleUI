<template>
    <wb-menu :width="width" :active-name="activeName" :type="type" :mode="mode" :auto-close="autoClose" @select="select">
        <template v-if="menu && menu.length > 0">
            <template v-for="(item, index) in menu">
                <wb-sub-menu v-if="item.subMenu && item.subMenu.length > 0" :title="item.title" :key="item.title+index">
                    <wb-menu-item v-for="subItem in item.subMenu" :name="subItem.path" :key="subItem.path">
                        {{ subItem.title }}
                    </wb-menu-item>
                </wb-sub-menu>
                <wb-menu-item v-else :name="item.path" :key="item.path">
                    {{ item.title }}
                </wb-menu-item>
            </template>
        </template>
    </wb-menu>
</template>

<script>
import { oneOf } from '../../utils/util';
import WbMenu from './menu.vue';
import WbMenuItem from './menuItem.vue';
import WbSubMenu from './subMenu.vue';
import WbMenuGroup from './menuGroup.vue';
import Emitter from '../../mixins/emitter'

export default {
    name: 'RouteMenu',
    components: {
        WbMenu,
        WbMenuGroup,
        WbMenuItem,
        WbSubMenu
    },
    mixins: [ Emitter ],
    props: {
        mode: {
            validator(value) {
                return oneOf(value, ['horizontal', 'vertical']);
            },
            default: 'vertical' // 垂直模式
        },
        width: {
            type: [String, Number],
            default: undefined
        },
        menu: {
            type: Array,
            default: undefined
        },
        type: {
            validator(value) {
                return oneOf(value, ['light', 'dark']);
            },
            default: 'light'
        },
        autoClose: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            activeName: ''
        };
    },
    computed: {
        allPath() {
            let menu = this.menu;
            let allPath = [];
            for (let i = 0; i < menu.length; i++) {
                let item = menu[i];
                if (item.path && (!item.subMenu || item.subMenu.length === 0) ) {
                    allPath.push(item.path);
                } else if (item.subMenu && item.subMenu.length > 0) {
                    for (let j = 0; j < item.subMenu.length; j++) {
                        let subItem = item.subMenu[j];
                        if (subItem.path) {
                            allPath.push(subItem.path);
                        }
                    }
                }
            }
            return allPath;
        }
    },
    watch: {
        '$route'() {
            this.$nextTick(function () {
                let path = this.$route.path.split('?')[0];
                if (this.allPath.indexOf(path) !== -1) {
                    this.activeName = path;
                }
                this.broadcast('Menu', 'fes_allowPage_change');
            })
        },
        'menu': {
            handler() {
                this.$nextTick(function () {
                    this.broadcast('Menu', 'fes_allowPage_change');
                })
            },
            deep: true
        }
    },
    mounted() {
        let path = this.$route.path.split('?')[0];
        if (this.allPath.indexOf(path) !== -1) {
            this.activeName = path;
        }
    },
    methods: {
        select(name) {
            if (name) {
                this.$router.push(name)
            }
        }
    }
}
</script>