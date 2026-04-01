function playGame(url) {
    const overlay = document.getElementById('gameOverlay');
    const frame = document.getElementById('gameFrame');
    
    frame.src = url; // Gán link game vào iframe
    overlay.style.display = 'block';
}

function closeGame() {
    const overlay = document.getElementById('gameOverlay');
    const frame = document.getElementById('gameFrame');
    
    overlay.style.display = 'none';
    frame.src = ''; // Xóa link để dừng âm thanh game khi đóng
}
