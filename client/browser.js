'use strict';

const { token4, doesTokenWork } = require('./token-for');

const authenticate = async () => {
  const url = new URL(window.location.href);
  const env = url.searchParams.has('env') ? url.searchParams.get('env').toLocaleLowerCase() : 'qa';
  const username = url.searchParams.get('username');
  const secret = window.localStorage.getItem('token4-secret');

  let bearer;
  if (!!username) {
    const tokenKey = [env, username].join('_');
    const existingToken = window.localStorage.getItem(tokenKey);
    if (existingToken && await doesTokenWork(env, existingToken)) {
      bearer = existingToken;
    } else {
      const token = await token4(env, username, secret);
      window.localStorage.setItem(tokenKey, token);
      bearer = token;
    }
  }
  window.localStorage.setItem('bearer-token', bearer);
}

authenticate();