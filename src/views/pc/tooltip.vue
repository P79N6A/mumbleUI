<template>
    <div class="tooltip-panel">
        <h2>12个方向：</h2>
        <div class="swap">
            <div class="top">
                <button v-tooltip :tooltip-option="option1">上左</button>
                <button v-tooltip :tooltip-option="option2">上中</button>
                <button v-tooltip :tooltip-option="option3">上右</button>
            </div>
            <div class="center">
                <div class="center-left">
                    <button v-tooltip :tooltip-option="option4">左上</button>
                    <button v-tooltip :tooltip-option="option5">左中</button>
                    <button v-tooltip :tooltip-option="option6">左下</button>
                </div>
                <div class="center-right">
                    <button v-tooltip :tooltip-option="option7">右上</button>
                    <button v-tooltip :tooltip-option="option8">右中</button>
                    <button v-tooltip :tooltip-option="option9">右下</button>
                </div>
            </div>
            <div class="bottom">
                <button v-tooltip :tooltip-option="option10">下左</button>
                <button v-tooltip :tooltip-option="option11">下中</button>
                <button v-tooltip :tooltip-option="option12">下右</button>
            </div>
        </div>
        <h2>支持html字符串：</h2>
        <button v-tooltip :tooltip-option="option13">html字符串</button>

        <h2>支持自定义模版：</h2>
        <button v-tooltip :tooltip-option="option14">component模版</button>

        <h2>confirm：</h2>
        <button v-tooltip :tooltip-option="option15">confirm模式</button>
    </div>
</template>
<script type="text/ecmascript-6">
    import Vue from "vue"
    export default{
        data: function () {
            return {
                option1 : {
                    direction: 'top',
                    align: "left",
                    text: "上左",
                },
                option2 : {
                    direction: 'top',
                    align: "center",
                    text: "上中",
                },
                option3 : {
                    direction: 'top',
                    align: "right",
                    text: "上右",
                },
                option4 : {
                    direction: 'left',
                    align: "top",
                    text: "左上",
                },
                option5 : {
                    direction: 'left',
                    align: "center",
                    text: "左中",
                },
                option6 : {
                    direction: 'left',
                    align: "bottom",
                    text: "左下",
                },
                option7 : {
                    direction: 'right',
                    align: "top",
                    text: "右上",
                },
                option8 : {
                    direction: 'right',
                    align: "center",
                    text: "右中",
                },
                option9 : {
                    direction: 'right',
                    align: "bottom",
                    text: "右下",
                },
                option10 : {
                    direction: 'bottom',
                    align: "left",
                    text: "下左",
                },
                option11 : {
                    direction: 'bottom',
                    align: "center",
                    text: "下中",
                },
                option12 : {
                    direction: 'bottom',
                    align: "right",
                    text: "下右",
                },
                option13: {
                    direction: 'bottom',
                    align: "left",
                    html: "<em>我是带em标签的字符串</em>",
                },
                option14: {
                    direction: 'bottom',
                    align: "left",
                    component: new Vue({
                        data : function () {
                            return {
                                a: 111,
                            }
                        },
                        template: "我是组件{{a}}"
                    })
                },
                option15: {
                    text: "确认删除吗？",
                    confirm: true,
                    onOk: function () {
                        this.$Toast("点击了确定")
                    },
                    onCancel: function () {
                        this.$Toast("点击了取消")
                    }
                },
            }
        },
        methods: {
        }
    }
</script>
