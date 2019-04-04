```html
<template>
    <Radio v-model="checked">
        是否同意xxxx
    </Radio> 
    <Radio label="使用label">
    </Radio>
    <Radio label="使用disabeld" disabled>
    </Radio>
</template>
<script>
    export default {
        data: function () {
            return {
                checked: false
            }
        }
    }
</script>
```