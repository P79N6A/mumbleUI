```html
<template>
    <Tabs v-model="value">
        <Tab label="标签一" name="android" icon="android">
            <p>1</p>
        </Tab>
        <Tab label="标签二" name="apple" icon="apple">
            <p>2</p>
        </Tab>
        <Tab label="标签三" name="windows" icon="windows" disabled>
            <p>3</p>
        </Tab>
    </Tabs>
</template>
<script>
    export default {
        data: function () {
            return {
                value: 'apple'
            }
        }
    }
</script>
```