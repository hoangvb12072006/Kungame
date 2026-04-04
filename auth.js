// ==========================================
// 1. CẤU HÌNH FIREBASE (HOÀNG KUN)
// ==========================================
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
const auth = firebase.auth();

// ==========================================
// 2. ĐIỀU KHIỂN GIAO DIỆN FORM
// ==========================================
function openAuthModal() {
    document.getElementById('auth-modal').classList.add('show');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('show');
}

function switchAuthTab(tab) {
    const tabs = ['tab-login', 'tab-register'];
    const forms = ['form-login', 'form-register'];
    
    tabs.forEach(t => document.getElementById(t).classList.remove('active'));
    forms.forEach(f => document.getElementById(f).classList.remove('active'));
    forms.forEach(f => document.getElementById(f).style.display = 'none');

    if(tab === 'login') {
        document.getElementById('tab-login').classList.add('active');
        document.getElementById('form-login').style.display = 'block';
    } else {
        document.getElementById('tab-register').classList.add('active');
        document.getElementById('form-register').style.display = 'block';
    }
}

// ==========================================
// 3. XỬ LÝ SAU KHI ĐĂNG NHẬP THÀNH CÔNG
// ==========================================
function updateUIAfterLogin(name) {
    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn) {
        loginBtn.innerText = name;
        // Đổi lệnh onclick: Click vào tên thì hiện Menu tài khoản/Đăng xuất
        loginBtn.onclick = function() {
            if(confirm(`Chào ${name}! Bạn có muốn đăng xuất không?`)) {
                location.reload(); // Reload để reset trạng thái
            }
        };
    }
    
    // Đổi lệnh cho icon hình người luôn
    const userIconBtn = document.querySelector('.action-icon-btn i.fa-user')?.parentElement;
    if (userIconBtn) {
        userIconBtn.onclick = () => showFooterInfo('Tài khoản', `Hồ sơ của ${name} đang được cập nhật thêm tính năng! 😎`);
    }
}

// ==========================================
// 4. XỬ LÝ ĐĂNG KÝ / ĐĂNG NHẬP (FIREBASE)
// ==========================================
function submitRealAuth(type) {
    if (type === 'register') {
        const username = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-pass').value.trim();

        if (!username || !email || !password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        database.ref('users/' + username).set({
            email: email,
            password: password, 
            createdAt: new Date().toLocaleDateString()
        }).then(() => {
            alert(`🎉 Đăng ký thành công! Chào mừng ${username}. Hãy đăng nhập nhé!`);
            switchAuthTab('login');
        }).catch((e) => alert("Lỗi: " + e.message));
    } 
    
    else if (type === 'login') {
        const inputVal = document.getElementById('log-username').value.trim();
        const password = document.getElementById('log-pass').value.trim();

        if (!inputVal || !password) {
            alert("Vui lòng nhập tài khoản và mật khẩu!");
            return;
        }

        const isEmail = inputVal.includes('@');
        
        database.ref('users').once('value').then((snapshot) => {
            let userFound = null;
            snapshot.forEach((child) => {
                const data = child.val();
                if (isEmail ? data.email === inputVal : child.key === inputVal) {
                    userFound = { username: child.key, ...data };
                }
            });

            if (userFound) {
                if (userFound.password === password) {
                    closeAuthModal();
                    showFooterInfo('Thành công', `Chào mừng ${userFound.username} trở lại! 😎`);
                    updateUIAfterLogin(userFound.username);
                } else { alert("Sai mật khẩu rồi sếp ơi!"); }
            } else { alert("Tài khoản không tồn tại!"); }
        });
    }
}

// ==========================================
// 5. ĐĂNG NHẬP BẰNG GOOGLE
// ==========================================
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        const user = result.user;
        database.ref('users/' + user.uid).update({
            displayName: user.displayName,
            email: user.email,
            lastLogin: new Date().toLocaleString()
        });
        closeAuthModal();
        showFooterInfo('Thành công', `Chào ${user.displayName}! Bạn đã đăng nhập bằng Google. 🚀`);
        updateUIAfterLogin(user.displayName);
    }).catch((e) => alert("Lỗi Google: " + e.message));
}

// Tự động tắt modal khi nhấn vùng ngoài
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('auth-modal');
    if(modal) {
        modal.addEventListener('click', (e) => { if (e.target === modal) closeAuthModal(); });
    }
});
