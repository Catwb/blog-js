<script>
(function(){
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    const container = document.querySelector('.friend-content');
    const cards     = Array.from(document.querySelectorAll('.friend-card'));
    if (!cards.length) return;

    /* 1. 先藏起来（保留占位） */
    container.style.opacity = '0';
    container.style.transform = 'translateY(30px)';
    container.style.transition = 'none';

    /* 2. 洗牌 */
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    /* 3. 一次性塞进 DOM */
    const df = document.createDocumentFragment();
    cards.forEach(el => df.appendChild(el));
    container.appendChild(df);

    /* 4. 下一帧再开动画，整体淡入+上浮 */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        container.style.transition = 'opacity .6s ease,transform .6s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
      });
    });
  });
})();
</script>
