<template>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h4>Danh Sách Danh Mục</h4>
                        <button v-if="list_login.tinh_trang == 1" class="btn btn-primary rounded-pill"
                            data-bs-toggle="modal" data-bs-target="#themModal">Thêm
                            Danh Mục</button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr class="align-middle text-center">
                                        <th scope="col">#</th>
                                        <th scope="col">Tên Danh Mục</th>
                                        <th scope="col">Slug Danh Mục</th>
                                        <th scope="col">Status</th>
                                        <th v-if="list_login.tinh_trang == 1" scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(value, index) in list_danh_muc" :key="index">
                                        <tr class="align-middle text-center">
                                            <th scope="row">{{ index + 1 }}</th>
                                            <td>{{ value.ten_danh_muc }}</td>
                                            <td>{{ value.slug_danh_muc }}</td>
                                            <td>
                                                <button v-on:click="changeTrangThai(value)" v-if="value.tinh_trang == 1"
                                                    type="button" class="btn btn-success rounded-pill">Hoạt
                                                    Động</button>
                                                <button v-on:click="changeTrangThai(value)" v-else type="button"
                                                    class="btn btn-secondary rounded-pill me-2">Tạm
                                                    Dừng</button>
                                            </td>
                                            <td>
                                                <div v-if="list_login.tinh_trang == 1">
                                                    <button v-on:click="Object.assign(edit_danh_muc, value)"
                                                        type="button" class="btn btn-warning rounded-pill me-2"
                                                        data-bs-toggle="modal" data-bs-target="#capNhatModal">Cập
                                                        Nhật</button>
                                                    <button v-on:click="del_danh_muc = value" type="button"
                                                        class="btn btn-danger rounded-pill me-2" data-bs-toggle="modal"
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

    <!-- Modal THÊM-->
    <div class="modal fade" id="themModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Danh Mục</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên Danh Mục</label>
                        <input v-model="create_danh_muc.ten_danh_muc" v-on:change="taoSlugDM()" 
                            class="form-control rounded-pill" type="text">
                    </div>
                    <div class="mb-2">
                        <label>Slug Danh Mục</label>
                        <input v-model="create_danh_muc.slug_danh_muc" class="form-control rounded-pill" type="text">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="themMoiDanhMuc()" type="button" class="btn btn-primary rounded-pill"
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Danh Mục</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <label>Tên Danh Mục</label>
                        <input v-model="edit_danh_muc.ten_danh_muc" v-on:change="taoSlugDM()"
                            class="form-control rounded-pill" type="text">
                    </div>
                    <div class="mb-2">
                        <label>Slug Danh Mục</label>
                        <input v-model="edit_danh_muc.slug_danh_muc" class="form-control rounded-pill" type="text">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="capnhatDanhMuc()" type="button" class="btn btn-primary rounded-pill"
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Danh Mục</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5>Bạn có chắc muốn xóa danh mục <b class="text-danger">{{ del_danh_muc.ten_danh_muc }}</b> không?
                    </h5>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="xoaDanhMuc()" type="button" class="btn btn-primary rounded-pill"
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
            list_danh_muc: [],
            create_danh_muc: {
            },
            del_danh_muc: {},
            edit_danh_muc: {},
            list_login: []
        }
    },
    mounted() {
        this.layDataDanhMuc();
        this.layDataDanhLogin();
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

        layDataDanhMuc() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/danh-muc/data")
                .then((res) => {
                    this.list_danh_muc = res.data.data;
                })
        },

        changeTrangThai(value) {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/danh-muc/doi-trang-thai", value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.layDataDanhMuc();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        themMoiDanhMuc() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/danh-muc/create", this.create_danh_muc, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataDanhMuc();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        xoaDanhMuc() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/danh-muc/delete", this.del_danh_muc, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataDanhMuc();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        capnhatDanhMuc() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/danh-muc/update", this.edit_danh_muc, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataDanhMuc();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },

        taoSlugDM() {
            this.create_danh_muc.slug_danh_muc = this.toSluggg(this.create_danh_muc.ten_danh_muc)
            this.edit_danh_muc.slug_danh_muc = this.toSluggg(this.edit_danh_muc.ten_danh_muc)
        },
        toSluggg(title) {
            var slug = title.toLowerCase();
            //Đổi ký tự có dấu thành không dấu
            slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
            slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
            slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
            slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
            slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
            slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
            slug = slug.replace(/đ/gi, 'd');
            //Xóa các ký tự đặt biệt
            slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
            //Đổi khoảng trắng thành ký tự gạch ngang
            slug = slug.replace(/ /gi, "-");
            //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
            //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
            slug = slug.replace(/\-\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-\-/gi, '-');
            slug = slug.replace(/\-\-\-/gi, '-');
            slug = slug.replace(/\-\-/gi, '-');
            //Xóa các ký tự gạch ngang ở đầu và cuối
            slug = '@' + slug + '@';
            slug = slug.replace(/\@\-|\-\@|\@/gi, '');
            return slug;
        },
    },
}
</script>
<style></style>