<template>
    <div class="radio-page article">
        <h1>Radio 单选</h1>
        <h2>概述</h2>
        <p>基本组件-单选框。主要用于一组可选项单项选择，或者单独用于切换到选中状态。</p>

        <h2>代码示例</h2>
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Radio v-model="checked">
                        是否同意xxxx
                    </Radio> 
                    <Radio label="使用label">
                    </Radio>
                    <Radio label="使用disabeld" disabled>
                    </Radio>
                </div>
                <div class="panel-header">
                    <span>单独使用Radio</span>
                </div>
                <div class="panel-desc">
                    <p>适合单独使用Radio的场景，用value控制radio是否被选中。用v-model实现数据的双向通讯。</p>
                </div>
            </div>
            <markdown4 slot="code"></markdown4>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Radio-group v-model="value1" @on-change="change">
                        <Radio value="1">
                            apple
                        </Radio>
                        <Radio value="2">
                            android
                        </Radio>
                        <Radio value="3">
                            github
                        </Radio>
                    </Radio-group>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>使用Radio-group实现一组互斥的选项组。在组合使用时，Radio不再只根据value的值来判断是否选中，而是根据Radio-group的value值和自身value值判断。</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Radio-group v-model="value2" @on-change="change" vertical>
                        <Radio value="1">
                            <Icon type="apple-o"></Icon>apple
                        </Radio>
                        <Radio value="2">
                            <Icon type="android"></Icon>android
                        </Radio>
                        <Radio value="3">
                            <Icon type="github"></Icon>github
                        </Radio>
                    </Radio-group>
                </div>
                <div class="panel-header">
                    <span>垂直方向</span>
                </div>
                <div class="panel-desc">
                    <p>设置属性 vertical ，选项垂直排列</p>
                </div>
            </div>
            <markdown2 slot="code"></markdown2>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Radio-group v-model="value3" @on-change="change" type="button">
                        <Radio value="1">
                            北京
                        </Radio>
                        <Radio value="2">
                            上海
                        </Radio>
                        <Radio value="3">
                            深圳
                        </Radio>
                    </Radio-group>
                </div>
                <div class="panel-header">
                    <span>按钮</span>
                </div>
                <div class="panel-desc">
                    <p>设置属性 type=button ，radio显示为按钮的样子</p>
                </div>
            </div>
            <markdown3 slot="code"></markdown3>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Radio-group readonly>
                        <Radio value="1">
                            北京
                        </Radio>
                        <Radio value="2">
                            上海
                        </Radio>
                        <Radio value="3">
                            深圳
                        </Radio>
                    </Radio-group>
                    <Radio-group disabled>
                        <Radio value="1">
                            北京
                        </Radio>
                        <Radio value="2">
                            上海
                        </Radio>
                        <Radio value="3">
                            深圳
                        </Radio>
                    </Radio-group>
                </div>
                <div class="panel-header">
                    <span>只读和禁用状态</span>
                </div>
                <div class="panel-desc">
                    <p>设置属性readonly, 只读状态</p>
                    <p>设置属性disabled, 禁用状态</p>
                </div>
            </div>
            <markdown5 slot="code"></markdown5>
        </panel>

        <h2>API</h2>
        <h3>RadioGroup props</h3>
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
                    <td style="text-align:left">value</td>
                    <td style="text-align:left">选择的值，可以使用v-model实现数据的双向通讯</td>
                    <td style="text-align:left">Number, String, Boolean</td>
                    <td style="text-align:left">""</td>
                </tr>
                <tr>
                    <td style="text-align:left">vertical</td>
                    <td style="text-align:left">选项排列方向</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">type</td>
                    <td style="text-align:left">单选按钮组类型，可选值只有button</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">""</td>
                </tr>
                <tr>
                    <td style="text-align:left">readonly</td>
                    <td style="text-align:left">只读</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">disabled</td>
                    <td style="text-align:left">禁用</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>Input events</h3>
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
                    <td style="text-align:left">值改变时触发</td>
                    <td style="text-align:left">event</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>Radio props</h3>
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
                    <td style="text-align:left">value</td>
                    <td style="text-align:left">选项的值。当选项单独使用时，如果value为true则表示选项为选中状态，反之为false表示未选中状态</td>
                    <td style="text-align:left">String, Number, Boolean</td>
                    <td style="text-align:left">""</td>
                </tr>
                <tr>
                    <td style="text-align:left">label</td>
                    <td style="text-align:left">选项的注释</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">disabled</td>
                    <td style="text-align:left">是否禁用</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown1 from './md/radio1.md'
    import markdown2 from './md/radio2.md'
    import markdown3 from './md/radio3.md'
    import markdown4 from './md/radio4.md'
    import markdown5 from './md/radio5.md'
    export default {
        components: {
            markdown1, markdown2, markdown3, markdown4, markdown5
        },
        data: function () {
            return {
                checked: false,
                value1: '1',
                value2: '1',
                value3: '1'
            }
        },
        ready: function () {
        },
        methods: {
            change(val) {
                console.log(val)
            }
        }
    }
</script>
