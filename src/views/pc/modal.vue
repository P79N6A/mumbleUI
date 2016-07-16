<template>
    <button @click='showModal(111)'>点我弹出id为111的modal</button>
    <button @click='showModal(222)'>点我弹出id为222的modal</button>
    <modal id="111" title="我是标题" sub-title="111" @modal.close="modalClose('111')">
        <div slot style="width:300px; height:300px">
            我是内容，我是内容
        </div>
    </modal>
    <modal id="222" title="我是标题" sub-title="222" @modal.close="modalClose('222')" @modal.scroll="modalScroll">
        <div slot style="width:600px; height:1000px">
            我是内容，我是内容
        </div>
    </modal>
</template>     
<script type="text/ecmascript-6">
    import modal from "../../components/pc/modal/modal";
    export default {
        components: {
           modal: modal
        },
        data: function () {
            return {
                isShow: false
            }
        },
        ready: function () {
        },
        methods: {
           showModal(id){
                this.$broadcast("modal.show", id);
           },
           modalClose(id){
                alert("关闭id为"+id+"的modal")
           },
           modalScroll(event){
                console.log(event)
           }
        }
    }
</script>
