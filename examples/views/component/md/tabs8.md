```html
<template>
    <Tabs v-model="value">
        <Tab :label="copm(1)">
            <p>1</p>
        </Tab>
        <Tab :label="copm(2)">
            <p>2</p>
        </Tab>
        <Tab :label="copm(3)">
            <p>3</p>
        </Tab>
    </Tabs>
</template>
<script>
    export default {
        data: function () {
            return {
                value: '1',
                copm: function(i){
                    return new Vue({
                        data: function(){
                        return{
                            i
                        }
                        },
                        template: '<span>标签<span class="a">{{i}}</span></span>'
                    })
                }
            }
        }
    }
</script>
```