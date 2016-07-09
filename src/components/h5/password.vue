<template>
    <div class="ui-pwdInp-wrap" @click="foucs">
        <ul class="ui-pwdInp-show ui-flexrow">
            <li v-for="item in items" class="ui-flex-item">
                <i class="item" v-bind:class="{'cur' : $index<=(value.length-1)}"></i>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            value : String
        },

        data () {
            return {
                items : [1,2,3,4,5,6]
            }
        },
        methods: {
            foucs(){
                this.$dispatch('focus');
            }
        }
    }
</script>