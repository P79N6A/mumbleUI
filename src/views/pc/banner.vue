<template>
   <banner :list="list" :time="time"></banner>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
                time : 3000,
                list : [{
                    imgUrl : "http://static.fangdd.com/activityh5/img/web32002.jpg",
                    link : ""
                }]
            }
        },
        ready: function () {
            setTimeout(()=>{
                this.list.push({
                    imgUrl : "http://static.fangdd.com/activityh5/img/web32002.jpg",
                    link : ""
                })
                this.list.push({
                    imgUrl : "http://static.fangdd.com/activityh5/img/xfbanner2016013101.png",
                        link : ""
                })
            }, 1000)
        },
        methods: {
        }
    }
</script>
