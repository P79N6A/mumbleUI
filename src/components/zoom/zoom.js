import Vue from 'vue';
import zoom from './zoom.vue';
import * as util from '../../utils/util.js';

function create(parent, zoomOption) {
    var zoomComponent = new Vue({
        name: 'ZoomContainer',
        components: {
            zoom: zoom
        },
        data: function () {
            var defaultOption = {
                show: true,
                src: undefined,
                minWidth: undefined,
                maxWidth: undefined
            };
            return util.merge(defaultOption, zoomOption || {})
        },
        created: function () {
            this.$on('on-close', this.close);
        },
        beforeDestroy: function () {
            this.$off('on-close');
        },
        methods: {
            close: function () {
                this.show = false;
            }
        },
        template: '<zoom v-show="show" :src="src" :min-width="minWidth" :max-width="maxWidth"></zoom>'
    });
    var component = zoomComponent.$mount();
    document.body.appendChild(component.$el);
    return zoomComponent;
}

function trigger() {
    if (!this.component) {
        this.component = create(this, this.option)
    } else {
        this.component.show = true;
    }
}

let cache = {};
export default {
    inserted: function (el, binding) {
        let self = cache[el] = {};
        if ( util.typeOf(binding.value) == 'object') {
            self.option = binding.value
        } else {
            self.option = {
                src: el.src
            }
        }
        el.addEventListener('click', trigger.bind(self), false)
    },
    unbind: function (el) {
        let self = cache[el]
        el.removeEventListener('click', trigger.bind(self))
    }
}
