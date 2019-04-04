<template>
    <div class="ui-message">
        <div class="ui-message-swap">
            <div class="ui-message-body">
                <div v-if="title" class="ui-message-title">
                    <i class="ui-icon ui-icon-question-circle" />
                    <span class="ui-message-title-text" v-html="title" />
                </div>
                <div class="ui-message-content" v-html="template" />
            </div>
            <div class="ui-message-buttons">
                <div v-for="(button,index) in buttons" v-show="button.show" :key="index" :class="getButtonClass(button)" class="ui-button"
                     @click="click(index, $event)" v-text="button.text" />
            </div>
        </div>
    </div>
</template>
<script>
import emitter from '../../mixins/emitter';
export default {
    name: 'Message',
    mixins: [emitter],
    props: {
        title: {
            type: String,
            default: undefined
        },
        template: {
            type: String,
            required: true
        },
        buttons: {
            type: Array,
            default: undefined
        }
    },
    methods: {
        getButtonClass(button) {
            return button.class
        },
        click: function (index) {
            this.dispatch('MessageSwap', 'on-close', index);
        }
    }
}
</script>
