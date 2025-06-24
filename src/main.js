import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Default from './layout/wrapper/index.vue';
import Blank from './layout/wrapper/index_blank.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Toaster from "@meforma/vue-toaster";

const app = createApp(App);
app.use(Toaster, {
    position: "top-right"
})

app.component("default-layout", Default);
app.component("blank-layout", Blank);
app.use(router); // Đừng quên thêm router vào ứng dụng Vue
app.mount("#app");