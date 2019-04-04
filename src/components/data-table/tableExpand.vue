<script>
export default {
    props: {
        cols: {
            type: Array,
            default: undefined
        },
        trData: {
            type: Object,
            default: undefined
        },
        renderExpanded: {
            type: Function,
            default: undefined
        }
    },
    data: function () {
        return {}
    },
    render: function (h) {
        return h('td', {
            attrs: {
                colspan: this.cols.length
            },
            class: 'ui-table-expanded-cell'
        }, [this.renderExpanded(this.trData)])
    }
}
</script>