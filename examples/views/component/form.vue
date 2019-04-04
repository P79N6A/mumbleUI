<template>
    <div class="form-page article">
        <h1>Form 表单</h1>
        <h2>概述</h2>
        <p>具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。</p>

        <h2>代码示例</h2>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-form>
                        <Form-item label="输入框">
                            <wb-input placeholder="请输入"></wb-input>
                        </Form-item>
                        <Form-item label="密码输入框">
                            <wb-input placeholder="请输入" type="password"></wb-input>
                        </Form-item>
                        <Form-item label="数字输入框">
                            <wb-input placeholder="请输入" type="number"></wb-input>
                        </Form-item>
                        <Form-item label="下拉框">
                            <wb-select>
                                <wb-option :value="1">北京市</wb-option>
                                <wb-option :value="2">上海市</wb-option>
                                <wb-option :value="3">深圳市</wb-option>
                                <wb-option :value="4">杭州市</wb-option>
                                <wb-option :value="5">南京市</wb-option>
                                <wb-option :value="6">重庆市</wb-option>
                            </wb-select>
                        </Form-item>
                        <Form-item label="单选框">
                            <Radio-group>
                                <Radio value="1">
                                    男
                                </Radio>
                                <Radio value="2">
                                    女
                                </Radio>
                            </Radio-group>
                        </Form-item>
                        <Form-item label="多选框">
                            <Checkbox-group>
                                <Checkbox value="1">
                                    吃饭
                                </Checkbox>
                                <Checkbox value="2">
                                    睡觉
                                </Checkbox>
                                <Checkbox value="3">
                                    跑步
                                </Checkbox>
                            </Checkbox-group>
                        </Form-item>
                        <Form-item label="开关">
                            <Wb-switch>
                                <span slot="close">关</span>
                                <span slot="open">开</span>
                            </Wb-switch>
                        </Form-item>
                        <Form-item label="文本域">
                            <wb-input type="textarea" placeholder="请输入"></wb-input>
                        </Form-item>
                        <Form-item>
                            <Wb-button type="primary">提交</Wb-button>
                            <Wb-button type="ghost" style="margin-left: 8px">取消</Wb-button>
                        </Form-item>
                    </Wb-form>
                </div>
                <div class="panel-header">
                    <span>表单控件</span>
                </div>
                <div class="panel-desc">
                    <p>在 Wb-form 内，每个表单域由 Form-item 组成，可包含的控件有：Input、Radio、Checkbox、Switch、Select、InputDatePicker。</p>
                    <p>给 Form-item 设置属性 label 可以显示表单域的标签</p>
                </div>
            </div>
            <markdown1 slot="code"></markdown1>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-form type="query">
                        <Row>
                            <Cell span="12">
                                <Form-item label="姓名">
                                    <wb-input placeholder="请输入"></wb-input>
                                </Form-item>
                            </Cell>
                            <Cell span="12">
                                <Form-item label="身份证">
                                    <wb-input placeholder="请输入"></wb-input>
                                </Form-item>
                            </Cell>
                        </Row>
                        <Row>
                            <Cell span="12">
                                <Form-item label="下拉框">
                                    <wb-select>
                                        <wb-option :value="1">北京市</wb-option>
                                        <wb-option :value="2">上海市</wb-option>
                                        <wb-option :value="3">深圳市</wb-option>
                                        <wb-option :value="4">杭州市</wb-option>
                                        <wb-option :value="5">南京市</wb-option>
                                        <wb-option :value="6">重庆市</wb-option>
                                    </wb-select>
                                </Form-item>
                            </Cell>
                            <Cell span="12">
                                <Form-item label="下拉框">
                                    <wb-select>
                                        <wb-option :value="1">北京市</wb-option>
                                        <wb-option :value="2">上海市</wb-option>
                                        <wb-option :value="3">深圳市</wb-option>
                                        <wb-option :value="4">杭州市</wb-option>
                                        <wb-option :value="5">南京市</wb-option>
                                        <wb-option :value="6">重庆市</wb-option>
                                    </wb-select>
                                </Form-item>
                            </Cell>
                        </Row>
                    </Wb-form>
                </div>
                <div class="panel-header">
                    <span>查询表单</span>
                </div>
                <div class="panel-desc">
                    <p>query模式下FromItem上下间隔会缩小，而且不提示校验错误信息，需要自行处理</p>
                </div>
            </div>
            <markdown2 slot="code"></markdown2>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-form label-position="left" :label-width="100">
                        <Form-item label="输入框" label-position="right">
                            <wb-input placeholder="请输入"></wb-input>
                        </Form-item>
                        <Form-item label="输入框" :label-width="150">
                            <wb-input placeholder="请输入"></wb-input>
                        </Form-item>
                        <Form-item label="输入框">
                            <wb-input placeholder="请输入"></wb-input>
                        </Form-item>
                    </Wb-form>
                    <Wb-form label-position="right" :label-width="100">
                        <Form-item label="输入框">
                            <wb-input placeholder="请输入"></wb-input>
                        </Form-item>
                    </Wb-form>
                    <Wb-form label-position="top">
                        <Form-item label="输入框">
                            <wb-input placeholder="请输入"></wb-input>
                        </Form-item>
                    </Wb-form>
                </div>
                <div class="panel-header">
                    <span>对齐方式 </span>
                </div>
                <div class="panel-desc">
                    <p>设置属性 label-position，可以改变表单域标签的位置，left 为左对齐，right 为右对齐，top 会置于表单域顶部。Wb-form和Form-item都可以设置label-position。</p>
                    <p>设置属性 label-width，可以控制表单项描述的宽度，默认80。Wb-form和Form-item都可以设置label-width。</p>
                </div>
            </div>
            <markdown3 slot="code"></markdown3>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-form :rule="ruleValidate" ref="formValidate" :label-width="100">
                        <Form-item label="输入框" prop="text" :rule="[{required: radio=='1', message: '不能为空'}]">
                            <wb-input v-model="text" placeholder="请输入"></wb-input>
                        </Form-item>
                        <Form-item label="下拉框" prop="select">
                            <wb-select v-model="select">
                                <wb-option :value="1">北京市</wb-option>
                                <wb-option :value="2">上海市</wb-option>
                                <wb-option :value="3">深圳市</wb-option>
                                <wb-option :value="4">杭州市</wb-option>
                                <wb-option :value="5">南京市</wb-option>
                                <wb-option :value="6">重庆市</wb-option>
                            </wb-select>
                        </Form-item>
                        <Form-item label="输入框必填" prop="radio">
                            <Radio-group v-model="radio">
                                <Radio value="1">
                                    是
                                </Radio>
                                <Radio value="2">
                                    否
                                </Radio>
                            </Radio-group>
                        </Form-item>
                        <Form-item label="多选框" prop="checkbox">
                            <Checkbox-group v-model="checkbox">
                                <Checkbox value="1">
                                    吃饭
                                </Checkbox>
                                <Checkbox value="2">
                                    睡觉
                                </Checkbox>
                                <Checkbox value="3">
                                    跑步
                                </Checkbox>
                            </Checkbox-group>
                        </Form-item>
                        <Form-item label="开关">
                            <wb-switch v-model="on">
                                <span slot="close">关</span>
                                <span slot="open">开</span>
                            </wb-switch>
                        </Form-item>
                        <Form-item label="文本域" prop="textarea">
                            <wb-input v-model="textarea" type="textarea" :autosize="true" placeholder="请输入"></wb-input>
                        </Form-item>
                        <Form-item>
                            <Wb-button type="primary" @click="click">提交</Wb-button>
                            <Wb-button type="ghost" style="margin-left: 8px" @click="reset">重置</Wb-button>
                        </Form-item>
                    </Wb-form>
                </div>
                <div class="panel-header">
                    <span>表单校验</span>
                </div>
                <div class="panel-desc">
                    <p>Form 组件基于  async-validator 实现的数据验证，给 Form 设置属性 rule，同时给需要验证的 Form-item 设置属性 prop 指向对于字段即可。</p>
                    <p>FormItem 也可以设置校验的rule。如果From的rule中也配置了rule，则规则会合并。</p>
                    <p>校验规则可以是响应式的对象</p>
                    <p>除了async-validator中定义的type之外，我们还定义了：</p>
                    <ul>
                        <li>mobile: 手机号</li>
                        <li>cname: 中文名</li>
                        <li>password: 密码，必须包含大写、小写字符和数字，8-16位</li>
                        <li>money: 金额，可以配置小数点后的位数（afterPoint）</li>
                        <li>equal: 与什么（enqualTo）相等</li>
                        <li>min: 不小于（minTo）</li>
                        <li>max: 不大于（maxTo）</li>
                    </ul>
                </div>
            </div>
            <markdown4 slot="code"></markdown4>
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-form ref="formValidate1" :label-width="100">
                        <Form-item label="输入框" v-for="(item, index) in textList" :key="index" :prop="item.text"
                                   :rule="[{required: true, message: '项目' + (item.text) +'不能为空'}]">
                            <wb-input v-model="item.value" placeholder="请输入"></wb-input>
                        </Form-item>
                        <Form-item>
                            <Wb-button type="primary" @click="click1">提交</Wb-button>
                            <Wb-button type="ghost" style="margin-left: 8px" @click="reset1">重置</Wb-button>
                            <Wb-button type="primary" style="margin-left: 8px" @click="add">增加</Wb-button>
                            <Wb-button type="primary" style="margin-left: 8px" @click="remove">减少</Wb-button>
                        </Form-item>
                    </Wb-form>
                </div>
                <div class="panel-header">
                    <span>动态增减表单项</span>
                </div>
                <div class="panel-desc">
                    <p>当需要动态维护 Form-item 时，也可以直接给 Form-item 设置属性 rule 来单独为该域做验证。</p>
                </div>
            </div>
            <markdown5 slot="code"></markdown5>
        </panel>

        <h2>API</h2>
        <h3>Form props</h3>
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
                    <td style="text-align:left">表单类型，可选值有normal和query</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">normal</td>
                </tr>
                <tr>
                    <td style="text-align:left">rule</td>
                    <td style="text-align:left">表单验证规则，具体配置查看 <a href="https://github.com/yiminghe/async-validator">async-validator</a></td>
                    <td style="text-align:left">Array</td>
                    <td style="text-align:left">[]</td>
                </tr>
                <tr>
                    <td style="text-align:left">labelPosition</td>
                    <td style="text-align:left">表单域标签的位置，可选值为 left、right、top</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">right</td>
                </tr>
                <tr>
                    <td style="text-align:left">labelWidth</td>
                    <td style="text-align:left">表单域标签的宽度，默认继承 Form 组件配置的 label-width ，可以单独配置</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">80</td>
                </tr>
                <tr>
                    <td style="text-align:left">showMessage</td>
                    <td style="text-align:left">是否显示校验信息</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">true</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>Form methods</h3>
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
                    <td style="text-align:left">validate(callback)</td>
                    <td style="text-align:left">校验整个表单</td>
                </tr>
                <tr>
                    <td style="text-align:left">validateField(field, callback)</td>
                    <td style="text-align:left">对部分表单字段进行校验的方法，field为需校验的 prop，callback为检验完回调</td>
                </tr>
                <tr>
                    <td style="text-align:left">resetFields([field], callback)</td>
                    <td style="text-align:left">重置校验结果, 如果传了filed则只重置这个，如果没有则重置所有</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>FormItem  props</h3>
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
                    <td style="text-align:left">prop</td>
                    <td style="text-align:left">定义了prop才会被校验</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">label</td>
                    <td style="text-align:left">FormItem项标签名称</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">rule</td>
                    <td style="text-align:left">表单验证规则，会跟Form的规则合并</td>
                    <td style="text-align:left">Array</td>
                    <td style="text-align:left">[]</td>
                </tr>
                <tr>
                    <td style="text-align:left">labelWidth</td>
                    <td style="text-align:left">标签的宽度，权重大于Form的labelWidth</td>
                    <td style="text-align:left">Number</td>
                    <td style="text-align:left">null</td>
                </tr>
                <tr>
                    <td style="text-align:left">labelPosition</td>
                    <td style="text-align:left">表单域标签的位置，可选值为 left、right、top， 权重大于Form的labelPosition</td>
                    <td style="text-align:left">String</td>
                    <td style="text-align:left">right</td>
                </tr>
                <tr>
                    <td style="text-align:left">showMessage</td>
                    <td style="text-align:left">是否显示校验错误信息，只有Item的showMessage和Form的showMessage都为true才显示</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">true</td>
                </tr>
                </tbody>
            </table>
        </section>

    </div>
</template>
<script>
    import markdown1 from './md/form1.md'
    import markdown2 from './md/form2.md'
    import markdown3 from './md/form3.md'
    import markdown4 from './md/form4.md'
    import markdown5 from './md/form5.md'
import { error } from 'util';
    export default {
        components: {
            markdown1, markdown2, markdown3, markdown4, markdown5
        },
        data: function () {
            return {
                text: '',
                select: '',
                radio: '',
                checkbox: [],
                on: true,
                textarea: '',
                ruleValidate: {
                    text: [
                    ],
                    select: [
                        { required: true, message: '不能为空' }
                    ],
                    radio: [
                        { required: true, message: '不能为空' }
                    ],
                    checkbox: [
                        { required: true, message: '不能为空', type: 'array', min: 1 }
                    ],
                    textarea: [
                        { required: true, message: '不能为空' }
                    ]
                },
                textList: [{
                    text: 'text0',
                    value: ''
                }]
            }
        },
        methods: {
            add() {
                this.textList.push({
                    text: 'text' + this.textList.length,
                    value: ''
                })
            },
            remove() {
                this.textList.splice(this.textList.length - 1, 1)
            },
            click() {
                this.$refs.formValidate.validate((valid, errors) => {
                    console.log(valid, errors)
                })
            },
            reset() {
                this.$refs.formValidate.resetFields()
            },
            click1() {
                this.$refs.formValidate1.validate((valid, errors) => {
                    console.log(valid, errors)
                })
            },
            reset1() {
                this.$refs.formValidate1.resetFields()
            }
        }
    }
</script>
