// Hàm lưu game vào danh sách gần đây
function addToRecent(title) {
    let recentGames = JSON.parse(localStorage.getItem('recentGames')) || [];

    // 1. Nếu game đã có trong danh sách, xóa nó đi để tý nữa đưa lên đầu
    recentGames = recentGames.filter(game => game !== title);

    // 2. Thêm game mới vào ĐẦU mảng (thứ tự từ trên xuống)
    recentGames.unshift(title);

    // 3. Chỉ giữ lại tối đa 12 game cho gọn (tùy ông chỉnh)
    if (recentGames.length > 12) {
        recentGames.pop();
    }

    // 4. Lưu lại vào localStorage
    localStorage.setItem('recentGames', JSON.stringify(recentGames));
}

// Hàm hiển thị danh sách game gần đây ra màn hình
function displayRecentGames() {
    const recentGames = JSON.parse(localStorage.getItem('recentGames')) || [];
    const container = document.getElementById('recent-grid'); // Cần thêm ID này vào HTML
    
    if (!container) return;
    
    if (recentGames.length === 0) {
        container.innerHTML = '<p style="color: var(--white-30); padding: 20px;">Bạn chưa chơi game nào gần đây.</p>';
        return;
    }

    container.innerHTML = ''; // Xóa nội dung cũ

    recentGames.forEach(title => {
        const info = gameData[title];
        if (info) {
            // Tạo thẻ game giống hệt cấu trúc của ông
            const gameCard = `
                <div class="card" onclick="playGame('${info.url || '#'}', '${title}')">
                    <img src="${info.img}" alt="${title}">
                    <div class="game-title-overlay" style="font-size: 13px; padding: 10px;">${title}</div>
                </div>
            `;
            container.innerHTML += gameCard;
        }
    });
}
