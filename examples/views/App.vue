<template>
    <div>
        <Row class="top-panel">
            <Cell class="logo-swap" span="4">
                <span class="logo">FES 2.0</span>
                <span class="desc">Curd应用快速解决方案</span>
            </Cell>
        </Row>
        <div class="bottom-panel">
            <router-view ref="pageview" />
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    data: function () {
        return {
        }
    },
    methods: {
        selected(path) {
            if (this.$route.path.indexOf(path) != -1) {
                return 'selected'
            }
        },
        go(path) {
            this.$router.push(path)
        }
    }
}
</script>
<style src="../styles/main.scss" lang="scss"></style>
