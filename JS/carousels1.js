// 荣誉轮播图初始化
function initCarousels1() {
    const honorImages = [
        { 
            src: 'res/reward1.png', 
            title: '全国三维数字化创新设计大赛', 
            description: '北京赛区特等奖' 
        },
        { 
            src: 'res/reward2.png', 
            title: '元宇宙·3D/XR·AI大学生创新实践大赛', 
            description: '北京赛区特等奖' 
        },
        { 
            src: 'res/reward3.jpg', 
            title: '冯如杯竞赛', 
            description: '创意赛道一等奖一作' 
        },
        { 
            src: 'res/reward4.jpg', 
            title: '校级物理竞赛', 
            description: '三等奖' 
        },
        { 
            src: 'res/reward5.jpg', 
            title: '美国大学生数学建模大赛', 
            description: 'S奖' 
        }
    ];
    
    // 创建3D轮播
    create3DHonorCarousel('reward', honorImages);
}

// 创建3D荣誉轮播
function create3DHonorCarousel(sectionId, images) {
    const carouselContainer = document.querySelector(`#${sectionId} .carousel-container`);
    const carousel = document.querySelector(`#${sectionId} .carousel`);
    const pagination = document.querySelector(`#${sectionId} .pagination`);
    
    if (!carouselContainer || !carousel || !pagination) {
        console.error('轮播图容器元素未找到');
        return;
    }
    
    // 清空现有内容
    carousel.innerHTML = '';
    pagination.innerHTML = '';
    
    // 添加轮播项
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.setAttribute('data-index', index);
        
        // 创建图片元素而不是背景
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.title;
        img.onerror = function() {
            console.error(`图片加载失败: ${image.src}`);
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIxMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuMzVlbSI+5Zu+54KHIOWbvueJhzwvdGV4dD48L3N2Zz4=';
        };
        
        // 添加标题和描述
        const caption = document.createElement('div');
        caption.className = 'carousel-caption';
        caption.innerHTML = `
            <h3>${image.title}</h3>
            <p>${image.description}</p>
        `;
        
        item.appendChild(img);
        item.appendChild(caption);
        carousel.appendChild(item);
        
        // 添加点击事件
        item.addEventListener('click', () => {
            goToHonorSlide(index, sectionId, images);
        });
        
        // 添加分页点
        const dot = document.createElement('div');
        dot.className = 'pagination-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            goToHonorSlide(index, sectionId, images);
        });
        pagination.appendChild(dot);
    });
    
    // 初始化轮播位置
    updateHonorCarousel(0, sectionId, images.length);
}

// 更新荣誉轮播位置
function updateHonorCarousel(index, sectionId, totalItems) {
    const carousel = document.querySelector(`#${sectionId} .carousel`);
    const items = document.querySelectorAll(`#${sectionId} .carousel-item`);
    const dots = document.querySelectorAll(`#${sectionId} .pagination-dot`);
    
    if (!carousel || items.length === 0) {
        console.error('轮播图元素未找到');
        return;
    }
    
    // 应用3D变换效果
    items.forEach((item, i) => {
        let position = i - index;
        
        // 处理循环
        if (position > Math.floor(totalItems / 2)) {
            position -= totalItems;
        } else if (position < -Math.floor(totalItems / 2)) {
            position += totalItems;
        }
        
        // 计算偏移量、缩放和透明度
        const offset = position * 50; // 增加图片之间的间隔
        const scale = 1 - Math.abs(position) * 0.15; // 调整缩放比例
        const opacity = 1 - Math.abs(position) * 0.3; // 调整透明度
        const zIndex = totalItems - Math.abs(position); // z-index
        
        // 应用变换
        item.style.transform = `translateX(${offset}%) scale(${scale})`;
        item.style.opacity = opacity;
        item.style.zIndex = zIndex;
    });
    
    // 更新分页点状态
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    // 更新当前索引
    carousel.setAttribute('data-current', index);
}

// 跳转到指定荣誉幻灯片
function goToHonorSlide(index, sectionId, images) {
    updateHonorCarousel(index, sectionId, images.length);
}