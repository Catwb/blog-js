// 发起fetch请求获取数据
fetch("https://umami-s.245179.xyz/")
    .then(response => response.json()) // 将响应转换为JSON格式
    .then(data => {
        // 定义数据映射关系
        const labels = {
            today_uv: "今日人数",
            today_pv: "今日访问",
            yesterday_uv: "昨日人数",
            yesterday_pv: "昨日访问",
            last_month_pv: "本月访问",
            last_year_pv: "本年访问"
        };

        // 获取页面中class为data-container的容器
        const container = document.querySelector(".data-container");
        if (container) {
            // 清空容器内容（可选）
            container.innerHTML = "";

            // 遍历JSON数据并添加到容器中
            for (const key in data) {
                if (data.hasOwnProperty(key) && labels[key]) {
                    // 创建HTML结构并插入数据
                    container.innerHTML += `
                        <div>
                            <span>${labels[key]}</span>
                            <span id="${key}">${data[key]}</span>
                        </div>
                    `;
                }
            }
        } else {
            console.error("未找到class为data-container的容器");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    })