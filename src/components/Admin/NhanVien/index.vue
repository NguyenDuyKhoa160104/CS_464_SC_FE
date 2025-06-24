<template>
    <div class="container">
        <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h4>Danh Sách Sản Phẩm</h4>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr class="align-middle">
                                <th scope="col">#</th>
                                <th scope="col">Họ Và Tên</th>
                                <th scope="col">Email</th>
                                <th scope="col">Số Điện Thoại</th>
                                <th scope="col">Hình Ảnh</th>   
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="align-middle">
                                <th scope="row">1</th>
                                <td>John</td>
                                <td>Doe</td>
                                <td>jhon@email.com</td>
                                <td>USA</td>
                                <td>
                                    <button type="button" class="btn btn-outline-success">Hoạt Động</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-outline-warning me-2">Cập Nhật</button>
                                    <button type="button" class="btn btn-outline-danger">Xóa</button>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>