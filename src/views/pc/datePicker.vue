<template>
    <div class="datePicker-panel">
        <h2>
            单选模式
        </h2>
        <div class="result">
            {{ value1 | json }}
        </div>
        <date-picker :value="today" @update="change1"></date-picker>

        <h2>
            多选模式
        </h2>
        <div class="result">
            {{value2 | json}}
        </div>
        <date-picker :value="[today]" model="multiple" @update="change2"></date-picker>

        <h2>
            区间模式
        </h2>
        <div class="result">
            {{value3 | json}}
        </div>
        <date-picker model="range" @update="change3"></date-picker>


        <div style="height:900px; width: 700px; position: absolute; left:500px; top: 0px;">
            <h2>
                指令模式
            </h2>
            <div class="result">
                {{value | json}}
            </div>
            <input type="text" v-date-picker="value" :date-picker-option="config"/>

        </div>
    </div>

</template>
<script type="text/ecmascript-6">
    export default{
        data: function () {
            return {
                today: new Date().getTime(),
                value1: null,
                value2: null,
                value3: null,
                value: new Date().getTime(),
                config: {
                    enableTime: true
                }
            }
        },
        methods: {
            change1(data){
                this.value1 = data
            },
            change2(data){
                this.value2 = data
            },
            change3(data){
                this.value3 = data
            }
        }
    }
</script>
