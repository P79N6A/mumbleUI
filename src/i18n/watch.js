import Vue from 'vue';
let dataListeners = [];

export function subscribeDataChanging(vm) {
    let index = dataListeners.indexOf(vm);
    if (index === -1 && !vm.ui_i18n_subscribing) {
        dataListeners.push(vm);
        vm.ui_i18n_subscribing = true;
    }
}

export function unsubscribeDataChanging(vm) {
    let index = dataListeners.indexOf(vm);
    if (index !== -1 && vm.ui_i18n_subscribing) {
        dataListeners.splice(index, 1)
    }
}

export function trigger() {
    let i = dataListeners.length;
    while (i--) {
        let vm = dataListeners[i];
        Vue.nextTick(() => {
            vm && vm.$forceUpdate()
        })
    }
}