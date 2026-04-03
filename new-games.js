function displayNewGames() {
    const grid = document.getElementById('new-grid');
    if (!grid) return;
    grid.innerHTML = '';

    // Lọc ra các game có tag 'NEW' hoặc ông có thể chọn 10 game cuối cùng trong danh sách
    const allGameTitles = Object.keys(gameData);
    
    // Cách 1: Lấy 10 game cuối cùng ông vừa thêm vào code
    const newTitles = allGameTitles.slice(-10).reverse(); 

    newTitles.forEach(title => {
        const info = gameData[title];
        if (info) {
            const gameUrl = info.url || `https://play.famobi.com/wrapper/${title.toLowerCase().replace(/\s+/g, '-')}/A1000-10`;
            
            grid.innerHTML += `
                <div class="hero-card" onclick="playGame('${gameUrl}', '${title}')">
                    <div class="badge" style="background: linear-gradient(90deg,#c93dd1,#8a4fff); color: #fff">NEW</div>
                    <img src="${info.img}">
                    <div class="game-title-overlay">${title}</div>
                </div>
            `;
        }
    });
}
