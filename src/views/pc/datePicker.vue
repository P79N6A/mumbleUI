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
        {{ config | json }}
        <input type="text" v-date="config" />
    </div>
</template>
    <script>
    import datePicker from "../../components/pc/datePicker/datePicker.vue";
    import date from "../../components/pc/datePicker/datePicker.js";
    export default{
        data(){
            return{
                today: new Date().getTime(),
                value1: null,
                value2: null,
                value3: null,
                config: {
//                    value: new Date().getTime()
                }
            }
        },
        directives: {
            date: date
        },
        components:{
            datePicker
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
