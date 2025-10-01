(function () {
  const WS_URL = 'wss://online.245179.xyz/'; // 注意协议 wss
  const el = document.getElementById('online');
  const ws = new WebSocket(WS_URL);

  ws.onmessage = e => {
    const {online} = JSON.parse(e.data);
    el.textContent = online;
  };
  ws.onopen = () => setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({type: 'pong'}));
  }, 3000);
  ws.onclose = () => el.textContent = '断开';
})();
