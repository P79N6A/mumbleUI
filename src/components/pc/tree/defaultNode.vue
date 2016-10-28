<template>
    <li class="item">
        <i v-if="node.children && node.children.length>0" class="icon" :class="arrowClass(node)" @click="clickIcon(node)"></i>
        <i v-else class="icon"></i>
        <span @click="clickItem(node)" class="name">
            {{ node.name }}
        </span>
        <ul v-if="node.children && node.children.length > 0" v-show="node.expanded" class="tree child" :class="{'all-data': node.allChildIsData}">
            <item v-for="sonNode in node.children" :parent-node.sync="node" :node.sync="sonNode"></item>
        </ul>
    </li>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue'
    export default {
        name: "item",
        props: {
            parentNode: Object,         //上级节点
            node: Object                //本节点
        },
        data: function () {
            return {}
        },
        methods: {
            arrowClass: function (node) {
                var className = "";
                if (node.expanded) {
                    className = "icon-minus";
                } else {
                    className = "icon-plus";
                }
                return className
            },
            clickIcon: function (node) {
                node.expanded = !node.expanded;
            },
            clickItem: function (node) {
                Vue.set(node, "selected", !node.selected);
                this.$dispatch("tree.choose", node, this.parentNode);
            }
        }
    }
</script>
