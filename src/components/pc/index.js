import Banner from './src/components/banner';
import DataTable from './src/components/dataTable';
import DatePicker from './src/components/datePicker';
import Loading from './src/components/loading';
import Message from './src/components/message';
import Modal from './src/components/modal';
import Switch from './src/components/switch';
import Toast from './src/components/toast';
import Tree from './src/components/tree';
import Upload from './src/components/upload';
import Zoom from './src/components/zoom';

const UiWebank = {
    Banner,
    DataTable: DataTable.base,
    SortTable: DataTable.sort,
    TreeTable: DataTable.tree,
    TableColumn: DataTable.column,
    DatePicker,
    Loading,
    Modal,
    Switch,
    Tree,
    Zoom
};

const install = function (Vue) {
    Object.keys(UiWebank).forEach((key) => {
        Vue.component(key, UiWebank[key])
    });
    Vue.directive("datePicker", DatePicker._directive);
    Vue.directive("zoom", Zoom._directive);
    Vue.directive("upload", Upload);
    Vue.prototype.$Message = Message;
    Vue.prototype.$Toast = Toast;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = Object.assign(UiWebank, {install});
