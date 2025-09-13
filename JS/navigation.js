// 初始化导航功能
function initNavigation() {
    const navItems = document.querySelectorAll('.sidebar ul li');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有活动状态
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
        });
    });
}

// 显示指定内容区域
function showSection(sectionId) {
    // 隐藏所有内容区域
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // 显示指定内容区域
    document.getElementById(sectionId).classList.add('active');
}