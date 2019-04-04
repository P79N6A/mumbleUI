<template>
    <div class="button-page article">
        <h1>Pagination 分页</h1>
        <h2>概述</h2>
        <p>基础组件，一般配合table组件使用</p>

        <h2>代码示例</h2>
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Pagination @on-change="changePage" :locking="pagination.locking" :current="pagination.current" :size="pagination.size" :total="pagination.total"></Pagination>
                </div>
                <div class="panel-header">
                    <span>基本用法</span>
                </div>
                <div class="panel-desc">
                    <p>很简单，只管理分页信息</p>
                </div>
            </div>
            <markdown slot="code"></markdown>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Pagination :size-list="sizeList" :current="pagination.current" :size="pagination.size" :total="pagination.total"></Pagination>
                </div>
                <div class="panel-header">
                    <span>自定义每页条数的可选范围</span>
                </div>
                <div class="panel-desc">
                    <p>配置sizeList属性即可，默认为[8, 16, 32, 50, 100]</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>


        <h2>API</h2>
        <h3>Pagination props</h3>
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
                    <td style="text-align:left">current</td>
                    <td style="text-align:left">当前第几页</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">1</td>
                </tr>
                <tr>
                    <td style="text-align:left">size</td>
                    <td style="text-align:left">每一页的条数</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">8</td>
                </tr>
                <tr>
                    <td style="text-align:left">total</td>
                    <td style="text-align:left">总页数</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">0</td>
                </tr>
                <tr>
                    <td style="text-align:left">sizeList</td>
                    <td style="text-align:left">每页条数的可选列表</td>
                    <td style="text-align:left">Array</td>
                    <td style="text-align:left">[8, 16, 32, 50, 100]</td>
                </tr>
                <tr>
                    <td style="text-align:left">locking</td>
                    <td style="text-align:left">是否锁定, 当锁定时，上一页下一个等操作被禁止</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>Button events</h3>
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
                    <td style="text-align:left">on-change</td>
                    <td style="text-align:left">上一页、下一页、回到首页、回到最后一页触发</td>
                    <td style="text-align:left">{ current, size }</td>
                </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown from './md/pagination.md'
    import markdown1 from './md/pagination1.md'
    export default {
        components: {
            markdown, markdown1
        },
        data: function () {
            return {
                pagination: {
                    locking: false,
                    size: 10,
                    current: 1,
                    total: 100
                },
                sizeList: [10, 20, 30]
            }
        },
        methods: {
            changePage({ current, size}){
                console.log(arguments)
            }
        }
    }
</script>
