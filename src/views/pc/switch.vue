<template>
    <switch :on.sync="on" ></switch>  {{on}}
</template>
<script type="text/ecmascript-6">
    export default{
        data: function () {
            return {
                on: true
            }
        },
        methods: {
        }
    }
</script>
