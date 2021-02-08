'use strict';

const token4 = require('./token-for');

const url = new URL(window.location.href);
const env = url.searchParams.has('env') ? url.searchParams.get('env').toLocaleLowerCase() : 'qa';
const user = url.searchParams.get('user');
const secret = window.localStorage.getItem('token4-secret');
alert('hey hi');
token4(env, user, secret).then(token => {
  alert('hello');
  window.localStorage.setItem('token', token);
});