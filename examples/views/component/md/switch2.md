```html
<template>
    <Wb-switch v-model="switch">
        <span slot="open">开</span>
        <span slot="close">关</span>
    </Wb-switch>
    <Wb-switch v-model="switch">
        <Icon slot="open" type="check"></Icon>
        <Icon slot="close" type="close"></Icon>
    </Wb-switch>
    <Wb-switch v-model="switch">
        <span slot="open">开开开开开</span>
        <span slot="close">关</span>
    </Wb-switch>
</template>
<script>
    export default {
        data: function () {
            return {
                switch: false
            }
        },
    }
</script>
```