<template>
    <div class="tab-panel">
        <tabs @tabs.choose="choose">
            <tab label="标签一">1</tab>
            <tab label="标签二">2</tab>
            <tab label="标签三" disabled>3</tab>
        </tabs>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
          return {
          }
        },
        ready: function () {
        },
        methods: {
            choose: function (index) {
                this.$Toast("选择第"+ index + "个")
            }
        }
    }
</script>

