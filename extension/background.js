let enabled = false;
let started = false;

function notify() {
  if (started) return Promise.resolve(true);
  return fetch('http://127.0.0.1:5050/okay', {
    credentials: 'include',
    method: 'GET',
    mode: 'cors'
  })
    .then(res => {
      console.log(res);
      if (res.ok && res.json()) {
        started = true;
        return true;
      }
      throw res.statusText;
    })
    .catch(() => {
      chrome.notifications.create({
        iconUrl: 'icons/icon32.png',
        type: 'basic',
        title: '服务器未开启',
        message: '运行：python3 server.py'
      });
      return false;
    });
}

chrome.browserAction.onClicked.addListener(({ id }) => {
  notify().then(okay => {
    if (okay) {
      enabled = !enabled;
      chrome.browserAction.setIcon({
        path: enabled ? 'icons/icon16.png' : 'icons/icon16x.png'
      });
      chrome.tabs.sendMessage(id, enabled);
    }
  });
});
chrome.runtime.onMessage.addListener((_, __, sendRes) => {
  sendRes(enabled);
});
