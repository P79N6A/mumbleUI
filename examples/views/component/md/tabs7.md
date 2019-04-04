```html
<template>
    <Tabs v-model="value" draggable  @on-tab-change="change">
        <Tab label="标签一">
            <p>1</p>
        </Tab>
        <Tab label="标签二">
            <p>2</p>
        </Tab>
        <Tab label="标签三">
            <p>3</p>
        </Tab>
    </Tabs>
</template>
<script>
    export default {
        data: function () {
            return {
                value: '1'
            }
        },
        change({from, to }){
            console.log(from, to)
        }
    }
</script>
```