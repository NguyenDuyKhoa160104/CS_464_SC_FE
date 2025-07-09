<template>
    <div class="signup-container">
        <form class="signup-form">
            <img src="" alt="Logo" class="logo" />
            <h2>Tạo tài khoản</h2>

            <div class="social-icons">
                <button type="button" class="icon-btn fb" title="Đăng ký với Facebook">
                    <i class="fab fa-facebook-f"></i>
                </button>
                <button type="button" class="icon-btn gg" title="Đăng ký với Google">
                    <i class="fab fa-google"></i>
                </button>
            </div>

            <div class="divider">Hoặc</div>

            <input type="text" placeholder="Họ và tên" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Mật khẩu" required />
            <input type="password" placeholder="Nhập lại mật khẩu" required />

            <button type="submit" class="btn submit">Đăng ký</button>
            <p class="redirect-text">Đã có tài khoản? <a href="#">Đăng nhập</a></p>
        </form>
    </div>
</template>
<script>
export default {

}
</script>
<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', sans-serif;
}

body {
    background: linear-gradient(to right, #4facfe, #00f2fe);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.signup-container {
    background: #fff;
    padding: 40px 32px;
    border-radius: 12px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 420px;
}

.logo {
    display: block;
    margin: 0 auto 16px;
    height: 60px;
}

.signup-form h2 {
    text-align: center;
    margin-bottom: 24px;
    color: #333;
}

.social-icons {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 20px;
}

.icon-btn {
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.2s ease;
    color: white;
}

.icon-btn.fb {
    background-color: #3b5998;
}

.icon-btn.fb:hover {
    background-color: #2d4373;
}

.icon-btn.gg {
    background-color: #db4437;
}

.icon-btn.gg:hover {
    background-color: #c23321;
}

.divider {
    text-align: center;
    margin: 16px 0;
    color: #777;
}

input {
    width: 100%;
    padding: 12px;
    margin-bottom: 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
}

.btn.submit {
    width: 100%;
    padding: 12px;
    background: #4facfe;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
}

.btn.submit:hover {
    background: #00c6ff;
}

.redirect-text {
    text-align: center;
    margin-top: 16px;
}

.redirect-text a {
    text-decoration: none;
    color: #4facfe;
}
</style>