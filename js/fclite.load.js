if (typeof UserConfig === 'undefined') {
    var UserConfig = {
        // 填写你的fc Lite地址
        private_api_url: 'https://fc.245179.xyz/',
        // 点击加载更多时，一次最多加载几篇文章，默认20
        page_turning_number: 20,
        // 头像加载失败时，默认头像地址
        error_img: 'https://s2.loli.net/2025/02/23/lszTyFk2JNEvDH7.jpg',
    }
}

// 检测是否支持Pjax
if (typeof Pjax !== 'undefined') {
    // 监听Pjax完成事件
    document.addEventListener('pjax:complete', function() {
        // 在这里初始化或加载fclite.load.js的功能
        initFCL();
    });
} else {
    // 如果不支持Pjax，则直接初始化
    initFCL();
}

// 定义初始化函数
function initFCL() {
    console.log('Initializing fclite.load.js');
    // 在这里添加fclite.load.js的初始化代码
    // 例如，加载数据、绑定事件等

    // 示例：加载数据时避免缓存
    loadFCData();
}

// 示例：加载数据的函数
function loadFCData() {
    // 获取API URL
    const apiUrl = UserConfig.private_api_url;

    // 发起请求时设置请求头，确保不使用缓存
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-store'  // 明确指示不使用缓存
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data loaded:', data);
        // 在这里处理加载的数据
    })
    .catch(error => {
        console.error('Error loading data:', error);
    });
}