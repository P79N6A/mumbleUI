```html
<template>
    <Tree ref="tree" :data="data">
        <template slot-scope="{node, root}">
            <contextmenu :data="actions" @on-choose="doAction(node,arguments)">
                <span > {{ node.name }} </span>
            </contextmenu>
        </template>
    </Tree>
</template>
<script>
    export default {
        data: function () {
          return {
              data: [{
                name: 'Jiangsu',
                code: 'js',
                expand: true,
                children: [{
                    name: 'Nanjing',
                    code: 'nj',
                    selected: true
                }, {
                    name: 'Suzhou',
                    code: 'sz',
                    children: [{
                        name: 'Wujiang',
                        code: 'wj'
                    }, {
                        name: 'Changshu',
                        code: 'cs'
                    }]
                }]
            }, {
                name: 'Yunnan',
                code: 'yn'
            }, {
                name: 'Fujian',
                code: 'fj'
            }],
            actions: [ '增加子节点', '删除节点', '复制节点']
          }
        },
        methods: {
            doAction(node, [data, index]){
                if(index === 0){
                    this.$refs.tree.addNode(node, {
                        name: "test",
                        code: "111",
                    })
                }
                if(index === 1){
                    this.$refs.tree.removeNode(node)
                }
            }
        }
    }
</script>
```