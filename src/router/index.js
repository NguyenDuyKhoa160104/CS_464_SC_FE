import { createRouter, createWebHistory } from "vue-router"; 

const routes = [
    {
        path: '/admin/danh-muc',
        component: () => import('../components/Admin/DanhMuc/index.vue'),
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
        path: '/admin/dich-vu',
        component: () => import('../components/Admin/DichVu/index.vue'),
    },

    {
        path: '/admin/hoa-don',
        component: () => import('../components/Admin/HoaDon/index.vue'),
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