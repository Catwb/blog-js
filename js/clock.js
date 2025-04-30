// 定义HTML结构
document.write(`
    <div class="display-section">
        <div class="section-title">当前时间</div>
        <div class="date-display-container">
            <div class="display-item">
                <div class="display-value" id="year"></div>
                <div class="display-label">年</div>
            </div>
            <div class="display-item">
                <div class="display-value" id="month"></div>
                <div class="display-label">月</div>
            </div>
            <div class="display-item">
                <div class="display-value" id="date"></div>
                <div class="display-label">日</div>
            </div>
        </div>
        <div class="display" id="clock-display">
            <div class="display-item">
                <div class="display-value" id="hours"></div>
                <div class="display-label">时</div>
            </div>
            <div class="display-item">
                <div class="display-value" id="minutes"></div>
                <div class="display-label">分</div>
            </div>
            <div class="display-item">
                <div class="display-value" id="seconds"></div>
                <div class="display-label">秒</div>
            </div>
            <div class="display-item">
                <div class="display-value" id="day"></div>
                <div class="display-label">星期</div>
            </div>
        </div>
    </div>
    
    <div class="display-section">
        <div class="section-title" id="holiday-name"></div>
        <div class="display" id="countdown-display">
            <div class="display-item">
                <div class="display-value" id="countdown-days"></div>
                <div class="display-label">天</div>
            </div>
            <div class="display-item">
                <div class="display-value" id="countdown-hours"></div>
                <div class="display-label">时</div>
            </div>
            <div class="display-item">
                <div class="display-value" id="countdown-minutes"></div>
                <div class="display-label">分</div>
            </div>
            <div class="display-item">
                <div class="display-value" id="countdown-seconds"></div>
                <div class="display-label">秒</div>
            </div>
        </div>
    </div>
    
    <div id="error-message" class="error-message"></div>
`);

// 定义CSS样式
const style = document.createElement('style');
style.textContent = `
    .display-section {
        margin-bottom: 20px;
    }
    
    .section-title {
        font-size: 18px;
        margin-bottom: 10px;
        text-align: center;
    }
    
    .date-display-container,
    .display {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        width: 100%;
    }
    
    .display-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
    }
    
    .display-value {
        font-size: 24px;
        font-weight: bold;
        color: #e74c3c;
    }
    
    .display-label {
        font-size: 14px;
        color: #777;
        margin-top: 5px;
    }
    
    .error-message {
        color: #e74c3c;
        margin-top: 10px;
        font-size: 16px;
        text-align: center;
    }
    
    @media (max-width: 768px) {
        .date-display-container,
        .display {
            flex-direction: column;
            align-items: center;
        }
        
        .display-item {
            margin: 10px 0;
        }
    }
`;
document.head.appendChild(style);

// 获取当前年份
const currentYear = new Date().getFullYear();
const apiUrl = `https://cdn.jsdelivr.net/gh/cg-zhou/holiday-calendar@1.1.6/data/CN/${currentYear}.json`;
let nextHoliday = null;

// 从API获取节假日数据
function fetchHolidayData() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // 筛选公共节假日
            const publicHolidays = data.dates.filter(item => item.type === 'public_holiday');
            
            // 获取当前日期
            const now = new Date();
            let minDays = Infinity;
            
            // 查找最近的节假日
            publicHolidays.forEach(holiday => {
                const holidayDate = new Date(holiday.date);
                
                // 如果当前日期已经过了这个节假日，则查找下一年的
                if (holidayDate < now) {
                    const [year, month, day] = holiday.date.split('-');
                    holidayDate.setFullYear(holidayDate.getFullYear() + 1);
                }
                
                const diffTime = holidayDate - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays < minDays && diffDays >= 0) {
                    minDays = diffDays;
                    nextHoliday = holiday;
                    nextHoliday.dateObj = holidayDate;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching holiday data:', error);
            document.getElementById('error-message').textContent = `无法获取${currentYear}年的节假日数据，请稍后再试。`;
            document.getElementById('holiday-name').textContent = '节假日倒计时';
            document.getElementById('countdown-days').textContent = '---';
            document.getElementById('countdown-hours').textContent = '---';
            document.getElementById('countdown-minutes').textContent = '---';
            document.getElementById('countdown-seconds').textContent = '---';
        });
}

// 更新时钟和倒计时
function updateDisplay() {
    const now = new Date();
    
    // 更新日期显示
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    
    document.getElementById('year').textContent = year;
    document.getElementById('month').textContent = month;
    document.getElementById('date').textContent = date;
    
    // 更新时钟
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];
    
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
    document.getElementById('day').textContent = day;
    
    // 如果节假日数据已加载，则更新倒计时
    if (nextHoliday) {
        const diffTime = nextHoliday.dateObj - now;
        
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
        
        document.getElementById('holiday-name').textContent = `距离${nextHoliday.name_cn}还有`;
        document.getElementById('countdown-days').textContent = days;
        document.getElementById('countdown-hours').textContent = hours;
        document.getElementById('countdown-minutes').textContent = minutes;
        document.getElementById('countdown-seconds').textContent = seconds;
    }
}

// 初始化
fetchHolidayData();
setInterval(updateDisplay, 1000);