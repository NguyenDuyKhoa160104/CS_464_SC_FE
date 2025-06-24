<template>
    <!-- Sidebar Start -->
    <div class="sidebar pe-4 pb-3">
        <nav class="navbar bg-light navbar-light">
            <a href="index.html" class="navbar-brand mx-4 mb-3">
                <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>DASHMIN</h3>
            </a>
            <div class="d-flex align-items-center ms-4 mb-4">
                <div class="position-relative">
                    <img class="rounded-circle" src="img/user.jpg" alt="" style="width: 40px; height: 40px;">
                    <div
                        class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1">
                    </div>
                </div>
                <div class="ms-3">
                    <h6 class="mb-0">Jhon Doe</h6>
                    <span>Admin</span>
                </div>
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
                <a :href="`/admin/hoa-don`" class="nav-item nav-link active"><i class="fas fa-file-invoice"></i>
                    Hóa Đơn</a>
            </div>
            <div class="navbar-nav w-100">
                <a :href="`/admin/danh-muc`" class="nav-item nav-link active"><i class="fa fa-list me-2"></i>
                    Danh Mục</a>
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
export default {

}
</script>
<style></style>