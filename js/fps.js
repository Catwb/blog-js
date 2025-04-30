// 创建一个FPS计数器
class FPSCounter {
    constructor() {
        this.fpsElement = document.getElementById('fpsCounter');
        this.frameCount = 0;
        this.lastTime = 0;
        this.fps = 0;
        this.updateInterval = 1000; // 每秒更新一次FPS
    }

    // 开始FPS计数
    start() {
        this.lastTime = performance.now();
        this.animate();
    }

    // 动画循环
    animate() {
        this.frameCount++;
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;

        // 如果超过更新间隔，计算FPS
        if (deltaTime >= this.updateInterval) {
            this.fps = Math.round((this.frameCount / deltaTime) * 1000);
            this.updateFPSDisplay();
            this.frameCount = 0;
            this.lastTime = currentTime;
        }

        // 使用 volantis.requestAnimationFrame 替代标准的 requestAnimationFrame
        // 如果 volantis.requestAnimationFrame 不可用，则回退到标准的 requestAnimationFrame
        if (typeof volantis !== 'undefined' && typeof volantis.requestAnimationFrame === 'function') {
            volantis.requestAnimationFrame(() => this.animate());
        } else {
            requestAnimationFrame(() => this.animate());
        }
    }

    // 更新FPS显示
    updateFPSDisplay() {
        let statusText = '';
        let emoji = '';

        if (this.fps >= 90) {
            statusText = '优秀';
            emoji = '😃'; // 开心的黄脸
        } else if (this.fps >= 60) {
            statusText = '正常';
            emoji = '🙂'; // 微笑的黄脸
        } else {
            statusText = '低';
            emoji = '😕'; // 不悦的黄脸
        }

        this.fpsElement.textContent = `FPS: ${this.fps} ${emoji} ${statusText}`;
    }
}

// 动态创建并插入CSS样式
function injectCSS() {
    const style = document.createElement('style');
    style.textContent = `
        #fpsCounter {
            position: fixed;
            bottom: 10px;
            left: 10px;
            background-color: rgba(144, 238, 144, 0.5); /* 浅绿色背景，透明度为50% */
            color: black; /* 黑色文字 */
            padding: 5px 10px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            z-index: 1000;
        }
    `;
    document.head.appendChild(style);
}

// 创建FPS计数器元素
function createFPSCounterElement() {
    const fpsCounter = document.createElement('div');
    fpsCounter.id = 'fpsCounter';
    fpsCounter.textContent = 'FPS: 0';
    document.body.appendChild(fpsCounter);
}

// 页面加载完成后启动FPS计数器
window.addEventListener('load', () => {
    injectCSS(); // 注入CSS样式
    createFPSCounterElement(); // 创建FPS计数器元素
    const fpsCounter = new FPSCounter();
    fpsCounter.start(); // 启动FPS计数器
});