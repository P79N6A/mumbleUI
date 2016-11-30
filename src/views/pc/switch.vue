<template>
    <switch-ele :on.sync="on" ></switch-ele>  {{on}}
</template>
<script type="text/ecmascript-6">
    import switchEle from "../../components/pc/src/components/switch/switch.vue";
    export default{
        data: function () {
            return {
                on: true
            }
        },
        components: {
            switchEle
        },
        methods: {
        }
    }
</script>
