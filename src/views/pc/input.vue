<template>
    <div class="home-panel">
        <h2>input，type是text：</h2>
        <wb-input :value.sync="text" placeholder="我是文本哦" :disabled="disabled" :readonly="readonly"></wb-input>

        <h2>input，type是password：</h2>
        <wb-input :value.sync="text" placeholder="我是密码" :disabled="disabled" :readonly="readonly" type="password"></wb-input>

        <h2>input，type是password：</h2>
        <wb-input :value.sync="111" placeholder="我是数字" :disabled="disabled" :readonly="readonly" type="number"></wb-input>

        <h2>textarea：</h2>
        <wb-input :value.sync="text" placeholder="我是文本哦" :disabled="disabled" :readonly="readonly" type="textarea"></wb-input>

        <h2>textarea，设置rows：</h2>
        <wb-input :rows="4" :value.sync="text" placeholder="我是文本哦" :disabled="disabled" :readonly="readonly" type="textarea"></wb-input>

        <h2>textarea，高度自适应：</h2>
        <wb-input :autosize="true" :value.sync="text" placeholder="我是文本哦" :disabled="disabled" :readonly="readonly" type="textarea"></wb-input>

        <h2>textarea，高度自适应，设置最大rows：</h2>
        <wb-input :autosize="{min:4, max:6}" :value.sync="text" placeholder="我是文本哦" :disabled="disabled" :readonly="readonly" type="textarea"></wb-input>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
                text: "我变变变",
                disabled: false,
                readonly: false
            }
        },
        ready: function () {
            setTimeout(()=> {
                this.text = "我变变变1";
            }, 2000)
        },
        methods: {

        }
    }
</script>
