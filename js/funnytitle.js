var OriginTitle = document.title;
var titleTime;

document.addEventListener('visibilitychange', function () {
    var icon = document.querySelector('[rel="icon"]');
    if (document.hidden) {
        document.title = 'QWQ别走啊';
        clearTimeout(titleTime);
    } else {
        document.title = '欢迎回来OwO';
        titleTime = setTimeout(function () {
            document.title = OriginTitle;
        }, 2000);
    }
});