// 安全机制 - 防止右键菜单和开发者工具
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 禁用F12和Ctrl+Shift+I
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.shiftKey && e.key === 'C') || 
        (e.ctrlKey && e.shiftKey && e.key === 'J') || 
        (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
    }
});

// 严格的访问控制
if (sessionStorage.getItem('authenticated') !== 'true' || 
    document.referrer.indexOf(window.location.origin) === -1) {
    window.location.href = 'Password.html';
}

// 防止后退按钮绕过
window.onpageshow = function(event) {
    if (event.persisted || 
        (window.performance && window.performance.navigation.type === 2)) {
        if (sessionStorage.getItem('authenticated') !== 'true') {
            window.location.href = 'Password.html';
        }
    }
};
