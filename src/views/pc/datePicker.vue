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
</template>
<script>
    import datePicker from "../../components/pc/datePicker/datePicker";
    export default{
        data(){
            return{
                today: new Date().getTime(),
                value1: null,
                value2: null,
                value3: null
            }
        },
        components:{
            datePicker
        },
        methods: {
            change1(data){
                console.log(data)
                this.value1 = data
            },
            change2(data){
                console.log(data)
                this.value2 = data
            },
            change3(data){
                console.log(data)
                this.value3 = data
            }
        }
    }
</script>
