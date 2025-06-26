<template>
    <div v-if="list_login.id_quyen == 1" class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h4>Danh Sách Sản Phẩm</h4>
                        <button class="btn btn-primary rounded-pill"
                            data-bs-toggle="modal" data-bs-target="#themModal">Thêm Mới Nhân Viên</button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr class="align-middle text-center">
                                        <th scope="col">#</th>
                                        <th scope="col">Quyền</th>
                                        <th scope="col">Họ Và Tên</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Số Điện Thoại</th>
                                        <th scope="col">Hình Ảnh</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(value, index) in list_nhan_vien" :key="index">
                                        <tr class="align-middle text-center">
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td v-if="value.id_quyen == 1">Quản lý</td>
                                            <td v-else>Nhân Viên</td>
                                            <td>{{ value.ten_nhan_vien }}</td>
                                            <td>{{ value.email }}</td>
                                            <td>{{ value.so_dien_thoai }}</td>
                                            <td>
                                                <img v-if="value.hinh_anh == ''" src="/src/assets/img/noneuser.webp"
                                                    alt="Admin" class="rounded-circle p-1 bg-primary" width="110">
                                                <img v-else v-bind:src="value.hinh_anh" alt="Admin"
                                                    class="rounded-circle p-1 bg-primary" width="110">
                                            </td>
                                            <td>
                                                <div v-if="value.id_quyen != 1">
                                                    <button v-on:click="changeTrangThai(value)" v-if="value.tinh_trang == 1"
                                                    type="button" class="btn btn-success rounded-pill">Hoạt
                                                    Động</button>
                                                <button v-on:click="changeTrangThai(value)" v-else type="button"
                                                    class="btn btn-secondary rounded-pill">Tạm Khóa</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal THÊM-->
    <div class="modal fade" id="themModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Nhân Viên</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên Nhân Viên</label>
                        <input v-model="create_nhan_vien.ten_nhan_vien" class="form-control rounded-pill" type="text">
                    </div>
                    <div class="mb-2">
                        <label>Email</label>
                        <input v-model="create_nhan_vien.email" class="form-control rounded-pill" type="text">
                    </div>
                    <div class="mb-2">
                        <label>Password</label>
                        <input v-model="create_nhan_vien.password" class="form-control rounded-pill" type="password">
                    </div>
                    <div class="mb-2">
                        <label>Số điện thoại</label>
                        <input v-model="create_nhan_vien.so_dien_thoai" class="form-control rounded-pill" type="text">
                    </div>
                    <div class="mb-2">
                        <label>Quyền</label>
                        <select v-model="create_nhan_vien.id_quyen" class="form-control">
                            <option value="1">Quản lý</option>
                            <option value="2">Nhân Viên</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="themMoiNhanVien()" type="button" class="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal">Thêm
                        Mới</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            list_login: {},
            list_nhan_vien: [],
            create_nhan_vien: {},
        }
    },
    mounted() {
        this.layDataDanhLogin()
        this.layDataNhanVien()
    },
    methods: {
        changeTrangThai(value) {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/doi-tinh-trang", value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.layDataNhanVien();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        layDataNhanVien() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/data")
                .then((res) => {
                    this.list_nhan_vien = res.data.data;
                })
        },

        layDataDanhLogin() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/data-dang-nhap", {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    this.list_login = res.data.data;
                    this.auth = res.data.status;
                })
        },

        themMoiNhanVien() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/create", this.create_nhan_vien, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataNhanVien();
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