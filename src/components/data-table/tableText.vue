<template>
    <span>
        {{ text }}
    </span>
</template>
<script>
import * as util from '../../utils/util.js';
export default {
    props: {
        col: {
            type: Object,
            default: undefined
        },
        trData: {
            type: Object,
            default: undefined
        }
    },
    computed: {
        text() {
            let col = this.col;
            let filter = col.filter;
            let rst = this.trData[col.prop];
            // 如果filter存在
            if (util.isArray(filter)) {
                var theOne = col.filter.filter(function (o) {
                    return o.value == rst;
                });
                if (theOne.length > 0) {
                    rst = theOne[0].text
                }
            } else if (util.isFunction(col.filter)) {
                rst = col.filter(rst, this.trData)
            }
            return rst
        }
    }
}
</script>
