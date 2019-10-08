// console.log('autologin!');
// fetch('http://127.0.0.1:5050/upass', {
//   credentials: 'include',
//   method: 'GET',
//   mode: 'cors'
// })
//   .then(res => {
//     if (res.ok) {
//       return JSON.parse(res.text());
//     }
//     throw res.statusText;
//   })
//   .then(({ username, password }) => {
//     document.querySelector('#username').value = username;
//     document.querySelector('#password').value = password;
//     document.querySelector('#submit').click();
//   });

if (window.location.href.includes('_auto')) {
  chrome.runtime.sendMessage('upass', ({ username, password }) => {
    document.querySelector('#username').value = username;
    document.querySelector('#password').value = password;
    setTimeout(() => {
      document.querySelector('#submit').click();
    }, 6000);
  });
}
