import { createRouter, createWebHistory } from "vue-router"; 
import kiemTraAdmin from "./kiemTraAdmin";

const routes = [
    {
        path: '/admin/danh-muc',
        component: () => import('../components/Admin/DanhMuc/index.vue'),
    },

    {
        path: '/admin/profile',
        component: () => import('../components/Admin/Profile/index.vue'),
    },

    {
        path: '/admin/dang-ky',
        component: () => import('../components/Admin/DangKy/index.vue'),
        meta: { layout: 'blank' },
    },

    {
        path: '/admin/san-pham',
        component: () => import('../components/Admin/SanPham/index.vue'),
    },

    {
        path: '/admin/nhan-vien',
        component: () => import('../components/Admin/NhanVien/index.vue'),
    },

    {
        path: '/admin/khach-hang',
        component: () => import('../components/Admin/KhachHang/index.vue'),
    },

    {
        path: '/admin/dich-vu',
        component: () => import('../components/Admin/DichVu/index.vue'),
    },

    {
        path: '/admin/hoa-don',
        component: () => import('../components/Admin/HoaDon/index.vue'),
    },

    {
        path: '/admin/dang-nhap',
        component: () => import('../components/Admin/DangNhap/index.vue'),
        meta: { layout: 'blank' },
    },

    {
        path: '/',
        component: () => import('../components/Admin/TrangChu/index.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;