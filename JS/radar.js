// 存储雷达图实例
const radarCharts = {};

// 初始化雷达图
function initRadarCharts() {
    // 编程语言雷达图
    createRadarChart('Radar1', {
        labels: ['Python', 'JavaScript', 'HTML', 'CSS', 'C语言', 'C++'],
        datasets: [
            {
                id: 'usage-1',
                label: '使用程度',
                data: [90, 70, 90, 90, 60, 80],
                backgroundColor: 'rgba(100, 220, 220, 0.15)',
                borderColor: '#64dcff',
                borderWidth: 1.5,
                pointBackgroundColor: '#64dcff',
                pointBorderColor: '#000'
            },
            {
                id: 'depth-1',
                label: '学习深度',
                data: [60, 50, 80, 80, 70, 60],
                backgroundColor: 'rgba(180, 120, 255, 0.15)',
                borderColor: '#b478ff',
                borderWidth: 1.5,
                pointBackgroundColor: '#b478ff',
                pointBorderColor: '#000'
            }
        ]
    });
    
    // 开发环境与框架雷达图
    createRadarChart('Radar2', {
        labels: ['Qt', 'PyQt', 'electron', 'VUE', 'Android Studio', 'DevEco Studio', 'HBuilder X', 'Axure RP', 'XD', 'VS Code', 'PyCharm'],
        datasets: [
            {
                id: 'usage-2',
                label: '使用程度',
                data: [75, 90, 35, 30, 70, 40, 20, 75, 70, 95, 95],
                backgroundColor: 'rgba(100, 220, 220, 0.15)',
                borderColor: '#64dcff',
                borderWidth: 1.5,
                pointBackgroundColor: '#64dcff',
                pointBorderColor: '#000'
            },
            {
                id: 'depth-2',
                label: '学习深度',
                data: [65, 75, 35, 45, 75, 65, 35, 90, 90, 80, 80],
                backgroundColor: 'rgba(180, 120, 255, 0.15)',
                borderColor: '#b478ff',
                borderWidth: 1.5,
                pointBackgroundColor: '#b478ff',
                pointBorderColor: '#000'
            }
        ]
    });
    
    // 3D软件雷达图
    createRadarChart('Radar3', {
        labels: ['solidworks', 'CAXA', 'CloudCompare', 'Blender', 'AutoCAD', 'ANSYS', 'Adams', 'Maya', '3dmax'],
        datasets: [
            {
                id: 'usage-3',
                label: '使用程度',
                data: [90, 90, 80, 90, 30, 60, 20, 40, 40],
                backgroundColor: 'rgba(255, 180, 70, 0.15)',
                borderColor: '#ffb446',
                borderWidth: 1.5,
                pointBackgroundColor: '#ffb446',
                pointBorderColor: '#000'
            },
            {
                id: 'depth-3',
                label: '学习深度',
                data: [85, 85, 90, 70, 70, 60, 25, 60, 60],
                backgroundColor: 'rgba(255, 100, 150, 0.15)',
                borderColor: '#ff6496',
                borderWidth: 1.5,
                pointBackgroundColor: '#ff6496',
                pointBorderColor: '#000'
            }
        ]
    });
    
    // 添加雷达图切换控制
    addRadarControls();
}

// 创建雷达图
function createRadarChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const radarId = canvasId.replace('Radar', '');
    
    radarCharts[radarId] = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
            elements: {
                line: {
                    borderWidth: 2
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#b0b0b0',
                        font: {
                            size: 11,
                            family: 'Arial'
                        }
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        display: false,
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    return radarCharts[radarId];
}

// 添加雷达图切换控制
function addRadarControls() {
    const radarCards = document.querySelectorAll('.radar-card');
    
    radarCards.forEach((card, index) => {
        const radarId = index + 1;
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'radar-controls';
        controlsDiv.style.marginTop = '15px';
        controlsDiv.style.display = 'flex';
        controlsDiv.style.justifyContent = 'center';
        controlsDiv.style.gap = '15px';
        
        controlsDiv.innerHTML = `
            <label style="display: flex; align-items: center; cursor: pointer;">
                <input type="checkbox" id="usage-${radarId}" checked data-type="usage" data-radar="${radarId}">
                <span style="margin-left: 5px; display: flex; align-items: center;">
                    <i class="dot" style="background: ${radarId === 3 ? '#ff9f40' : '#4bc0c0'}"></i> 使用程度
                </span>
            </label>
            <label style="display: flex; align-items: center; cursor: pointer;">
                <input type="checkbox" id="depth-${radarId}" checked data-type="depth" data-radar="${radarId}">
                <span style="margin-left: 5px; display: flex; align-items: center;">
                    <i class="dot" style="background: ${radarId === 3 ? '#ff6384' : '#9966ff'}"></i> 学习深度
                </span>
            </label>
        `;
        
        // 将控制元素添加到雷达图卡片中
        const canvas = card.querySelector('canvas');
        canvas.parentNode.insertBefore(controlsDiv, canvas.nextSibling);
        
        // 添加事件监听器
        const usageCheckbox = document.getElementById(`usage-${radarId}`);
        const depthCheckbox = document.getElementById(`depth-${radarId}`);
        
        usageCheckbox.addEventListener('change', function() {
            toggleRadarDataset(radarId, 'usage', this.checked);
        });
        
        depthCheckbox.addEventListener('change', function() {
            toggleRadarDataset(radarId, 'depth', this.checked);
        });
    });
}

// 切换雷达图数据集显示
function toggleRadarDataset(radarId, type, show) {
    const chart = radarCharts[radarId];
    if (!chart) return;
    
    const datasetIndex = chart.data.datasets.findIndex(ds => ds.id === `${type}-${radarId}`);
    
    if (datasetIndex !== -1) {
        chart.setDatasetVisibility(datasetIndex, show);
        chart.update();
    }
}