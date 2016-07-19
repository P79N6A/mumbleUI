<template>
   <banner :list="list" :time="time"></banner>
</template>     
<script type="text/ecmascript-6">
    import banner from "../../components/h5/banner/banner";
    export default {
        components: {
           banner: banner
        },
        data: function () {
            return {
                time : 5000,
                list : []
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
            }, 300)
        },
        methods: {
        }
    }
</script>
