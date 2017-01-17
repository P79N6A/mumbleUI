/*!
 * Ui.webank v1.0.0
 * (c) 2016 harrywan
 * Released under the MIT License.
 */
require("./src/styles/index.scss") ;

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
import {Steps, Step} from './src/components/step';
import Tooltip from './src/components/tooltip';
import {Tabs, Tab} from './src/components/tab';
import Pagination from './src/components/pagination';
import * as Util from './src/util.js';

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
    Zoom,
    Steps,
    Step,
    Tooltip,
    Tabs,
    Tab,
    Pagination
};

const install = function (Vue) {
    Object.keys(UiWebank).forEach((key) => {
        Vue.component(key, UiWebank[key])
    });
    Vue.directive("datePicker", DatePicker._directive);
    Vue.directive("zoom", Zoom._directive);
    Vue.directive("tooltip", Tooltip._directive);
    Vue.directive("upload", Upload);
    Vue.prototype.$Message = window.Message = Message;
    Vue.prototype.$Toast = window.Toast = Toast;
    Vue.prototype.$Util = window.Util = Util;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = Object.assign(UiWebank, {install});
