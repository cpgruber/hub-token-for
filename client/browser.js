'use strict';

const { token4, doesTokenWork } = require('./token-for');

const authenticate = async () => {
  const url = new URL(window.location.href);
  const env = url.searchParams.has('env') ? url.searchParams.get('env').toLocaleLowerCase() : 'qa';
  const user = url.searchParams.get('user');
  const secret = window.localStorage.getItem('token4-secret');

  const tokenKey = [env, user].join('_');
  const existingToken = window.localStorage.getItem(tokenKey);
  if (existingToken && await doesTokenWork(env, existingToken)) {
    window.localStorage.setItem('bearer-token', existingToken);
  } else {
    return token4(env, user, secret).then(token => {
      window.localStorage.setItem(tokenKey, token);
      window.localStorage.setItem('bearer-token', token);
    });
  }
}

authenticate();