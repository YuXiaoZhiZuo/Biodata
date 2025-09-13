// 初始化项目轮播
function initCarousels2() {
    // 机械类项目
    const mechanicalProjects = [
        { 
            src: 'res/spider.gif', 
            title: '3D打印月球车', 
            description: '使用SolidWorks设计的月球车模型，具备完整的移动系统和科学仪器安装平台。',
            link: null
        },
        { 
            src: 'res/p1.png', 
            title: '核酸采样机器人', 
            description: '概念设计与建模，具备自动化采样功能。',
            link: null
        },
        { 
            src: 'res/p2.jpg', 
            title: '祈年印', 
            description: '3D设计与打印的文化创意作品。',
            link: 'https://3dshow.3ddl.net/app/fnpprt'
        },
        { 
            src: 'res/p3.png', 
            title: '机关塔之许仙的梦境', 
            description: '复杂机械结构设计与实现。',
            link: null
        }
    ];
    
    // 软件类项目
    const softwareProjects = [
        { 
            src: 'res/GDCTFAM.gif', 
            title: '增材制造几何偏差补偿助手', 
            description: '使用PyQt开发的增材制造几何偏差补偿软件。',
            link: null
        },
        { 
            src: 'res/dianyun.gif', 
            title: '扫描点云数据处理器', 
            description: '使用PyQt开发的点云数据处理工具。',
            link: null
        },
        { 
            src: 'res/Android.gif', 
            title: '齿轮参数优化工具', 
            description: 'Android开发的齿轮参数优化手机APP。',
            link: null
        },
        { 
            src: 'res/caipu.gif', 
            title: '专属菜谱生成器', 
            description: '前端界面设计与实现。',
            link: null
        },
        { 
            src: 'res/g1.gif', 
            title: 'Axure RP原型设计', 
            description: '使用Axure RP制作的UI原型设计。',
            link: null
        }
    ];
    
    // 其他类项目
    const otherProjects = [
        { 
            src: 'res/p4.png', 
            title: '星垣幻行', 
            description: '元宇宙多维智能派送系统设计与实现。',
            link: 'https://3dshow.3ddl.net/app/fnttfd'
        },
        { 
            src: 'res/p5.png', 
            title: '数学建模', 
            description: '数学建模流程图与解决方案。',
            link: null
        },
        { 
            src: 'res/p6.png', 
            title: '美赛绘图', 
            description: '美国大学生数学建模大赛绘图作品。',
            link: null
        },
        { 
            src: 'res/g2.gif', 
            title: 'Blender渲染', 
            description: '花盘轴零件的Blender渲染效果。',
            link: null
        },
        { 
            src: 'res/g3.gif', 
            title: 'ANSYS模拟', 
            description: '小齿轮轴受力分析的ANSYS模拟。',
            link: null
        },
        { 
            src: 'res/blender.gif', 
            title: 'Blender动画', 
            description: '使用Blender制作的小动画。',
            link: null
        },
        { 
            src: 'res/gongzhong.jpg', 
            title: '个人公众号', 
            description: '运营个人公众号【玉箫制作】。',
            link: 'https://mp.weixin.qq.com/s/Nx-OwC62tOH4pr0ypwujVw'
        }
    ];
    
    // 创建项目轮播
    createProjectCarousel('mechanical', mechanicalProjects);
    createProjectCarousel('software', softwareProjects);
    createProjectCarousel('other', otherProjects);
}

// 创建项目轮播
function createProjectCarousel(className, projects) {
    const carouselContainer = document.querySelector(`.project-carousel.${className} .carousel-container`);
    const carousel = document.querySelector(`.project-carousel.${className} .carousel`);
    const pagination = document.querySelector(`.project-carousel.${className} .pagination`);
    const description = document.querySelector(`.project-carousel.${className} .project-description`);
    
    if (!carouselContainer || !carousel || !pagination || !description) return;
    
    // 清空现有内容
    carousel.innerHTML = '';
    pagination.innerHTML = '';
    
    // 添加轮播项
    projects.forEach((project, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.setAttribute('data-index', index);
        
        // 创建图片元素
        const img = document.createElement('img');
        img.src = project.src;
        img.alt = project.title;
        
        item.appendChild(img);
        carousel.appendChild(item);
        
        // 添加点击事件
        item.addEventListener('click', () => {
            goToProjectSlide(index, className, projects);
        });
        
        // 添加分页点
        const dot = document.createElement('div');
        dot.className = 'pagination-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToProjectSlide(index, className, projects));
        pagination.appendChild(dot);
    });
    
    // 初始化描述
    updateProjectDescription(0, className, projects);
    
    // 初始化轮播位置
    updateProjectCarousel(0, className, projects.length);
}

// 更新项目轮播位置
function updateProjectCarousel(index, className, totalItems) {
    const carousel = document.querySelector(`.project-carousel.${className} .carousel`);
    const items = document.querySelectorAll(`.project-carousel.${className} .carousel-item`);
    const dots = document.querySelectorAll(`.project-carousel.${className} .pagination-dot`);
    
    if (!carousel || items.length === 0) return;
    
    // 应用3D变换效果
    items.forEach((item, i) => {
        let position = i - index;
        
        // 处理循环
        if (position > totalItems / 2) {
            position -= totalItems;
        } else if (position < -totalItems / 2) {
            position += totalItems;
        }
        
        // 计算偏移量、缩放和透明度
        const offset = position * 50; // 图片之间的间隔
        const scale = 1 - Math.abs(position) * 0.25; // 缩放比例
        const opacity = 1 - Math.abs(position) * 0.3; // 透明度
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
}

// 更新项目描述
function updateProjectDescription(index, className, projects) {
    const description = document.querySelector(`.project-carousel.${className} .project-description`);
    if (!description || index >= projects.length) return;
    
    const project = projects[index];
    
    description.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">查看详情</a>` : ''}
    `;
}

// 跳转到指定项目幻灯片
function goToProjectSlide(index, className, projects) {
    updateProjectCarousel(index, className, projects.length);
    updateProjectDescription(index, className, projects);
}