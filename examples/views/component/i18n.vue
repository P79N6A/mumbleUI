<template>
    <div class="article">
        <h1>国际化</h1>
        <markdown></markdown>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown from './md/i18n.md'
    export default {
        components: {
            markdown,
        },
        data: function () {
            return {
                markdown
            }
        }
    }
</script>
