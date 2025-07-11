<template>
    <!-- Danh sách hóa đơn -->
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h4>Danh Sách Hóa Đơn</h4>
            <button class="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target="#modalHoaDon">
                Tạo Mới Hóa Đơn
            </button>
        </div>
        <div class="card-body table-responsive">
            <table class="table text-center align-middle">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Mã Hóa Đơn</th>
                        <th>Tên Khách Hàng</th>
                        <th>Số Điện Thoại</th>
                        <th>Tổng Tiền</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(value, index) in list_hoa_don" :key="index">
                        <tr>
                            <td>{{ index + 1 }}</td>
                            <td>{{ value.ma_hoa_don }}</td>
                            <td>{{ value.ten_khach_hang }}</td>
                            <td>{{ value.so_dien_thoai }}</td>
                            <td>{{ formatToVND(value.tong_tien) }}</td>
                            <td>
                                <button v-on:click="changeTrangThai(value)" v-if="value.tinh_trang == 1"
                                    class="btn btn-success rounded-pill">Hoạt
                                    động</button>
                                <button v-on:click="changeTrangThai(value)" v-else
                                    class="btn btn-secondary rounded-pill">Tạm khóa</button>
                            </td>
                            <td>
                                <button v-on:click="thong_tin = value" class="btn btn-info rounded-pill"
                                    data-bs-toggle="modal" data-bs-target="#modalChiTietHoaDon">Chi
                                    Tiết</button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal tạo mới hóa đơn -->
    <div class="modal fade" id="modalHoaDon" tabindex="-1">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tạo Mới Hóa Đơn</h5>
                    <button class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">
                    <!-- Thông tin hóa đơn -->
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label>Tên Khách Hàng</label>
                            <input class="form-control" v-model="create_hoa_don.ten_khach_hang" />
                        </div>
                        <div class="col-md-6">
                            <label>Số Điện Thoại</label>
                            <input class="form-control" v-model="create_hoa_don.so_dien_thoai" />
                        </div>
                    </div>

                    <!-- Nhập sản phẩm -->
                    <div class="border rounded p-3 mb-3">
                        <h6>Chi Tiết Sản Phẩm</h6>
                        <div class="row gy-2 align-items-end">
                            <div class="col-md-4">
                                <select v-model="new_san_pham.id_san_pham" class="form-control">
                                    <template v-for="(value, index) in list_san_pham_open" :key="index">
                                        <option :value="Number(value.id)">{{ value.ten_san_pham }}</option>
                                    </template>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <input class="form-control" type="number" placeholder="Số lượng"
                                    v-model.number="new_san_pham.so_luong" />
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-success w-100" v-on:click="themSanPham()">Thêm</button>
                            </div>
                        </div>
                    </div>

                    <!-- Bảng sản phẩm -->
                    <div v-if="create_hoa_don.chi_tiet.length">
                        <table class="table table-bordered">
                            <thead class="text-center">
                                <tr>
                                    <th>#</th>
                                    <th>Tên Sản Phẩm</th>
                                    <th>Số Lượng</th>
                                    <th>Đơn Giá</th>
                                    <th>Thành Tiền</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(sp, index) in create_hoa_don.chi_tiet" :key="index">
                                    <tr class="text-center align-middle">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ numberToString(sp.id_san_pham) }}</td>
                                        <td>{{ sp.so_luong }}</td>
                                        <td>{{ sp.don_gia.toLocaleString() }}₫</td>
                                        <td>{{ sp.thanh_tien.toLocaleString() }}₫</td>
                                        <td>
                                            <button class="btn btn-sm btn-danger" v-on:click="xoaSanPham(index)"><i
                                                    class="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>

                    <!-- Tổng tiền -->
                    <div class="text-end fw-bold fs-5">Tổng tiền: {{ create_hoa_don.tong_tien.toLocaleString() }}₫
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="themMoiHoaDon()" class="btn btn-primary" data-bs-dismiss="modal">Xác
                        Nhận</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Chi Tiết Hóa Đơn - QR Góc Phải Trên -->
    <div class="modal fade" id="modalChiTietHoaDon" tabindex="-1">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header justify-content-between">
                    <h5 class="modal-title">Chi Tiết Hóa Đơn</h5>
                </div>
                <div class="modal-body">
                    <!-- Thông tin hóa đơn -->
                    <div class="row mb-3">
                        <div class="col-md-3">
                            <label><strong>Mã Hóa Đơn:</strong></label>
                            <p>{{ thong_tin.ma_hoa_don }}</p>
                        </div>
                        <div class="col-md-3">
                            <label><strong>Tên Khách Hàng:</strong></label>
                            <p>{{ thong_tin.ten_khach_hang }}</p>
                        </div>
                        <div class="col-md-3">
                            <label><strong>Số Điện Thoại:</strong></label>
                            <p>{{ thong_tin.so_dien_thoai }}</p>
                        </div>
                        <div class="col-md-3">
                            <label><strong>Trạng Thái:</strong></label>
                            <p v-if="thong_tin.tinh_trang == 1" class="text-success">Hoạt động</p>
                            <p v-else class="text-secondary">Tạm khóa</p>
                        </div>
                    </div>
                    <!-- Bảng sản phẩm -->
                    <table class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Số Lượng</th>
                                <th>Đơn Giá</th>
                                <th>Thành Tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(sp, index) in thong_tin.chi_tiet" :key="index">
                                <tr>
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ numberToString(sp.id_san_pham) }}</td>
                                    <td>{{ sp.so_luong }}</td>
                                    <td>{{ formatToVND(sp.don_gia) }}</td>
                                    <td>{{ formatToVND(sp.don_gia * sp.so_luong) }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                    <!-- Tổng tiền -->
                    <h4 class="text-end"><b>{{ formatToVND(Number(thong_tin.tong_tien)) }}</b></h4>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary rounded-pill" data-bs-dismiss="modal">Đóng</button>
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
            thong_tin: [],
            list_hoa_don: [],
            list_san_pham_open: [],
            create_hoa_don: {
                ma_hoa_don: '',
                ten_khach_hang: '',
                so_dien_thoai: '',
                tong_tien: 0,
                status: 1,
                chi_tiet: []
            },
            new_san_pham: {
                id_san_pham: 0,
                so_luong: 1,
                don_gia: 0
            }
        };
    },
    mounted() {
        this.layDataSanPhamOpen();
        this.layDataHoaDon();
    },
    methods: {
        layDataHoaDon() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/hoa-don/data")
                .then((res) => {
                    this.list_hoa_don = res.data.data;
                })
        },
        themMoiHoaDon() {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/hoa-don/create", this.create_hoa_don, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.success(thong_bao);
                        this.layDataHoaDon();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        changeTrangThai(value) {
            axios
                .post("http://127.0.0.1:8000/api/nhan-vien/hoa-don/doi-tinh-trang", value, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_nhan_vien")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.layDataHoaDon();
                    } else {
                        var thong_bao = '<b>Thông báo</b><span style="margin-top: 5px">' + res.data.message + '<span>';
                        this.$toast.error(thong_bao);
                    }
                })
        },
        themSanPham() {
            const sp = this.new_san_pham;
            const sanPhamTimThay = this.list_san_pham_open.find(item => item.id === sp.id_san_pham);
            sp.don_gia = sanPhamTimThay.gia_san_pham;
            if (sp.id_san_pham && sp.so_luong > 0 && sp.don_gia > 0) {
                const thanhTien = sp.so_luong * sp.don_gia;
                this.create_hoa_don.chi_tiet.push({ ...sp, thanh_tien: thanhTien });
                this.tinhTongTien();
                this.new_san_pham = { id_san_pham: 0, so_luong: 1, don_gia: 0 };
            }
            console.log(new_san_pham)
        },
        xoaSanPham(index) {
            this.create_hoa_don.chi_tiet.splice(index, 1);
            this.tinhTongTien();
        },
        tinhTongTien() {
            this.create_hoa_don.tong_tien = this.create_hoa_don.chi_tiet.reduce(
                (sum, sp) => sum + sp.thanh_tien, 0
            );
        },
        layDataSanPhamOpen() {
            axios
                .get("http://127.0.0.1:8000/api/nhan-vien/san-pham/data-open")
                .then((res) => {
                    this.list_san_pham_open = res.data.data;
                })
        },
        numberToString(num) {
            const sanpham = this.list_san_pham_open.find(item => item.id === num);
            return sanpham ? sanpham.ten_san_pham : "Sản phẩm không xác định";
        },
        formatToVND(value) {
            return value.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            });
        }
    }
};
</script>

<style scoped>
th,
td {
    vertical-align: middle;
}
</style>
