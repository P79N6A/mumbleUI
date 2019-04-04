<template>
    <div class="switch-page article">
        <h1>Switch 开关</h1>
        <h2>概述</h2>
        <p>开关状态选择器。</p>

        <h2>代码示例</h2>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-switch v-model="switch1" @on-change="change"></Wb-switch>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>需要将在组件中绑定v-model，获取model值变化需要绑定on-change方法。</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown1></markdown1>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-switch v-model="switch2">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </Wb-switch>
                    <Wb-switch v-model="switch2">
                        <Icon slot="open" type="check"></Icon>
                        <Icon slot="close" type="close"></Icon>
                    </Wb-switch>
                    <Wb-switch v-model="switch2">
                        <span slot="open">开开开开开</span>
                        <span slot="close">关</span>
                    </Wb-switch>
                </div>
                <div class="panel-header">
                    <span>文字和图标</span>
                </div>
                <div class="panel-desc">
                    <p>自定义内容，slot为open的文字或者图标在on为true时显示，反之依然</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2></markdown2>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-switch v-model="switch3" :confirm="confirm"></Wb-switch>
                </div>
                <div class="panel-header">
                    <span>切换前询问</span>
                </div>
                <div class="panel-desc">
                    <p>点击切换时，弹出confirm询问，点击确定之后才发生切换。</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown3></markdown3>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-switch readonly></Wb-switch>
                    <Wb-switch disabled></Wb-switch>
                </div>
                <div class="panel-header">
                    <span>禁用</span>
                </div>
                <div class="panel-desc">
                    <p>设置readonly为只读，设置disabled为禁用</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown4></markdown4>
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Switch props</h3>
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
                        <td style="text-align:left">v-model</td>
                        <td style="text-align:left">开关的状态，必须设置</td>
                        <td style="text-align:left">Boolean</td>
                        <td style="text-align:left">false</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">on-change</td>
                        <td style="text-align:left">监听model值改变的方法</td>
                        <td style="text-align:left">Function</td>
                        <td style="text-align:left"></td>
                    </tr>
                </tbody>
            </table>
        </section>


    </div>

</template>
<script>
    import markdown1 from './md/switch1.md'
    import markdown2 from './md/switch2.md'
    import markdown3 from './md/switch3.md'
    import markdown4 from './md/switch4.md'
    export default{
        components: {
            markdown1, markdown2, markdown3, markdown4
        },
        data() {
            return {
                switch1: false,
                switch2: false,
                switch3: false
            }
        },
        methods: {
            confirm() {
                return new Promise((resolve, reject)=>{
                    this.$Message({
                        title: '标题', // 可以传入文本和domString
                        template: '是否啊啊啊啊啊？', // 可以传入文本和domString
                        buttons: [{ // 最多有两个, 第一条配置第一个button
                            text: '确定',
                            class: 'xx'
                        }, { // 配置第二个button
                            text: '放弃',
                            class: 'yy'
                        }]
                    }).then(function (index) {
                        console.log(index)
                        if (index == 0) {
                            resolve()
                        }
                    })
                })
            },
            change(status) {
                this.$Toast('开关状态：' + status);
            }
        }
    }
</script>
