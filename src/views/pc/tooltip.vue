<template>
    <div class="tooltip-panel">
        <span v-tooltip="我是u阿达" :tooltip-option="option">1111111111111111</span>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data: function () {
            return {
                option : {
                    direction: 'bottom',
                    trigger: "outsideClick"
                }
            }
        },
        methods: {
        }
    }
</script>
