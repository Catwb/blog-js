const WORKER_URL = 'https://online.qiyao.workers.dev/';

async function ping() {
  await fetch(`${WORKER_URL}/ping`, {
    method: 'POST',
    credentials: 'include'
  });
}

async function fetchStats() {
  try {
    const res = await fetch(`${WORKER_URL}/stats`, { credentials: 'include' });
    const data = await res.json();
    document.getElementById('online').textContent = data.online;
  } catch {
    document.getElementById('online').textContent = '获取失败';
  }
}

// 立即执行一次
ping();
fetchStats();

// 每分钟同步
setInterval(() => {
  ping();
  fetchStats();
}, 60 * 1000);
