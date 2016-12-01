<template>
    <div class="popup-container">
        <div class="popup">
            <h3 v-if="title" class="popup-title" v-html="title"></h3>
            <div class="popup-body" v-html="template">
            </div>
            <div class="popup-buttons">
                <div v-if="button.show" v-for="button in buttons" class="cell {{button.class}}"
                      @click="click($index, $event)" v-text="button.text"></div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            title: {
                type: String
            },
            template: {
                type: String,
                required: true
            },
            buttons: {
                type: Array
            }
        },
        methods: {
            click: function (index, event) {
                this.$dispatch("message.close", index);
            }
        }
    }
</script>
