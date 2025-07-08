<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h4>Danh Sách Sản Phẩm</h4>
                        <button v-if="list_login.tinh_trang == 1" class="btn btn-primary rounded-pill"
                            data-bs-toggle="modal" data-bs-target="#themModal">Thêm Mới Sản Phẩm</button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr class="align-middle text-center">
                                        <th scope="col">#</th>
                                        <th scope="col">Tên Sản Phẩm</th>
                                        <th scope="col">Danh Mục</th>
                                        <th scope="col">Giá</th>
                                        <th scope="col">Mô Tả</th>
                                        <th scope="col">Mô Tả Chi Tiêt</th>
                                        <th scope="col">Hình Ảnh</th>
                                        <th scope="col">Status</th>
                                        <th v-if="list_login.tinh_trang == 1" scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(value, index) in list_san_pham" :key="index">
                                        <tr class="align-middle text-center">
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>{{ value.ten_san_pham }}</td>
                                            <td>{{ numberToString(value.id_danh_muc) }}</td>
                                            <td>{{ formatToVND(value.gia_san_pham) }}</td>
                                            <td class="text-wrap">{{ value.mo_ta }}</td>
                                            <td class="text-wrap">
                                                <button v-on:click="chi_tiet = value" data-bs-toggle="modal"
                                                    data-bs-target="#chiTietExtraLargeModal"
                                                    class="btn btn-info rounded-pill text-nowrap">Chi
                                                    tiết
                                                </button>
                                            </td>
                                            <td>
                                                <img style="width: 200px;" v-bind:src="value.hinh_anh" alt="">
                                            </td>
                                            <td class="text-nowrap">
                                                <button v-on:click="changeTrangThai(value)" v-if="value.tinh_trang == 1"
                                                    type="button" class="btn btn-success rounded-pill">Hoạt
                                                    Động</button>
                                                <button v-on:click="changeTrangThai(value)" v-else type="button"
                                                    class="btn btn-secondary rounded-pill">Tạm Dừng</button>
                                            </td>
                                            <td class="text-nowrap">
                                                <div v-if="list_login.tinh_trang == 1">
                                                    <button v-on:click="Object.assign(edit_san_pham, value)"
                                                        type="button" class="btn btn-warning rounded-pill me-2"
                                                        data-bs-toggle="modal" data-bs-target="#capNhatModal">Cập
                                                        Nhật</button>
                                                    <button v-on:click="del_san_pham = value" type="button"
                                                        class="btn btn-danger rounded-pill" data-bs-toggle="modal"
                                                        data-bs-target="#xoaModal">Xóa</button>
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên Sản Phẩm</label>
                        <input v-model="create_san_pham.ten_san_pham" class="form-control rounded-pill" type="text">
                    </div>
                    <div class="mb-2">
                        <label>Chọn Danh Mục</label>
                        <select v-model="create_san_pham.id_danh_muc" class="form-control">
                            <template v-for="(value, index) in list_danh_muc_open" :key="index">
                                <option :value="Number(value.id)">{{ value.ten_danh_muc }}</option>
                            </template>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label>Giá Cả</label>
                        <input v-model="create_san_pham.gia_san_pham" class="form-control rounded-pill" type="number">
                    </div>
                    <div class="mb-2">
                        <label>Mô Tả</label>
                        <input v-model="create_san_pham.mo_ta" class="form-control rounded-pill" type="text">
                    </div>
                    <div class="mb-2">
                        <label>Mô Tả Chi Tiết</label>
                        <textarea v-model="create_san_pham.mo_ta_chi_tiet" class="form-control"></textarea>
                    </div>
                    <div class="mb-2">
                        <label>Hình Ảnh</label>
                        <input v-model="create_san_pham.hinh_anh" class="form-control rounded-pill" type="text">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="themMoiSanPham()" type="button" class="btn btn-primary rounded-pill"
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="modal-body">
                        <div class="mb-2">
                            <label>Tên Sản Phẩm</label>
                            <input v-model="edit_san_pham.ten_san_pham" class="form-control rounded-pill" type="text">
                        </div>
                        <div class="mb-2">
                            <label>Danh Mục</label>
                            <select v-model="edit_san_pham.id_danh_muc" class="form-control">
                                <template v-for="(value, index) in list_danh_muc_open" :key="index">
                                    <option :value="Number(value.id)">{{ value.ten_danh_muc }}</option>
                                </template>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label>Giá Cả</label>
                            <input v-model="edit_san_pham.gia_san_pham" class="form-control rounded-pill" type="number">
                        </div>
                        <div class="mb-2">
                            <label>Mô Tả</label>
                            <input v-model="edit_san_pham.mo_ta" class="form-control rounded-pill" type="text">
                        </div>
                        <div class="mb-2">
                            <label>Mô Tả Chi Tiết</label>
                            <textarea v-model="edit_san_pham.mo_ta_chi_tiet" class="form-control"></textarea>
                        </div>
                        <div class="mb-2">
                            <label>Hình Ảnh</label>
                            <input v-model="edit_san_pham.hinh_anh" class="form-control rounded-pill" type="text">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="capnhatSanPham()" type="button" class="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal">Cập
                        Nhật</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal XÓA-->
    <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Sản Phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5>Bạn có chắc muốn xóa sản phẩm <b class="text-danger">{{ del_san_pham.ten_san_pham }}</b> không?
                    </h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="xoaSanPham()" type="button" class="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal">Xóa</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Chi tiết-->
    <div class="modal fade" id="chiTietExtraLargeModal" tabindex="-1" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Chi Tiết Sản Phẩm</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <pre style="white-space:pre-wrap; word-wrap:break-word; font-family: Arial, Helvetica, sans-serif;">{{
                        chi_tiet.mo_ta_chi_tiet }}</pre>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            list_san_pham: [],
            list_danh_muc_open: [],
            create_san_pham: {},
            edit_san_pham: {},
            del_san_pham: {},
            list_login: [],
            chi_tiet: {},
        }
    },
    mounted() {
        this.layDataSanPham()
        this.layDataDanhMucOpen()
        this.layDataDanhLogin()
    },
    methods: {
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

        layDataSanPham() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/san-pham/data")
                .then((res) => {
                    this.list_san_pham = res.data.data;
                })
        },

        layDataDanhMucOpen() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/danh-muc/data-open")
                .then((res) => {
                    this.list_danh_muc_open = res.data.data;
                })
        },

        capnhatSanPham() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/san-pham/update", this.edit_san_pham, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataSanPham();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        xoaSanPham() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/san-pham/delete", this.del_san_pham, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataSanPham();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        changeTrangThai(value) {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/san-pham/doi-tinh-trang", value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.layDataSanPham();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        themMoiSanPham() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/san-pham/create", this.create_san_pham, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataSanPham();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        formatToVND(number) {
            return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        },

        numberToString(num) {
            const danhMuc = this.list_danh_muc_open.find(item => item.id === num);
            return danhMuc ? danhMuc.ten_danh_muc : "Danh mục không xác định";
        }
    }
}
</script>
<style></style>