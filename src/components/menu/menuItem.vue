<template>
    <li :class="classNames" @click="click"><slot /></li>
</template>
<script>
import Emitter from '../../mixins/emitter';

export default {
    name: 'MenuItem',
    mixins: [Emitter],
    props: {
        name: {
            required: true,
            type: [String, Number]
        }
    },
    data() {
        return {
            actived: false
        };
    },
    computed: {
        classNames() {
            return {
                'ui-menu-item-actived': this.actived,
                'ui-menu-item': true
            };
        }
    },
    mounted() {
        this.$on('fes_menu_activeName', name => {
            this.actived = name === this.name;
        });
    },
    methods: {
        click() {
            this.dispatch('Menu', 'fes_menu_item_click', this.name);
        }
    }
};
</script>