// 1. Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBah5iEPTSOfavvq7g2e6mvRErSxTpztQw",
    authDomain: "kungame-470cd.firebaseapp.com",
    databaseURL: "https://kungame-470cd-default-rtdb.firebaseio.com",
    projectId: "kungame-470cd",
    storageBucket: "kungame-470cd.firebasestorage.app",
    messagingSenderId: "182979822424",
    appId: "1:182979822424:web:56fffd7a1ec060a6059b2d",
    measurementId: "G-BSCWYQB0Y3"
};

// Khởi tạo Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// 2. Các hàm điều khiển giao diện Form
function openAuthModal() {
    document.getElementById('auth-modal').classList.add('show');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('show');
}

function switchAuthTab(tab) {
    document.getElementById('tab-login').classList.remove('active');
    document.getElementById('tab-register').classList.remove('active');
    document.getElementById('form-login').style.display = 'none';
    document.getElementById('form-register').style.display = 'none';
    
    if(tab === 'login') {
        document.getElementById('tab-login').classList.add('active');
        document.getElementById('form-login').style.display = 'block';
    } else {
        document.getElementById('tab-register').classList.add('active');
        document.getElementById('form-register').style.display = 'block';
    }
}

// Bấm ra vùng đen bên ngoài thì tự tắt form
document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('auth-modal');
    if(authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === this) closeAuthModal();
        });
    }
});

// 3. Hàm Xử lý Đăng ký / Đăng nhập thật lên Firebase
function submitRealAuth(type) {
    if (type === 'register') {
        const username = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-pass').value.trim();

        if (!username || !email || !password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        // Đẩy dữ liệu lên bảng 'users' trong Firebase
        database.ref('users/' + username).set({
            email: email,
            password: password, 
            createdAt: new Date().toLocaleDateString()
        }).then(() => {
            alert(`🎉 Đăng ký thành công! Chào mừng ${username}. Hãy đăng nhập nhé!`);
            switchAuthTab('login'); // Chuyển qua tab đăng nhập
            
            // Xóa rỗng các ô nhập liệu
            document.getElementById('reg-username').value = '';
            document.getElementById('reg-email').value = '';
            document.getElementById('reg-pass').value = '';
        }).catch((error) => {
            alert("Lỗi rồi: " + error.message);
        });
    } 
    
    else if (type === 'login') {
        const username = document.getElementById('log-username').value.trim();
        const password = document.getElementById('log-pass').value.trim();

        if (!username || !password) {
            alert("Vui lòng nhập tài khoản và mật khẩu!");
            return;
        }

        // Tìm user trong Firebase
        database.ref('users/' + username).once('value').then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                if (userData.password === password) {
                    closeAuthModal(); // Đóng form
                    
                    // Hiện thông báo (nếu ông có hàm showFooterInfo ở file index)
                    if(typeof showFooterInfo === 'function') {
                        showFooterInfo('Thành công', `Chào mừng ${username} trở lại Kun Game Center! 😎`);
                    } else {
                        alert(`Chào mừng ${username} trở lại!`);
                    }
                    
                    // Cập nhật giao diện: Đổi chữ "Đăng nhập" thành tên User
                    const loginBtn = document.querySelector('.login-btn');
                    if (loginBtn) loginBtn.innerText = username;
                    
                } else {
                    alert("Sai mật khẩu rồi bạn ơi!");
                }
            } else {
                alert("Tài khoản này chưa được đăng ký!");
            }
        }).catch((error) => {
            alert("Lỗi kết nối: " + error.message);
        });
    }
}
