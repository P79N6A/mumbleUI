<template>
    <div class="ui-message">
        <div class="ui-message-swap">
            <div class="ui-message-body">
                <div class="ui-message-title" v-if="title">
                    <i class="ui-icon ui-icon-question-circle"></i>
                    <span class="ui-message-title-text" v-html="title"></span>
                </div>
                <div class="ui-message-content" v-html="template">
                </div>
            </div>
            <div class="ui-message-buttons">
                <button v-show="button.show" v-for="button in buttons" class="ui-button {{button.class}}"
                     @click="click($index, $event)" v-text="button.text"></button>
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
        data: function () {
            return {
                show: true
            }
        },
        methods: {
            click: function (index) {
                this.$dispatch("message.close", index);
            }
        }
    }
</script>
