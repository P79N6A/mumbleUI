<template>
    <div class="home-panel">
        <h1>pc组件</h1>
        <ul>
            <li> <a v-link="{ path:'/common/banner'}">banner</a> </li>
            <li> <a v-link="{ path:'/pc/table'}">table</a> </li>
            <li> <a v-link="{ path:'/pc/toast'}">toast</a> </li>
            <li> <a v-link="{ path:'/pc/message'}">message</a> </li>
            <li> <a v-link="{ path:'/pc/modal'}">modal</a> </li>
            <li> <a v-link="{ path:'/pc/quill'}">richText</a> </li>
            <li> <a v-link="{ path:'/pc/tree'}">tree</a> </li>
        </ul>
        <h1>mobile组件</h1>
        <ul>
            <li> <a v-link="{ path:'/mobile/banner'}">banner</a> </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data () {
            return {
            }
        },
        compiled() {
        }
    }

</script>
