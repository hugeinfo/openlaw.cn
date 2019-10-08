function closeWindow(closing) {
  if (closing || (window.opener && window.opener.navigating)) {
    window.close();
  }
}

function bodyObj() {
  try {
    const olid = /http:\/\/openlaw\.cn\/judgement\/([-_a-z0-9]+)/i.exec(
      window.location.href
    )[1];
    const html = document.getElementById('primary').innerHTML;
    if (olid && html.indexOf('<h2 class="entry-title">') > -1) {
      return { html, olid };
    }
  } catch (e) {
    closeWindow();
  }
}

fetch('http://127.0.0.1:5050/save', {
  credentials: 'include',
  method: 'POST',
  mode: 'cors',
  body: JSON.stringify(bodyObj()),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(() => closeWindow(true))
  .catch(closeWindow);
