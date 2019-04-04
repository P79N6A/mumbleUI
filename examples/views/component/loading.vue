<template>
    <div class="loading-page article">
        <h1>Loading 加载中</h1>
        <h2>概述</h2>
        <p>加载中动画，支持子定义颜色，大小和border宽度。</p>

        <h2>代码示例</h2>
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Loading v-show="show"></Loading>
                    <Wb-button @click="show=!show">隐藏/显示</Wb-button>
                </div>
                <div class="panel-header">
                    <span>基本用法</span>
                </div>
                <div class="panel-desc">
                    <p>show控制加载中动画的显示跟隐藏。</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-button>
                        <Loading color="#657180" size="18px" border-width="1px"></Loading>
                        提交中...
                    </Wb-button>
                </div>
                <div class="panel-header">
                    <span>自定义配置</span>
                </div>
                <div class="panel-desc">
                    <p>可以把Loading组件放入其他组件中。</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>

        <h2>API</h2>
        <h3>Loading props</h3>
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
                    <td style="text-align:left">color</td>
                    <td style="text-align:left">加载中动画的颜色</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">#2db7f5</td>
                </tr>
                <tr>
                    <td style="text-align:left">size</td>
                    <td style="text-align:left">动画中圆圈的直径</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">32px</td>
                </tr>
                <tr>
                    <td style="text-align:left">borderWidth</td>
                    <td style="text-align:left">动画中圆圈的borderWidth</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">2px</td>
                </tr>
                </tbody>
            </table>
        </section>

    </div>
</template>
<script type="text/ecmascript-6">
    import markdown1 from './md/loading1.md'
    import markdown2 from './md/loading2.md'
    export default{
        components: {
            markdown1, markdown2
        },
        data: function () {
            return {
                show: true
            }
        },
        methods: {
        }
    }
</script>
