window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

window.addEventListener('load', function() {
    // 1. 查找并修改 viewport meta 标签
    var viewport = document.querySelector("meta[name=viewport]");
    
    // 定义允许缩放的配置字符串
    var zoomConfig = "width=device-width, initial-scale=1.0, maximum-scale=10.0, minimum-scale=1.0, user-scalable=yes";

    if (viewport) {
        // 如果存在，直接覆盖 content 属性
        viewport.setAttribute("content", zoomConfig);
    } else {
        // 如果不存在，创建一个新的并插入到 head 中
        viewport = document.createElement("meta");
        viewport.setAttribute("name", "viewport");
        viewport.setAttribute("content", zoomConfig);
        document.head.appendChild(viewport);
    }

    // 2. 额外保险：移除可能禁止触摸操作的 CSS 限制
    // 某些网站会设置 touch-action: none 来禁止手势，我们强制改回 auto
    document.body.style.touchAction = 'auto';
    document.documentElement.style.touchAction = 'auto';
    
    console.log('[PakePlus Custom] Zoom enabled successfully!');
});