function wait(href) {
  return new Promise(resolve => {
    window.open(href);
    window.treestarted = data => {
      resolve(data);
    };
  });
}
async function main() {
  const main = document.querySelector('.judgement-breadcrumbs');

  const links = Array.from(main.querySelectorAll('a')).map(a => [
    a.href,
    a.innerText
  ]);
  if (!links.length) {
    return window.location.href;
  }
  const maindata = {};
  for (const [href, text] of links) {
    if (text.trim() === text) {
      maindata[text] = href;
    } else {
      const data = await wait(href);
      maindata[text.trim()] = data;
    }
  }
  return maindata;
}

function treestart() {
  main().then(data => {
    if (window.opener && window.opener.treestarted) {
      window.opener.treestarted(data);
      window.close();
    } else {
      fetch(`http://127.0.0.1:5050/index/${Date.now()}`, {
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {
        console.log('saved!');
      });
    }
  });
}
if (
  window.location.href.includes('_auto') ||
  (window.opener && window.opener.treestarted)
) {
  treestart();
}
