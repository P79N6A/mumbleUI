/*!
 * Ui.webank v1.0.0
 * (c) 2016 harrywan
 * Released under the MIT License.
 */
require("./src/styles/index.scss") ;

import Banner from './src/components/banner';
import { DataTable, SortTable, TreeTable, TableColumn} from './src/components/dataTable';
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
import { Row, Cell} from './src/components/layout';
import Icon from './src/components/icon';
import WbInput from './src/components/input';
import {WbSelect, WbOption, OptionGroup} from './src/components/select';
import {Radio, RadioGroup} from './src/components/radio';
import {Checkbox, CheckboxGroup} from './src/components/checkbox';
import {WbForm, FormItem} from './src/components/form';
import * as Util from './src/util.js';


const UiWebank = {
    Banner,
    DataTable,
    SortTable,
    TreeTable,
    TableColumn,
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
    Pagination,
    Row,
    Cell,
    Icon,
    WbInput,
    WbSelect,
    WbOption,
    OptionGroup,
    Radio,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    WbForm,
    FormItem
};

const install = function (Vue) {
    Object.keys(UiWebank).forEach((key) => {
        Vue.component(key, UiWebank[key])
    });
    Vue.directive("DatePicker", DatePicker._directive);
    Vue.directive("Zoom", Zoom._directive);
    Vue.directive("Tooltip", Tooltip._directive);
    Vue.directive("Upload", Upload._directive);
    Vue.prototype.$Message = window.Message = Message;
    Vue.prototype.$Toast = window.Toast = Toast;
    Vue.prototype.$Util = window.Util = Util;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

module.exports = Object.assign(UiWebank, {install});
