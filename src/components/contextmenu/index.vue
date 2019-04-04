<template>
    <div v-clickoutside="clickoutside('menu')" v-mouseoutside="clickoutside('menu')" class="ui-contextmenu">
        <div class="ui-contextmenu-slot" @contextmenu.prevent.stop="showMenu">
            <slot />
        </div>
        <div v-clickoutside="clickoutside('list')" v-mouseoutside="clickoutside('list')" v-if="data.length>0" v-show="show" :style="getStyle" class="ui-contextmenu-list" @click.stop>
            <div v-for="(item, index) in data" :key="index" class="ui-contextmenu-item" @click="choose(item, index)">{{ item }}</div>
        </div>
    </div>
</template>
<script>
import clickoutside from '../../directives/clickoutside';
import mouseoutside from '../../directives/mouseoutside';
export default {
    name: 'Contextmenu',
    directives: {
        clickoutside, mouseoutside
    },
    props: {
        data: {
            type: Array,
            default: undefined
        },
        clickNoClose: {
            type: Boolean,
            default: undefined
        }
    },
    data() {
        return {
            show: false,
            left: 0,
            top: 0
        }
    },
    computed: {
        getStyle() {
            return {
                left: this.left + 'px',
                top: this.top + 'px'
            }
        }
    },
    methods: {
        showMenu(e) {
            this.left = e.offsetX;
            this.top = e.offsetY;
            this.show = true;
        },
        clickoutside(type) {
            let that = this;
            let fn = function () {
                that.show = false;
            }
            if (!this.clickNoClose && type === 'list') {
                return fn;
            } else if (this.clickNoClose && type === 'menu') {
                return fn;
            }
        },
        choose(item, index) {
            this.show = false;
            this.$emit('on-choose', item, index)
        }
    }
}
</script>
