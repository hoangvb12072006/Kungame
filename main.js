// Hàm mở màn hình chơi game
function playGame(url, title = 'Đang chơi...') {
    // 1. Ẩn phần trang chủ đi
    document.getElementById('home-section').style.display = 'none';
    
    // 2. Hiện khu vực chơi game lên
    document.getElementById('player-section').style.display = 'block';
    
    // 3. Nạp link game vào khung iframe
    document.getElementById('gameFrame').src = url;
    
    // 4. Đổi tên game trên thanh công cụ
    document.getElementById('currentGameTitle').innerText = title;
    
    // 5. Tự động cuộn mượt lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hàm quay lại trang chủ (Thay cho closeGame cũ)
function goHome() {
    // 1. Hiện lại trang chủ
    document.getElementById('home-section').style.display = 'block';
    
    // 2. Ẩn khu vực chơi game đi
    document.getElementById('player-section').style.display = 'none';
    
    // 3. Xóa link game để dừng hẳn âm thanh khi đã thoát
    document.getElementById('gameFrame').src = '';
}

// Hàm phóng to toàn màn hình (Dành cho nút bấm mở rộng)
function openFullscreen() {
    let elem = document.getElementById("gameFrame");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}
