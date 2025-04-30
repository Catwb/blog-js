// 获取数据展示容器
const dataContainer = document.getElementById('data-container');


// 自定义名称映射
const nameMapping = {
    today_uv: '今天独立访客数',
    today_pv: '今天页面浏览数',
    yesterday_uv: '昨天独立访客数',
    yesterday_pv: '昨天页面浏览数',
    last_month_pv: '上个月页面浏览数',
    last_year_pv: '去年页面浏览数'
};

// 定义一个函数，用来获取数据并展示
function fetchData() {
    fetch('https://umami-s.245179.xyz/', {
        method: 'GET',
        cache: 'no-store' // 禁用缓存，确保每次请求都从服务器获取最新数据
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('网络响应失败');
        }
        return response.json(); // 将响应转换为 JSON
    })
    .then(data => {
        // 清空数据展示容器
        dataContainer.innerHTML = '';

        // 遍历对象，提取名称和值并展示
        for (const [key, value] of Object.entries(data)) {
            // 使用自定义名称映射
            const displayName = nameMapping[key] || key; // 如果没有自定义名称，使用原始键
            const dataItem = document.createElement('div');
            dataItem.className = 'data-item';
            dataItem.textContent = `${displayName}: ${value}`; // 显示自定义名称和值
            dataContainer.appendChild(dataItem);
        }
    })
    .catch(error => {
        dataContainer.innerHTML = '获取数据失败: ' + error.message;
    });
}

// 页面加载时调用 fetchData 函数获取数据
window.onload = fetchData;
