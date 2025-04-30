document.addEventListener('DOMContentLoaded', function() {
    // 获取当前时间
    var currentTime = new Date();
    var hours = currentTime.getHours();

    // 根据时间段设置问候语和图标
    var greeting;
    var iconClass;

    if (hours >= 7 && hours < 12) {
        greeting = '早上好！一日之计在于晨哦';
        iconClass = 'fa fa-sun light-yellow'; // 早上使用太阳图标
    } else if (hours >= 12 && hours < 13) {
        greeting = '中午好！酷阳高照，已为正午';
        iconClass = 'fa fa-sun light-orange'; // 中午使用太阳图标
    } else if (hours >= 13 && hours < 18) {
        greeting = '下午好！繁忙的一天将要结束咯';
        iconClass = 'fa fa-sun light-orange'; // 下午使用太阳图标
    } else {
        greeting = '晚上好！何必锱铢计较，细数满天繁星';
        iconClass = 'fa fa-moon light-blue'; // 晚上使用月亮图标
    }

    // 使用Volantis自带的消息提示功能
    VolantisApp.message('龙星划空小贴士', greeting, {
        icon: iconClass,
        position: 'topRight', // 调整位置为右上角
        transitionIn: 'bounceInDown',
        transitionOut: 'fadeOutDown',
        time: 3000
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // 获取URL中的查询参数
    var urlParams = new URLSearchParams(window.location.search);
    // 检查是否包含特定参数
    if (urlParams.has('from') && urlParams.get('from') === 'travel.moe') {
        // 使用Volantis自带的消息提示功能
        VolantisApp.message('龙星划空小贴士', '欢迎从茫茫星海的客人！', {
            icon: 'fa fa-smile-wink light-blue',
            position: 'topRight', // 调整位置为右上角
            transitionIn: 'bounceInDown',
            transitionOut: 'fadeOutDown',
            time: 5000
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // 获取访问来源
    var referrer = document.referrer;

    // 检查访问来源是否来自特定页面
    var allowedPaths = ['/go.html', '/plain.html', '/coder-1024.html', '/go-by-clouds.html'];
    var referrerUrl = new URL(referrer);
    var referrerPath = referrerUrl.pathname;

    if (
        referrerUrl.hostname === 'www.travellings.cn' &&
        allowedPaths.includes(referrerPath)
    ) {
        // 使用Volantis自带的消息提示功能
        VolantisApp.message('龙星划空小贴士', '欢迎从开往而来的客人！', {
            icon: 'fa fa-smile-wink light-blue',
            position: 'topRight', // 调整位置为右上角
            transitionIn: 'bounceInDown',
            transitionOut: 'fadeOutDown',
            time: 5000
        });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // 获取访问来源
    var referrer = document.referrer;

    // 检查访问来源是否来自无聊湾
    if (referrer === 'https://boringbay.com/') {
        // 使用Volantis自带的消息提示功能
        VolantisApp.message('龙星划空小贴士', '叮，今日份无聊已查收！', {
            icon: 'fad fa-smile-wink light-blue',
            position: 'topRight', // 调整位置为右上角
            transitionIn: 'bounceInDown',
            transitionOut: 'fadeOutDown',
            time: 5000
        });
    }
});