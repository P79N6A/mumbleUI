<template>
    <div class="tab-panel">
        <tabs @tabs.choose="choose">
            <tab label="标签一" icon="android">
                <p>1</p>
                <p>1.1</p>
            </tab>
            <tab label="标签二" icon="apple">
                <p>2</p>
            </tab>
            <tab label="标签三" icon="windows" disabled>3</tab>
        </tabs>
        <div>a a a</div>
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

