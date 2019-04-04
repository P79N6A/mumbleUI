<template>
    <div class="checkbox-page article">
        <h1>Checkbox 多选</h1>
        <h2>概述</h2>
        <p>基本组件-多选框。基本组件-多选框。主要用于一组可选项多项选择，或者单独用于标记切换某种状态。</p>

        <h2>代码示例</h2>
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Checkbox v-model="single">checkbox</Checkbox>
                    <Checkbox label="使用label，checkbox"></Checkbox>
                    <Checkbox label="使用disabeld，checkbox" disabled></Checkbox>
                </div>
                <div class="panel-header">
                    <span>单独使用</span>
                </div>
                <div class="panel-desc">
                    <p>适合单独使用Radio的场景，此时用value判断radio是否被选中。用v-model可以实现数据的双向通讯。</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Checkbox-group v-model="value" @on-change="change">
                        <Checkbox value="1">
                            <Icon type="apple-o"></Icon>apple
                        </Checkbox>
                        <Checkbox value="2">
                            <Icon type="android"></Icon>android
                        </Checkbox>
                        <Checkbox value="3">
                            <Icon type="github"></Icon>github
                        </Checkbox>
                    </Checkbox-group>
                </div>
                <div class="panel-header">
                    <span>组合使用</span>
                </div>
                <div class="panel-desc">
                    <p>Checkbox-group可以多选。在组合使用时，Checkbox不再根据自身value的值来判断是否选中，而是根据Checkbox-group的value值和自身value值判断。</p>
                </div>
            </div>
            <markdown2 slot="code"></markdown2>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Checkbox-group v-model="value" vertical @on-change="change">
                        <Checkbox value="1">
                            <Icon type="apple-o"></Icon>apple
                        </Checkbox>
                        <Checkbox value="2">
                            <Icon type="android"></Icon>android
                        </Checkbox>
                        <Checkbox value="3">
                            <Icon type="github"></Icon>github
                        </Checkbox>
                    </Checkbox-group>
                </div>
                <div class="panel-header">
                    <span>垂直方向</span>
                </div>
                <div class="panel-desc">
                    <p>设置vertical 能让选项垂直排列</p>
                </div>
            </div>
            <markdown3 slot="code"></markdown3>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Checkbox-group readonly>
                        <Checkbox value="1">
                            <Icon type="apple-o"></Icon>apple
                        </Checkbox>
                        <Checkbox value="2">
                            <Icon type="android"></Icon>android
                        </Checkbox>
                        <Checkbox value="3">
                            <Icon type="github"></Icon>github
                        </Checkbox>
                    </Checkbox-group>
                    <Checkbox-group disabled>
                        <Checkbox value="1">
                            <Icon type="apple-o"></Icon>apple
                        </Checkbox>
                        <Checkbox value="2">
                            <Icon type="android"></Icon>android
                        </Checkbox>
                        <Checkbox value="3">
                            <Icon type="github"></Icon>github
                        </Checkbox>
                    </Checkbox-group>
                </div>
                <div class="panel-header">
                    <span>只读和禁用</span>
                </div>
                <div class="panel-desc">
                    <p>设置readonly 只读</p>
                    <p>设置disabled 禁用</p>
                </div>
            </div>
            <markdown4 slot="code"></markdown4>
        </panel>

        <h2>API</h2>
        <h3>CheckboxGroup props</h3>
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
                    <td style="text-align:left">Array</td>
                    <td style="text-align:left">[]</td>
                </tr>
                <tr>
                    <td style="text-align:left">vertical</td>
                    <td style="text-align:left">选项排列方向</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
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

        <h3>CheckboxGroup events</h3>
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

        <h3>Checkbox props</h3>
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
    import markdown1 from './md/checkbox1.md'
    import markdown2 from './md/checkbox2.md'
    import markdown3 from './md/checkbox3.md'
    import markdown4 from './md/checkbox4.md'
    export default {
        components: {
            markdown1, markdown2, markdown3, markdown4
        },
        data: function () {
            return {
                single: false,
                value: ['3']
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
