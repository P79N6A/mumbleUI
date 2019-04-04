<template>
    <div class="table-page article">
        <h1>Table 表格</h1>
        <h2>概述</h2>
        <p>主要用于展示大量结构化数据。</p>
        <p>支持行排序、列过滤器、自定义列样式、自定义行样式、自定义单元样式、列操作、列内容为组件、树形数据、聚合表头、等复杂功能。</p>
    
        <h2>代码示例</h2>
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-table :data="data">
                        <Column prop="date" name="日期"></Column>
                        <Column prop="name" name="姓名"></Column>
                        <Column prop="age" name="年龄"></Column>
                        <Column prop="adr" name="地址"></Column>
                        <Column prop="status" name="等级"></Column>
                    </Wb-table>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>表格的最简单用法。name表示列名，prop对应数据对象的属性</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>
        
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-table :data="data">
                        <Column prop="date" name="日期" :filter="formatDate"></Column>
                        <Column prop="name" name="姓名"></Column>
                        <Column prop="age" name="年龄"></Column>
                        <Column prop="adr" name="地址"></Column>
                        <Column prop="status" name="状态" :filter="status"></Column>
                    </Wb-table>
                </div>
                <div class="panel-header">
                    <span>过滤器filter</span>
                </div>
                <div class="panel-desc">
                    <p>过滤器 filter 可以是 Function 或者 Array </p>
                    <p>当 filter 是 Function 时，用函数执行结果替换td显示的原始内容。</p>
                    <p>当 filter 是 Array 时，用初始值匹配数组中的value, 找出对应的text替换显示。</p>
                </div>
            </div>
            <markdown2 slot="code"></markdown2>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case table3">
                    <Wb-table :data="data">
                        <Column prop="date" name="日期" align="left" width="200px"></Column>
                        <Column prop="name" name="姓名" align="right"></Column>
                        <Column prop="age" name="年龄" classes="error" align="center"></Column>
                        <Column prop="adr" name="地址" align="center"></Column>
                        <Column prop="status" name="状态" :classes="fixWarnStyle" align="center"></Column>
                    </Wb-table>
                </div>
                <div class="panel-header">
                    <span>自定义样式</span>
                </div>
                <div class="panel-desc">
                    <p>当渲染 tbody 时，给 tr 添加上row_$index样式，当渲染 tr 时，给 td 添加上col_$index样式。自定义row_$index和col_$index则可以给对应的列和行添加样式</p>
                    <p>给Column设置 classes 属性能给 td 添加个性化样式, classes可以配置为 String 或者 Function。当是Function时，返回结果应该是一个class</p>
                    <p>给Column设置 align 属性能控制当前列文字朝向</p>
                    <p>给Column设置 width 属性能控制当前列宽度</p>
                </div>
            </div>
            <markdown3 slot="code"></markdown3>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-table :data="data">
                        <Column prop="date" name="日期"></Column>
                        <Column prop="name" name="姓名"></Column>
                        <Column prop="age" name="年龄" sort></Column>
                        <Column prop="adr" name="地址"></Column>
                        <Column prop="status" name="等级" sort></Column>
                    </Wb-table>
                </div>
                <div class="panel-header">
                    <span>排序</span>
                </div>
                <div class="panel-desc">
                    <p>给Column设置sort属性，则当前列支持排序，排序按照大小排序</p>
                </div>
            </div>
            <markdown4 slot="code"></markdown4>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-table :data="data">
                        <Column prop="date" name="日期"></Column>
                        <Column prop="name" name="姓名"></Column>
                        <Column prop="age" name="年龄"></Column>
                        <Column prop="adr" name="地址"></Column>
                        <Column name="操作" :action="action"></Column>
                    </Wb-table>
                </div>
                <div class="panel-header">
                    <span>自定义操作</span>
                </div>
                <div class="panel-desc">
                    <p>给Column设置action属性，则当前列显示功能按钮</p>
                    <p>函数的this指向当前作用域，参数为(trData, event)</p>
                </div>
            </div>
            <markdown5 slot="code"></markdown5>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-table :data="data">
                        <Column prop="date" name="日期"></Column>
                        <Column prop="name" name="姓名"></Column>
                        <Column prop="age" name="年龄"></Column>
                        <Column prop="adr" name="地址"></Column>
                        <Column name="查看图片" :component="component"></Column>
                    </Wb-table>
                </div>
                <div class="panel-header">
                    <span>自定义子组件</span>
                </div>
                <div class="panel-desc">
                    <p>给Column设置component属性，则会用子组件替换td的内容</p>
                    <p>函数的this指向当前作用域，参数为(trData, tdData, event)</p>
                </div>
            </div>
            <markdown6 slot="code"></markdown6>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-table :data="data" ref="table" @on-select="sysout"  @on-select-all="sysout">
                        <Column type="selection" :disabled="canSelectRow"></Column>
                        <Column prop="date" name="日期"></Column>
                        <Column prop="name" name="姓名"></Column>
                        <Column prop="age" name="年龄"></Column>
                        <Column prop="adr" name="地址"></Column>
                        <Column prop="status" name="等级"></Column>
                    </Wb-table>

                    <Wb-button style="margin-top:10px;" @click="getSelectedTr">获取选择的行</Wb-button>
                </div>
                <div class="panel-header">
                    <span>可选择的表格</span>
                </div>
                <div class="panel-desc">
                    <p>第一列是checkbox，实现行选中功能。组件实例的getSelected()能拿到选中的行。</p>
                    <p>设置disabled属性为函数，可以控制此行是否可以被选中</p>
                </div>
            </div>
            <markdown11 slot="code"></markdown11>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-table :data="data" border>
                        <Column name="总览">
                            <Column prop="date" name="日期"></Column>
                            <Column prop="name" name="姓名"></Column>
                            <Column prop="age" name="年龄"></Column>
                        </Column>
                        <Column prop="adr" name="地址"></Column>
                        <Column prop="status" name="等级"></Column>
                    </Wb-table>
                </div>
                <div class="panel-header">
                    <span>聚合表头</span>
                </div>
                <div class="panel-desc">
                    <p>当时聚合表头时，建议设置table为border，带边框样式</p>
                </div>
            </div>
            <markdown12 slot="code"></markdown12>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-table :data="data">
                        <Column type="expand">
                            <template slot-scope="props">
                                <Row>
                                    <Cell span="12">
                                        <span>{{ props.name }}</span>
                                    </Cell>
                                    <Cell span="12">
                                        <span>{{ props.age }}</span>
                                    </Cell>
                                </Row>
                            </template> 
                        </Column>
                        <Column prop="date" name="日期"></Column>
                        <Column prop="name" name="姓名"></Column>
                        <Column prop="age" name="年龄"></Column>
                        <Column prop="adr" name="地址"></Column>
                        <Column prop="status" name="等级"></Column>
                    </Wb-table>
                </div>
                <div class="panel-header">
                    <span>展开更多</span>
                </div>
                <div class="panel-desc">
                    <p>当页面放不下一行数据时，建议采用展开显示详情的方式</p>
                </div>
            </div>
            <markdown13 slot="code"></markdown13>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-table :data="data">
                        <Column prop="date" name="日期" :detail-component="component1"></Column>
                        <Column prop="name" name="姓名" :detail-component="component1"></Column>
                        <Column prop="age" name="年龄" :detail-component="component1"></Column>
                        <Column prop="adr" name="地址"></Column>
                        <Column prop="status" name="等级"></Column>
                    </Wb-table>
                </div>
                <div class="panel-header">
                    <span>数据详情</span>
                </div>
                <div class="panel-desc">
                    <p>针对每个数据单元格，可以展开更多</p>
                </div>
            </div>
            <markdown15 slot="code"></markdown15>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-table :data="data1" no-data-text="暂无数据">
                        <Column prop="date" name="日期"></Column>
                        <Column prop="name" name="姓名"></Column>
                        <Column prop="age" name="年龄"></Column>
                        <Column prop="adr" name="地址"></Column>
                        <Column prop="status" name="等级"></Column>
                    </Wb-table>
                </div>
                <div class="panel-header">
                    <span>无数据提示</span>
                </div>
                <div class="panel-desc">
                    <p>设置noDataText，则当表格无数据时给于提示</p>
                </div>
            </div>
            <markdown14 slot="code"></markdown14>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Tree-table :data="treeDate" @on-tr-click="trClick">
                        <Column prop="sid" name="Col-a"></Column>
                        <Column prop="scenario_name" name="Col-b"></Column>
                    </Tree-table>
                </div>
                <div class="panel-header">
                    <span>TreeTable</span>
                </div>
                <div class="panel-desc">
                    <p>TreeTable继承于Table，多了tree的特性，需要传入树状结构数据</p>
                </div>
            </div>
            <markdown7 slot="code"></markdown7>
        </panel>

        <h2>API</h2>
        
        <h3>Table props</h3>
        <markdown8></markdown8>
    
        <h3>Column props</h3>
        <markdown9></markdown9>
    
        <h3>Table events</h3>
        <markdown10></markdown10>

        <h3>Table Functions</h3>
        <p>getSelected()：获取选中的行</p>
    </div>
</template>
<script>
import markdown1 from './md/table1.md'
import markdown2 from './md/table2.md'
import markdown3 from './md/table3.md'
import markdown4 from './md/table4.md'
import markdown5 from './md/table5.md'
import markdown6 from './md/table6.md'
import markdown7 from './md/table7.md'
import markdown8 from './md/table8.md'
import markdown9 from './md/table9.md'
import markdown10 from './md/table10.md'
import markdown11 from './md/table11.md'
import markdown12 from './md/table12.md'
import markdown13 from './md/table13.md'
import markdown14 from './md/table14.md'
import markdown15 from './md/table15.md'
import Vue from 'vue'
export default {
    components: {
        markdown1, markdown2, markdown3, markdown4, markdown5, markdown6, markdown7, 
        markdown8, markdown9, markdown10, markdown11, markdown12, markdown13, markdown14,
        markdown15
    },
    data: function () {
        return {
            status: [{
                value: 1,
                text: '黄铜'
            }, {
                value: 2,
                text: '白银'
            }, {
                value: 3,
                text: '黄金'
            }, {
                value: 4,
                text: '铂金'
            }],
            data: [{
                name: '张晓刚',
                age: 24,
                date: new Date(2016, 9, 10),
                adr: '北京市海淀区西二旗',
                status: 1
            }, {
                name: '李晓红',
                age: 26,
                date: new Date(2016, 9, 11),
                adr: '北京市海淀区西二旗',
                status: 2,
                _selected: true
            }, {
                name: '隔壁老王',
                age: 22,
                date: new Date(2016, 9, 12),
                adr: '北京市海淀区西二旗',
                status: 3
            }, {
                name: '我爸是李刚',
                age: 19,
                date: new Date(2016, 9, 13),
                adr: '北京市海淀区西二旗',
                status: 4
            }],
            data1: [],
            action: [{
                text: '编辑',
                func: function (data) {
                    console.log(this)
                    console.log(data)
                }
            }, {
                text: '删除',
                func: function (data) {
                    console.log(this)
                    console.log(data)
                }
            }],
            component: function (trData, tdData) {
                return new Vue({
                    template: "<Wb-button v-zoom='zoomOption' type='primary'>点击查看图片</Wb-button>",
                    data: function () {
                        return {
                            zoomOption: {
                                src: 'images/girl.jpg',
                                minWidth: 200,
                                maxWidth: 500
                            }
                        }
                    }
                })
            },
            component1: function (trData, tdData) {
                return new Vue({
                    data: function () {
                        return {
                            trData,
                            tdData
                        }
                    },
                    template: "<Wb-button type='primary'>{{tdData}}</Wb-button>"
                })
            },
            treeDate: [{
                sid: '1',
                scenario_name: 'js',
                children: [{
                    sid: '1.1',
                    scenario_name: 'nj'
                }, {
                    sid: '1.2',
                    scenario_name: 'sz',
                    children: [{
                        sid: '1.2.1',
                        scenario_name: 'wj'
                    }, {
                        sid: '1.2.2',
                        scenario_name: 'cs'
                    }]
                }]
            }, {
                sid: '2',
                scenario_name: 'yn',
                children: [{
                    sid: '2.1',
                    scenario_name: 'wj'
                }, {
                    sid: '2.2',
                    scenario_name: 'cs'
                }]
            }, {
                sid: '3',
                scenario_name: 'fj'
            }],
            canSelectRow(trData, index) {
                return index == 0;
            }
        }
    },
    mounted: function () {
    },
    methods: {
        formatDate: function (data) {
            var year = data.getFullYear();
            var m = data.getMonth();
            var date = data.getDate();
            return year + '-' + m + '-' + date
        },
        fixWarnStyle: function (data) {
            if (data < 3) {
                return 'error'
            }
        },
        getSelectedTr: function () {
            // this.data.splice(0, 1)
            // this.data.push({
            //     name: '张晓刚2',
            //     age: 24,
            //     date: new Date(2016, 9, 10),
            //     adr: '北京市海淀区西二旗',
            //     status: 1
            // })
            // this.data = [{
            //     name: '张晓刚',
            //     age: 24,
            //     date: new Date(2016, 9, 10),
            //     adr: '北京市海淀区西二旗',
            //     status: 1
            // }, {
            //     name: '李晓红',
            //     age: 26,
            //     date: new Date(2016, 9, 11),
            //     adr: '北京市海淀区西二旗',
            //     status: 2
            // }, {
            //     name: '隔壁老王',
            //     age: 22,
            //     date: new Date(2016, 9, 12),
            //     adr: '北京市海淀区西二旗',
            //     status: 3
            // }, {
            //     name: '我爸是李刚',
            //     age: 19,
            //     date: new Date(2016, 9, 13),
            //     adr: '北京市海淀区西二旗',
            //     status: 4
            // }],
            console.log(this.$refs.table.getSelected())
        },
        sysout(){
            console.log(arguments)
        },
        trClick(data) {
            console.log(data)
        }
    }
}
</script>
<style lang="scss">
.table3 .col_1 {
    background-color: #2db7f5;
    color: #fff;
}

.table3 .row_1 {
    color: red;
}

.error {
    background-color: #f60;
    color: #fff
}
</style>
