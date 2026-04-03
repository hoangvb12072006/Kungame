document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-list li');
    const homeSection = document.getElementById('home-section');
    const recentSection = document.getElementById('recent-section');
    const heroGrid = document.querySelector('.hero-grid');
    const categorySlider = document.querySelector('.category-slider');
    const sectionTitle = document.querySelector('h2');

    // Hàm reset hiển thị về trạng thái ban đầu
    function showAllSections() {
        homeSection.style.display = 'block';
        if (recentSection) recentSection.style.display = 'none';
        categorySlider.style.display = 'flex';
        heroGrid.style.display = 'grid';
        sectionTitle.innerText = "Lựa chọn hàng đầu dành cho bạn";
        
        // Hiện lại tất cả các card game
        const allCards = document.querySelectorAll('.hero-card');
        allCards.forEach(card => card.style.display = 'block');
    }

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Hiệu ứng đổi màu menu active
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            const menuId = this.id;
            const category = this.getAttribute('data-cat') || this.querySelector('span').innerText;

            // 1. Xử lý khi nhấn "Trang chủ"
            if (menuId === 'menu-home') {
                showAllSections();
            } 
            
            // 2. Xử lý khi nhấn "Gần đây"
            else if (menuId === 'menu-recent') {
                homeSection.style.display = 'block'; // Vẫn nằm trong home nhưng ẩn các phần khác
                categorySlider.style.display = 'none';
                heroGrid.style.display = 'none';
                if (recentSection) {
                    recentSection.style.display = 'block';
                    // Gọi hàm từ file recent-games.js
                    if (typeof displayRecentGames === "function") displayRecentGames();
                }
            }

            // 3. Xử lý lọc theo thể loại (Đua xe, Bắn súng...)
            else {
                showAllSections(); // Đưa về trang chủ trước khi lọc
                if (recentSection) recentSection.style.display = 'none';
                categorySlider.style.display = 'none'; // Ẩn slider cho gọn
                sectionTitle.innerText = `Kết quả cho: ${category}`;

                const allCards = document.querySelectorAll('.hero-card');
                allCards.forEach(card => {
                    const gameTitle = card.querySelector('.game-title-overlay').innerText;
                    const gameInfo = gameData[gameTitle];

                    // Kiểm tra xem tag của game có khớp với danh mục không
                    if (gameInfo && gameInfo.tags.includes(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
            
            // Cuộn lên đầu trang sau khi chọn menu
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});

// Thêm vào trong sidebar.js
const menuNew = document.getElementById('menu-new');

menuNew.addEventListener('click', function() {
    // Ẩn các phần khác
    document.querySelector('.category-slider').style.display = 'none';
    document.querySelector('.hero-grid').style.display = 'none';
    document.getElementById('recent-section').style.display = 'none';
    
    // Hiện phần game mới
    document.getElementById('new-section').style.display = 'block';
    document.querySelector('h2').style.display = 'none'; // Ẩn tiêu đề cũ

    // Chạy hàm hiển thị game mới
    displayNewGames();
    
    // Active menu
    menuItems.forEach(i => i.classList.remove('active'));
    this.classList.add('active');
});
