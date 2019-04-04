import * as util from '../utils/util.js';
let cache = {};
let key = 1;
export default {
    inserted(el, binding) {
        el.outsideKey = key++;
        let self = {}
        self.documentHandler = (e) => {
            if (util.contains(el, e.target)) {
                return false;
            }
            if (binding.value) {
                binding.value();
            }
        };
        cache[el.outsideKey] = self;
        document.addEventListener('mousedown', self.documentHandler);
    },
    unbind(el) {
        let self = cache[el.outsideKey];
        document.removeEventListener('mousedown', self.documentHandler);
    }
};
