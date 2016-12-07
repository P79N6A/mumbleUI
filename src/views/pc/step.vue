<template>
    <div class="step-panel">
        <steps :current="current">
            <step title="已完成" content="这里是该步骤的描述信息"></step>
            <step title="进行中" content="这里是该步骤的描述信息"></step>
            <step title="待进行" content="这里是该步骤的描述信息"></step>
            <step title="待进行" content="这里是该步骤的描述信息"></step>
        </steps>

        <button @click="next">下一步</button>
    </div>

</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
          return {
              current: 1
          }
        },
        ready: function () {
        },
        methods: {
            next: function () {
                this.current += 1;
                if(this.current > 4){
                    this.current = 1;
                }
            }
        }
    }
</script>

