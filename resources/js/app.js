require('./bootstrap');

global.jQuery = require('jquery');
const $ = global.jQuery;
window.$ = $;

import {createApp, onMounted} from 'vue'
import LaravelVuePagination from 'laravel-vue-pagination';
import router from './routes/index'
import VueSweetalert2 from "vue-sweetalert2";
import useAuth from "./composables/auth";


//import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp({
    setup() {
        const { getUser } = useAuth()
        onMounted(getUser)
    }
})
app.use(router)
app.use(VueSweetalert2)
app.component('Pagination', LaravelVuePagination)
app.mount('#app')
