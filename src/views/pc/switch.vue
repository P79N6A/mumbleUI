<template>
    <div class="switch-panel">
        <switch :on.sync="on"></switch>
        <switch :on.sync="on">
            <span slot="close">关</span>
            <span slot="open">开</span>
        </switch>

        {{on}}
    </div>

</template>
<script type="text/ecmascript-6">
    export default{
        data: function () {
            return {
                on: false
            }
        },
        methods: {
        }
    }
</script>
