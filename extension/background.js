// http://openlaw.cn/search/judgement/type?courtId=&lawFirmId=&docType=Verdict&causeId=44f522e92013462abc4ad7049ebd9e3e&judgeDateYear=2019&lawSearch=&litigationType_c=&judgeId=&zoneId=&procedureType=&sideType=&keyword=&page=9
let enabled = false;

function notify() {
  return fetch('http://127.0.0.1:5050/next', {
    credentials: 'include',
    method: 'GET',
    mode: 'cors'
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

function setIconByEnabled(_enabled) {
  enabled = _enabled;
  chrome.browserAction.setIcon({
    path: _enabled ? 'icons/icon16.png' : 'icons/icon16x.png'
  });
}

chrome.browserAction.onClicked.addListener(({ id, url }) => {
  if (enabled) {
    setIconByEnabled(false);
    chrome.tabs.sendMessage(id, false);
  } else {
    notify()
      .then(lastUrl => {
        setIconByEnabled(true);
        // if (url.includes('openlaw.cn/search/judgement')) {
        //   chrome.tabs.sendMessage(id, true);
        // } else
        if (lastUrl) {
          chrome.tabs.create({ url: lastUrl });
        }
      })
      .catch(() => {
        chrome.notifications.create({
          iconUrl: 'icons/icon32.png',
          type: 'basic',
          title: 'Server Not Started.',
          message: 'Run `python3 extserver` to start the server.'
        });
      });
  }
});

chrome.runtime.onMessage.addListener((msg, __, sendRes) => {
  switch (msg) {
    case 'upass':
      fetch('http://127.0.0.1:5050/upass', {
        credentials: 'include',
        method: 'GET',
        mode: 'cors'
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw res.statusText;
        })
        .then(({ username, password }) => {
          sendRes({ username, password });
        });
      return true;
    case 'enabled':
      return sendRes(enabled);
  }
});

setIconByEnabled(false);
