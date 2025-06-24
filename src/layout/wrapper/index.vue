<template>
    <div class="wrapper">
        <div class="page-wrapper">
            <MenuAdmin></MenuAdmin>
            <div class="page-content">
                <div class="content">
                    <TopAdmin></TopAdmin>
                    <div class="layout">
                        <router-view></router-view>
                        <BotAdmin></BotAdmin>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopAdmin from "../components/TopAdmin.vue";
import MenuAdmin from "../components/MenuAdmin.vue";
import BotAdmin from "../components/BotAdmin.vue";

import "../../assets/js/main.js";
import "../../assets/lib/chart/chart.min.js";

export default {
    name: "app",
    components: {
        TopAdmin, MenuAdmin, BotAdmin
    }
}
</script>
<style>
@import "../../assets/css/bootstrap.min.css";
@import "../../assets/css/style.css";
@import "../../assets/scss/bootstrap.scss";
@import "../../assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.css";
@import "../../assets/lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css";
@import "../../assets/lib/owlcarousel/assets/owl.carousel.css";
@import "../../assets/lib/owlcarousel/assets/owl.carousel.min.css";
@import "../../assets/lib/owlcarousel/assets/owl.theme.default.css";
@import "../../assets/lib/owlcarousel/assets/owl.theme.default.min.css";
@import "../../assets/lib/owlcarousel/assets/owl.theme.green.css";
@import "../../assets/lib/owlcarousel/assets/owl.theme.green.min.css";
</style>