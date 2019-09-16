let enabled = true;
let started = false;
function navigate() {
  started = true;
  const list = document.querySelectorAll('h3.entry-title');
  for (let i = 0; i < list.length; i++) {
    setTimeout(() => {
      list[i].querySelector('a').click();
      console.log('opening', i);
      if (i === list.length - 1) {
        const next = document.querySelector('a.next.page-numbers');
        if (next && enabled) {
          next.click();
        }
      }
    }, i * 4000);
  }
}

chrome.runtime.sendMessage(1, enabled => {
  console.log('enabled', enabled);
  if (enabled) {
    navigate();
  }
});

chrome.runtime.onMessage.addListener(_enabled => {
  console.log('_enabled', _enabled);
  if (_enabled && !started) {
    navigate();
  }
  enabled = _enabled;
});
