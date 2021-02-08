const token4 = require('./token-for');

const url = new URL(window.location.href);
const env = url.searchParams.has('env') ? url.searchParams.get('env').toLocaleLowerCase() : 'qa';
const user = url.searchParams.get('user');
const secret = window.localStorage.getItem('token4-secret');

return token4(env, user, secret).then(token => {
  window.localStorage.setItem('token', token);
});