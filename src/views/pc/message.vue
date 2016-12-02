<template>
    <div class="message-panel">
        <p>
            <button @click="click1">message("我是提示")</button>
        </p>
        <p>
            <button @click="click4">message("标题", "我是提示")</button>
        </p>
        <p>
            <button @click="click5">可配置的message：</button>
        <pre>
            <code class="javascript">
                message({
                    title: '标题',              //可以传入文本和domString
                        template: '我是模版',        //可以传入文本和domString
                        buttons: [{                 //最多有两个, 第一条配置第一个button
                            text: '确定',
                            show: true,
                            class: "xx"
                        },{                         //配置第二个button
                            text: "取消",
                            show: true,
                            class: "yy"
                    }]
                });
            </code>
        </pre>
        </p>
        <p>
            <button @click="click2">message.alert("我是提示");</button>
        </p>
        <p>
            <button @click="click3">message.confirm("我是提示");</button>
        </p>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        ready: function () {
        },
        methods: {
            click1: function () {
                this.$Message("我是提示").then(function (index) {
                    console.log(index)
                })
            },
            click2: function () {
                this.$Message.alert("我是提示").then(function (index) {
                    console.log(index)
                })
            },
            click3: function () {
                this.$Message.confirm("我是提示").then(function (index) {
                    console.log(index)
                })
            },
            click4: function () {
                this.$Message("标题", "我是提示").then(function (index) {
                    console.log(index)
                })
            },
            click5: function () {
                this.$Message({
                    title: '标题',              //可以传入文本和domString
                    template: '我是模版',        //可以传入文本和domString
                    buttons: [{                 //最多有两个, 第一条配置第一个button
                        text: '确定',
                        show: true,
                        class: "xx"
                    },{                         //配置第二个button
                        text: "取消",
                        show: true,
                        class: "yy"
                    }]
                }).then(function (index) {
                    console.log(index)
                })
            }
        }
    }
</script>
