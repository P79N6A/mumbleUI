<script>
import * as util from '../../utils/util.js';
export default {
    name: 'Column',
    props: {
        prop: {
            type: String,
            default: undefined
        },
        name: {
            type: [String, Function, Object],
            default: undefined
        },
        align: {
            type: String,
            default: 'center'
        },
        filter: {
            type: [Array, Function],
            default: undefined
        },
        action: {
            type: [Array, Object],
            default: undefined
        },
        sort: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: undefined
        },
        classes: {
            type: [String, Function],
            default: undefined
        },
        component: {
            type: Function,
            default: undefined
        },
        type: {
            type: String,
            default: undefined
        },
        disabled: {
            type: Function,
            default: undefined
        },
        detailComponent: {
            type: Function,
            default: undefined
        }
    },
    data: function () {
        return {
            sortDirection: '',
            children: [],
            parent: this.$parent
        }
    },
    created() {
        this.$options.render = h => h('span', this.$slots.default);
        let _self = this;
        if (this.type === 'expand') {
            this.parent.renderExpanded = function (data) {
                return _self.$scopedSlots.default
                    ? _self.$scopedSlots.default(data)
                    : _self.$slots.default;
            };
        }
        if (this.type == 'selection') {
            if (util.isFunction(this.disabled)) {
                this.parent.disabledRow = this.disabled
            }
        }
    },
    mounted: function () {
        if (this.action && util.isObject(this.action) && !util.isArray(this.action)) {
            this.action = [this.action];
        }
        this.children = this.$children.filter(child=>{
            return child.$options.name == 'Column'
        })
        if (this.parent && (this.parent.$options.name == 'Table' || this.parent.$options.name == 'TreeTable')) {
            this.parent.addColumn(this);
        }
    },
    beforeDestroy: function () {
        if (this.parent && (this.parent.$options.name == 'Table' || this.parent.$options.name == 'TreeTable')) {
            this.parent.removeColumn(this);
        }
    }
}
</script>
