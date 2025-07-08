<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h4>Danh Sách Khách Hàng</h4>
                        <button class="btn btn-primary rounded-pill" data-bs-toggle="modal"
                            data-bs-target="#themModal">Thêm Mới Nhân Viên</button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr class="align-middle text-center">
                                        <th scope="col">#</th>
                                        <th scope="col">Tên Khách Hàng</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Số Điện Thoại</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(value, index) in list_khach_hang" :key="index">
                                        <tr class="align-middle text-center">
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td scope="row">{{ value.ten_khach_hang }}</td>
                                            <td scope="row">{{ value.email }}</td>
                                            <td scope="row">{{ value.so_dien_thoai }}</td>
                                            <td scope="row">
                                                <button v-on:click="changeTrangThai(value)" v-if="value.tinh_trang == 1"
                                                    type="button" class="btn btn-success rounded-pill">Hoạt
                                                    Động</button>
                                                <button v-on:click="changeTrangThai(value)" v-else type="button"
                                                    class="btn btn-secondary rounded-pill">Tạm
                                                    Khóa</button>
                                            </td>
                                            <td scope="row">
                                                <button v-on:click="Object.assign(edit_khach_hang, value)" type="button"
                                                    class="btn btn-warning rounded-pill me-2" data-bs-toggle="modal"
                                                    data-bs-target="#capNhatModal">Cập
                                                    Nhật</button>
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Khách Hàng</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên Khách Hàng</label>
                        <input v-model="create_khach_hang.ten_khach_hang" class="form-control rounded-pill" type="text">
                    </div>
                    <div class="mb-2">
                        <label>Email</label>
                        <input v-model="create_khach_hang.email" class="form-control rounded-pill" type="text">
                    </div>
                    <div class="mb-2">
                        <label>Số Điện Thoại</label>
                        <input v-model="create_khach_hang.so_dien_thoai" class="form-control rounded-pill" type="text">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="themMoiKhachHang()" type="button" class="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal">Thêm
                        Mới</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal CẬP NHẬT-->
    <div class="modal fade" id="capNhatModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Khách Hàng</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên Khách Hàng</label>
                        <input v-model="edit_khach_hang.ten_khach_hang" class="form-control rounded-pill" type="text">
                    </div>
                    <div class="mb-2">
                        <label>Email</label>
                        <input v-model="edit_khach_hang.email" class="form-control rounded-pill" type="text">
                    </div>
                    <div class="mb-2">
                        <label>Số Điện Thoại</label>
                        <input v-model="edit_khach_hang.so_dien_thoai" class="form-control rounded-pill" type="text">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="capnhatKhachHang()" type="button" class="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal">Cập
                        Nhật</button>
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
            list_khach_hang: [],
            create_khach_hang: {},
            edit_khach_hang: {}
        }
    },
    mounted() {
        this.layDataKhachHang();
    },
    methods: {
        layDataKhachHang() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/khach-hang/data")
                .then((res) => {
                    this.list_khach_hang = res.data.data;
                })
        },

        changeTrangThai(value) {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/khach-hang/doi-trang-thai", value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.layDataKhachHang();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        themMoiKhachHang() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/khach-hang/create", this.create_khach_hang, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataKhachHang();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        capnhatKhachHang() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/khach-hang/update", this.edit_khach_hang, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataKhachHang();
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