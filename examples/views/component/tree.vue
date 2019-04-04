<template>
    <div class="tree-page article">
        <h1>Tree 树形控件</h1>
        <h2>概述</h2>
        <p>文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。</p>

        <h2>代码示例</h2>
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Tree :data="data"></Tree>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>最简单的用法，点击节点可选中节点。节点expand属性配置节点是否展开。</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Tree :data="data" multiple :inline="false"></Tree>
                </div>
                <div class="panel-header">
                    <span>多选 + 非inline展示</span>
                </div>
                <div class="panel-desc">
                    <p>设置multiple则Tree组件是多选的，则出现checkbox框。设置inline为false，则底层节点垂直排列，非横向排列</p>
                </div>
            </div>
            <markdown2 slot="code"></markdown2>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Tree :data="data2" multiple :load-data="loadData"></Tree>
                </div>
                <div class="panel-header">
                    <span>动态加载数据</span>
                </div>
                <div class="panel-desc">
                    <p>点击展开时，动态去加载子数据，如果已经加载过，则改为展开和关闭</p>
                    <p>子节点是否选中继承父节点的状态</p>
                </div>
            </div>
            <markdown3 slot="code"></markdown3>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Tree ref="tree" :data="data">
                        <template slot-scope="{node, root}">
                            <contextmenu :data="actions" @on-choose="doAction(node,arguments)">
                                <span > {{ node.name }} </span>
                            </contextmenu>
                        </template>
                    </Tree>
                </div>
                <div class="panel-header">
                    <span>自定义节点内容</span>
                </div>
                <div class="panel-desc">
                    <p>通过slot-scope自定义节点内容，包含两个字段：当前节点node(object)和跟节点root(object)</p>
                </div>
            </div>
            <markdown4 slot="code"></markdown4>
        </panel>

        <h2>API</h2>
        <h3>Tree props</h3>
        <section>
            <table>
                <thead>
                <tr>
                    <th style="text-align:left">属性</th>
                    <th style="text-align:left">说明</th>
                    <th style="text-align:left">类型</th>
                    <th style="text-align:left">默认值</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style="text-align:left">data</td>
                    <td style="text-align:left">可嵌套的节点属性的数组，生成 tree 的数据</td>
                    <td style="text-align:left">Array</td>
                    <td style="text-align:left">[]</td>
                </tr>
                <tr>
                    <td style="text-align:left">multiple</td>
                    <td style="text-align:left">是否支持多选</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">inline</td>
                    <td style="text-align:left">底层节点是否横向排列</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">true</td>
                </tr>
                <tr>
                    <td style="text-align:left">loadData</td>
                    <td style="text-align:left">加载数据</td>
                    <td style="text-align:left">Function</td>
                    <td style="text-align:left">Null</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>Tree events</h3>
        <section>
            <table>
                <thead>
                <tr>
                    <th style="text-align:left">事件名</th>
                    <th style="text-align:left">说明</th>
                    <th style="text-align:left">返回值</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style="text-align:left">on-select-change</td>
                    <td style="text-align:left">点击树节点时触发</td>
                    <td style="text-align:left">当前已选中的节点</td>
                </tr>
                <tr>
                    <td style="text-align:left">on-check-change</td>
                    <td style="text-align:left">点击复选框时触发</td>
                    <td style="text-align:left">当前已勾选节点的数组</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>Node props</h3>
        <section>
            <table>
                <thead>
                <tr>
                    <th style="text-align:left">属性</th>
                    <th style="text-align:left">说明</th>
                    <th style="text-align:left">类型</th>
                    <th style="text-align:left">默认值</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style="text-align:left">name</td>
                    <td style="text-align:left">节点名称</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">expand</td>
                    <td style="text-align:left">是否展开子节点</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">selected</td>
                    <td style="text-align:left">是否选中子节点</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">checked</td>
                    <td style="text-align:left">是否勾选(如果勾选，子节点也会全部勾选)</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">children</td>
                    <td style="text-align:left">子节点属性数组</td>
                    <td style="text-align:left">Array</td>
                    <td style="text-align:left">null</td>
                </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown1 from './md/tree1.md'
    import markdown2 from './md/tree2.md'
    import markdown3 from './md/tree3.md'
    import markdown4 from './md/tree4.md'
    export default {
        components: {
            markdown1, markdown2, markdown3, markdown4
        },
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
                data2: [{
                    name: 'parent',
                    children: []
                }],
                actions: [ '增加子节点', '删除节点', '复制节点']
            }
        },
        methods: {
            check: function (data) {
                console.log(data)
            },
            select: function (data) {
                console.log(data)
            },
            loadData(item, callback) {
                setTimeout(() => {
                    const data = [
                        {
                            name: 'children',
                            children: []
                        },
                        {
                            name: 'children',
                            children: []
                        }
                    ];
                    callback(data);
                }, 1000);
            },
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
