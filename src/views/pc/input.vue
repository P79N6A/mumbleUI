<template>
    <div class="toast-panel">
        <wb-input :value.sync="text" placeholder="我是文本哦" :disabled="disabled" :readonly="readonly"></wb-input>
        <wb-input :value.sync="text" placeholder="我是文本哦" :disabled="disabled" :readonly="readonly" type="password"></wb-input>
        <wb-input :value.sync="text" placeholder="我是文本哦" :disabled="disabled" :readonly="readonly" type="textarea"></wb-input>
        <wb-input :rows="4" :value.sync="text" placeholder="我是文本哦" :disabled="disabled" :readonly="readonly" type="textarea"></wb-input>
        <wb-input :autosize="true" :value.sync="text" placeholder="我是文本哦" :disabled="disabled" :readonly="readonly" type="textarea"></wb-input>
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
