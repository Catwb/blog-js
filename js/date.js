// 配置项
const config = {
    types: ['day', 'week', 'month', 'year'], // 默认显示所有类型
    colorMap: {
        'day': '#B5EAD7',
        'week': '#FFDAC1',
        'month': '#E2F0CB',
        'year': '#FFB7B2'
    }
};

// 更新倒计时显示
function updateCountdown() {
    const now = new Date();
    
    config.types.forEach(type => {
        let elapsed = 0;
        let total = 0;
        let text = "";

        switch (type) {
            case "day":
                elapsed = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
                total = 24 * 3600;
                text = `今天已过去 ${Math.floor(elapsed / 3600)} 小时 ${Math.floor((elapsed % 3600) / 60)} 分钟`;
                break;
            case "week":
                elapsed = (now.getDay() * 24 * 3600) + (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
                total = 7 * 24 * 3600;
                text = `本周已过去 ${Math.floor(elapsed / (24 * 3600))} 天 ${Math.floor((elapsed % (24 * 3600)) / 3600)} 小时 ${Math.floor((elapsed % 3600) / 60)} 分钟`;
                break;
            case "month":
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const daysInMonth = new Date(year, month, 0).getDate();
                elapsed = ((now.getDate() - 1) * 24 * 3600) + (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
                total = daysInMonth * 24 * 3600;
                text = `本月已过去 ${Math.floor(elapsed / (24 * 3600))} 天 ${Math.floor((elapsed % (24 * 3600)) / 3600)} 小时 ${Math.floor((elapsed % 3600) / 60)} 分钟`;
                break;
            case "year":
                const startOfYear = new Date(now.getFullYear(), 0, 1);
                const diff = now - startOfYear;
                elapsed = Math.floor(diff / 1000);
                const isLeapYear = (new Date(now.getFullYear(), 1, 29).getDate() === 29);
                total = (isLeapYear ? 366 : 365) * 24 * 3600;
                text = `今年已过去 ${Math.floor(elapsed / (24 * 3600))} 天 ${Math.floor((elapsed % (24 * 3600)) / 3600)} 小时 ${Math.floor((elapsed % 3600) / 60)} 分钟`;
                break;
        }

        const percentage = Math.round((elapsed / total) * 100);
        const item = document.getElementById(`countdown-${type}`);
        if (item) {
            const textElement = item.querySelector(".countdown-text");
            const percentageElement = item.querySelector(".countdown-percentage");
            const progressBarElement = item.querySelector(".progress-bar-fill");

            textElement.textContent = text;
            percentageElement.textContent = `${percentage}%`;
            progressBarElement.style.width = `${percentage}%`;
            progressBarElement.style.backgroundColor = config.colorMap[type];
        }
    });
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
    // 可以根据需要动态隐藏某些类型的倒计时
    // 例如，如果只想显示day和week:
    // config.types = ['day', 'week'];
    
    updateCountdown();
    setInterval(updateCountdown, 1000 * 60); // 每分钟更新一次
});

