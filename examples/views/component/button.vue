<template>
    <div class="button-page article">
        <h1>Button 按钮</h1>
        <h2>概述</h2>
        <p>基础组件，触发业务逻辑时使用</p>

        <h2>代码示例</h2>
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-button @click="console">Default</Wb-button>
                    <Wb-button type="ghost">Ghost</Wb-button>
                    <Wb-button type="text">Text</Wb-button>
                    <Wb-button type="primary">Primary</Wb-button>
                    <Wb-button type="info">Info</Wb-button>
                    <Wb-button type="success">Success</Wb-button>
                    <Wb-button type="warn">Warn</Wb-button>
                    <Wb-button type="error">Error</Wb-button>
                </div>
                <div class="panel-header">
                    <span>按钮类型</span>
                </div>
                <div class="panel-desc">
                    <p>按钮类型有：默认按钮、主按钮、幽灵按钮、文字按钮以及四种颜色按钮。</p>
                    <p>通过设置type为primary、ghost、text、info、success、warn、error创建不同样式的按钮，不设置为默认样式。</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-button @click="console" disabled>Default</Wb-button>
                    <Wb-button type="ghost" disabled>Ghost</Wb-button>
                    <Wb-button type="text" disabled>Text</Wb-button>
                    <Wb-button type="primary" disabled>Primary</Wb-button>
                    <Wb-button type="info" disabled>Info</Wb-button>
                    <Wb-button type="success" disabled>Success</Wb-button>
                    <Wb-button type="warn" disabled>Warn</Wb-button>
                    <Wb-button type="error" disabled>Error</Wb-button>
                </div>
                <div class="panel-header">
                    <span>disabled</span>
                </div>
                <div class="panel-desc">
                    <p>禁止点击</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-button icon="search" circle></Wb-button>
                    <Wb-button icon="search" circle>查询</Wb-button>
                    <Wb-button icon="search">查询</Wb-button>
                </div>
                <div class="panel-header">
                    <span>图标按钮及按钮形状</span>
                </div>
                <div class="panel-desc">
                    <p>通过设置icon属性在Button内部嵌入一个Icon, 显示在Button内部的左边</p>
                    <p>通过设置circle属性，可以将Button显示为圆角</p>
                </div>
            </div>
            <markdown2 slot="code"></markdown2>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-button type="success" long>确认提交</Wb-button>
                    <Wb-button type="error" long>确认删除</Wb-button>
                </div>
                <div class="panel-header">
                    <span>长按钮</span>
                </div>
                <div class="panel-desc">
                    <p>通过设置long属性，可以将按钮设置为100%宽度</p>
                </div>
            </div>
            <markdown3 slot="code"></markdown3>
        </panel>

        <h2>API</h2>
        <h3>Button props</h3>
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
                    <td style="text-align:left">type</td>
                    <td style="text-align:left">按钮的类型，可选值是primary、ghost、text、info、success、warn、error或者无</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">long</td>
                    <td style="text-align:left">控制按钮是否显示为100%宽度</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">circle</td>
                    <td style="text-align:left">控制按钮显示为圆的</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">icon</td>
                    <td style="text-align:left">控制按钮内部左侧显示的小图标</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">null</td>
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
                    <td style="text-align:left">click</td>
                    <td style="text-align:left">单击按钮触发</td>
                    <td style="text-align:left">event</td>
                </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown1 from './md/button1.md'
    import markdown2 from './md/button2.md'
    import markdown3 from './md/button3.md'
    import markdown4 from './md/button4.md'
    export default {
        components: {
            markdown1,markdown2,markdown3, markdown4
        },
        data: function () {
            return {
            }
        },
        ready: function () {
        },
        methods: {
            console(){
                console.log(1)
            }
        }
    }
</script>
