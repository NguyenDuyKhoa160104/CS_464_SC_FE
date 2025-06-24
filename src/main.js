import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Default from './layout/wrapper/index.vue';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App);

app.component("default-layout", Default);
app.use(router); // Đừng quên thêm router vào ứng dụng Vue
app.mount("#app");