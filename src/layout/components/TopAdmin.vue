<template>
    <!-- Navbar Start -->
    <nav class="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
        <a href="index.html" class="navbar-brand d-flex d-lg-none me-4">
            <h2 class="text-primary mb-0"><i class="fa fa-hashtag"></i></h2>
        </a>
        <a href="#" class="sidebar-toggler flex-shrink-0">
            <i class="fa fa-bars"></i>
        </a>
        <form class="d-none d-md-flex ms-4">
            <input class="form-control border-0" type="search" placeholder="Search">
        </form>
        <div class="navbar-nav align-items-center ms-auto">
            <template v-if="auth == true">
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <img class="rounded-circle me-lg-2" v-bind:src="anh_nv" alt=""
                            style="width: 40px; height: 40px;">
                        <span class="d-none d-lg-inline-flex">{{ name_nv }}</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                        <a :href="`/admin/profile`" class="dropdown-item">Hồ sơ</a>
                        <a href="#" class="dropdown-item">Cài đặt</a>
                        <button v-on:click="dangXuat()" href="#" class="dropdown-item">Đăng Xuất</button>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                        <img class="rounded-circle me-lg-2" src="../../assets/img/noneuser.webp" alt=""
                            style="width: 40px; height: 40px;">
                        <span class="d-none d-lg-inline-flex">Admin</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end bg-light border-0 rounded-0 rounded-bottom m-0">
                        <a :href="`/admin/dang-nhap`" class="dropdown-item">Đăng Nhập</a>
                    </div>
                </div>
            </template>
        </div>
    </nav>
    <!-- Navbar End -->
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            auth: false,
            name_nv: '',
            anh_nv: '',
            quyen: '',
            list_login: [],
        }
    },
    mounted() {
        this.anh_nv = localStorage.getItem('ten_anh');
        this.name_nv = localStorage.getItem('ten_nv');
        console.log(localStorage.getItem("token_nhan_vien"))
        this.checkLogin();
    },
    methods: {
        checkLogin() {
            axios
                .get('http://127.0.0.1:8000/api/kiem-tra-admin', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.auth = true
                    }
                })
        },

        dangXuat() {
            axios
                .post('http://127.0.0.1:8000/api/nhan-vien/dang-xuat', {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.$router.push('/khach-hang/trang-chu')
                        window.location.reload();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
    },
}

</script>
<style></style>