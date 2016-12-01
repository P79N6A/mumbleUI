<template>
    <div>
        <h2>
            单选： {{value1 | json}}
        </h2>
        <date-picker :value="today" @update="change1"></date-picker>
    </div>
    <div>
        <h2>
            多选： {{value2 | json}}
        </h2>
        <date-picker :value="[today]" model="multiple" @update="change2"></date-picker>
    </div>
    <div>
        <h2>
            区间： {{value3 | json}}
        </h2>
        <date-picker model="range" @update="change3"></date-picker>
    </div>
    <div style="height:900px; width: 700px; position: absolute; left:300px">
        {{ value | json }}
        <input type="text" v-date-picker="value" :date-picker-option="config"/>
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
