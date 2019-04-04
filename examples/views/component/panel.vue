<template>
    <div class="button-page article">
        <h1>Panel 面板</h1>
        <h2>概述</h2>
        <p>视图组件，面板来用包裹一段内容</p>

        <h2>代码示例</h2>
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Panel title="我是标题">
                        <Icon type="rollback" slot="action"></Icon>
                        <Wb-form label-position="left" :label-width="100">
                            <Form-item label="输入框">
                                <wb-input placeholder="请输入"></wb-input>
                            </Form-item>
                            <Form-item label="密码输入框">
                                <wb-input placeholder="请输入" type="password"></wb-input>
                            </Form-item>
                            <Form-item label="数字输入框">
                                <wb-input placeholder="请输入" type="number"></wb-input>
                            </Form-item>
                            <Form-item label="数字输入框">
                                <wb-input placeholder="请输入" type="number"></wb-input>
                            </Form-item>
                        </Wb-form>
                    </Panel>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>基础用法</p>
                </div>
            </div>
            <markdown slot="code"></markdown>
        </panel>

        <h2>API</h2>
        <h3>Panel props</h3>
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
                    <td style="text-align:left">title</td>
                    <td style="text-align:left">标题</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">null</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>Panel slot</h3>
        <section>
            <table>
                <thead>
                <tr>
                    <th style="text-align:left">名称</th>
                    <th style="text-align:left">说明</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style="text-align:left">action</td>
                    <td style="text-align:left">配置panel的操作按钮</td>
                </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown from './md/panel.md'
    export default {
        components: {
            markdown
        },
        data: function () {
            return {
            }
        },
        methods: {
        }
    }
</script>
