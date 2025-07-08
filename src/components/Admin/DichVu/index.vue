<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h4>Danh Sách Sản Phẩm</h4>
                        <button class="btn btn-primary rounded-pill" data-bs-toggle="modal"
                            data-bs-target="#themModal">Thêm Mới Dịch Vụ</button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr class="align-middle text-center">
                                        <th scope="col">#</th>
                                        <th scope="col">Tên Dịch Vụ</th>
                                        <th scope="col">Danh Mục</th>
                                        <th scope="col">Mô Tả Dịch Vụ</th>
                                        <th scope="col">Giá Dịch Vụ</th>
                                        <th scope="col">Thời Lượng</th>
                                        <th scope="col">Hình Ảnh</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(value, index) in list_dich_vu" :key="index">
                                        <tr class="align-middle text-center">
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td scope="row">{{ value.ten_dich_vu }}</td>
                                            <td scope="row">{{ numberToString(value.id_danh_muc) }}</td>
                                            <td scope="row">{{ value.mo_ta_dich_vu }}</td>
                                            <td scope="row">{{ formatToVND(value.gia_dich_vu) }}</td>
                                            <td scope="row">{{ formatMinutesToTime(value.thoi_luong) }}</td>
                                            <td scope="row">
                                                <img style="width: 200px;" v-bind:src="value.hinh_anh">
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-outline-success rounded-pill">Hoạt
                                                    Động</button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-warning rounded-pill me-2">Cập
                                                    Nhật</button>
                                                <button v-on:click="del_dich_vu = value" type="button"
                                                    data-bs-toggle="modal" data-bs-target="#xoaModal"
                                                    class="btn btn-danger rounded-pill">Xóa</button>
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
                        <label>Tên Dịch Vụ</label>
                        <input v-model="create_dich_vu.ten_dich_vu" class="form-control rounded-pill" type="text">
                    </div>
                    <div class="mb-2">
                        <label>Chọn Danh Mục</label>
                        <select v-model="create_dich_vu.id_danh_muc" class="form-control">
                            <template v-for="(value, index) in list_danh_muc_open" :key="index">
                                <option :value="Number(value.id)">{{ value.ten_danh_muc }}</option>
                            </template>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label>Mô Tả Dịch Vụ</label>
                        <textarea v-model="create_dich_vu.mo_ta_dich_vu" class="form-control"></textarea>
                    </div>
                    <div class="mb-2">
                        <label>Giá dịch vụ</label>
                        <input v-model="create_dich_vu.gia_dich_vu" class="form-control rounded-pill" type="number">
                    </div>
                    <div class="mb-2">
                        <label>Thời Lượng</label>
                        <input v-model="create_dich_vu.thoi_luong" class="form-control rounded-pill" type="number">
                    </div>
                    <div class="mb-2">
                        <label>Hình Ảnh</label>
                        <input v-model="create_dich_vu.hinh_anh" class="form-control rounded-pill" type="text">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="themMoiDichVu()" type="button" class="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal">Thêm
                        Mới</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal XÓA-->
    <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Dịch Vụ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5>Bạn có chắc muốn xóa sản phẩm <b class="text-danger">{{ del_dich_vu.ten_dich_vu }}</b> không?
                    </h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="xoaDichVu()" type="button" class="btn btn-primary rounded-pill"
                        data-bs-dismiss="modal">Xóa</button>
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
            list_danh_muc_open: [],
            list_dich_vu: [],
            del_dich_vu: {},
            create_dich_vu: {},
        };
    },
    mounted() {
        this.layDataDichVu();
        this.layDataDanhMucOpen();
    },
    methods: {
        layDataDanhMucOpen() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/danh-muc/data-open")
                .then((res) => {
                    this.list_danh_muc_open = res.data.data;
                })
        },

        layDataDichVu() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/dich-vu/data")
                .then((res) => {
                    this.list_dich_vu = res.data.data;
                })
        },

        themMoiDichVu() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/dich-vu/create", this.create_dich_vu, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataDichVu();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        xoaDichVu() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/dich-vu/delete", this.del_dich_vu, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataDichVu();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        numberToString(num) {
            const danhMuc = this.list_danh_muc_open.find(item => item.id === num);
            return danhMuc ? danhMuc.ten_danh_muc : "Danh mục không xác định";
        },

        formatToVND(number) {
            return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
        },

        formatMinutesToTime(minutes) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
        }
    },
}
</script>
<style></style>