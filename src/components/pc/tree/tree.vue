<template>
    <ul class="tree">
        <default-node v-for="node in list" :node.sync="node"></default-node>
    </ul>
</template>
<script type="text/ecmascript-6">
    import defaultNode from "./defaultNode.vue";
    import Vue from 'vue'
    function recursion(node) {
        if (node.children && node.children.length > 0) {
            Vue.set(node, "expanded", false);
            var f = node.children.every(function (item) {
                return !item.children || item.children.length == 0
            });
            if (f) {
                Vue.set(node, "allChildIsData", true);
            } else {
                node.children.forEach(function (item) {
                    recursion(item)
                })
            }
        }
    }
    export default {
        components: {
            defaultNode : defaultNode
        },
        props: {
            list: {
                type: Array
            }
        },
        data: function () {
            return {
            }
        },
        ready: function () {
            this.list.forEach(function (node) {
                recursion(node)
            })
            console.log(this.list)
        },
        watch : {
            //因为treeList数据可能是异步取的，当组件初始化时，它还是空的, 之后它还会更新
            "list": function () {
                this.list.forEach(function (node) {
                    recursion(node)
                })
            }
        },
    }
</script>
<style src="./tree.scss" lang="scss"></style>
