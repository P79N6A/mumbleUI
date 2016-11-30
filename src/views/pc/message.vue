<template>
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
</template>
<script type="text/ecmascript-6">
    import message from "../../components/pc/src/components/message/message.js";
    export default {
        ready: function () {
        },
        methods: {
            click1: function () {
                message("我是提示").then(function (index) {
                    console.log(index)
                })
            },
            click2: function () {
                message.alert("我是提示").then(function (index) {
                    console.log(index)
                })
            },
            click3: function () {
                message.confirm("我是提示").then(function (index) {
                    console.log(index)
                })
            },
            click4: function () {
                message("标题", "我是提示").then(function (index) {
                    console.log(index)
                })
            },
            click5: function () {
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
                }).then(function (index) {
                    console.log(index)
                })
            }
        }
    }
</script>
