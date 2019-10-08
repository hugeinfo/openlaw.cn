function otherWay() {
  chrome.runtime.sendMessage('enabled', enabled => {
    if (enabled) {
      fetch('http://127.0.0.1:5050/next', {
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
        .then(openUrl => {
          location.href = openUrl;
        });
    }
  });
}

function navigate() {
  window.navigating = true;
  const list = document.querySelectorAll('h3.entry-title');
  if (!list.length) {
    if (document.querySelector('#totalCount-bar')) {
      return otherWay();
    } else if (window.parent && window.parent.navigating) {
      setTimeout(() => {
        window.location.href = '/logout';
      }, 20000);
    }
  }
  for (let i = 0; i < list.length; i++) {
    setTimeout(() => {
      list[i].querySelector('a').click();
      if (i === list.length - 1) {
        // const next = document.querySelector('a.next.page-numbers');
        // if (next && enabled) {
        //   next.click();
        // } else {
        otherWay();
        // }
      }
    }, i * 4000);
  }
}

if (
  window.location.href.includes('_auto') ||
  (window.opener && window.opener.location.href.includes('_auto'))
) {
  navigate();
}

// chrome.runtime.sendMessage(1, enabled => {
//   if (enabled) {
//     navigate();
//   }
// });

// chrome.runtime.onMessage.addListener(_enabled => {
//   enabled = _enabled;
//   if (_enabled) {
//     navigate();
//   }
// });
