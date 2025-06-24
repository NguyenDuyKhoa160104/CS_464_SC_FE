<template>
    <!-- Sidebar Start -->
    <div class="sidebar pe-4 pb-3">
        <nav class="navbar bg-light navbar-light">
            <a href="/nhan-vien/trang-chu" class="navbar-brand mx-4 mb-3">
                <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>DASHMIN</h3>
            </a>
            <template v-if="auth">
                <div class="d-flex align-items-center ms-4 mb-4">
                    <div class="position-relative">
                        <img class="rounded-circle" v-bind:src="anh_nv" alt=""
                            style="width: 40px; height: 40px;">
                        <div
                            class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
                        </div>
                    </div>
                    <div class="ms-3">
                        <h6 class="mb-0">{{ name_nv }}</h6>
                        <span>Admin</span>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="d-flex align-items-center ms-4 mb-4">
                    <div class="position-relative">
                        <img class="rounded-circle" src="../../assets/img/noneuser.webp" alt=""
                            style="width: 40px; height: 40px;">
                        <div
                            class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
                        </div>
                    </div>
                    <div class="ms-3">
                        <h6 class="mb-0">User</h6>
                        <span>Admin</span>
                    </div>
                </div>
            </template>
            <div class="navbar-nav w-100">
                <a :href="`/admin/danh-muc`" class="nav-item nav-link active"><i class="fa fa-list me-2"></i>
                    Danh Mục</a>
            </div>
            <div class="navbar-nav w-100">
                <a :href="`/admin/khach-hang`" class="nav-item nav-link active"><i class="fas fa-users"></i>
                    Khách Hàng</a>
            </div>
            <div class="navbar-nav w-100">
                <a :href="`/admin/nhan-vien`" class="nav-item nav-link active"><i class="fas fa-address-card"></i>
                    Nhân Viên</a>
            </div>
            <div class="navbar-nav w-100">
                <a :href="`/admin/san-pham`" class="nav-item nav-link active"><i class="fa fa-box me-2"></i>
                    Sản Phẩm</a>
            </div>
            <div class="navbar-nav w-100">
                <a :href="`/admin/dich-vu`" class="nav-item nav-link active"><i class="fas fa-concierge-bell"></i>
                    Dịch Vụ</a>
            </div>
            <div class="navbar-nav w-100">
                <a :href="`/admin/hoa-don`" class="nav-item nav-link active"><i class="fas fa-file-invoice"></i>
                    Hóa Đơn</a>
            </div>
        </nav>
    </div>
    <!-- Sidebar End -->
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            auth: false,
            name_nv: '',
            anh_nv: ''
        }
    },
    mounted() {
        this.anh_nv = localStorage.getItem('ten_anh')
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
    },
}
</script>
<style></style>