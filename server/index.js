const { createCipheriv, randomBytes } = require('crypto');
const USERS = require('./users');
const { success, error } = require('./response');
const fetch = require('node-fetch');

const env = require('./_env');
const envPath = `./config/env.${env}.json`;
if (!process.env._HANDLER) require('dotenv-json')({ path: envPath });

const { SECRET_KEY, IV_LENGTH: _ivLength } = process.env;
const IV_LENGTH = parseInt(`${_ivLength}`, 10); // envvars are strings

const getToken = async user => {
  const { username, password, portal } = USERS[user] || {};
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  params.append('client', 'requestip');
  const res = await fetch(`${portal}/generateToken?f=json`, {
    method: 'POST',
    body: params
  }).then(res => res.json());
  console.log('RES is', res);
  return res.token;
}

const encrypt = str => {
  const iv = randomBytes(IV_LENGTH);
  const key = Buffer.concat([Buffer.from(SECRET_KEY), Buffer.alloc(32)], 32);
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  let encrypted = cipher.update(str);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

module.exports = async (event, _, callback) => {
  let response;
  try {
    const { username } = event.queryStringParameters;
    const token = await getToken(username);
    response = success(encrypt(token));
  } catch (err) {
    console.log(err);
    response = error();
  }
  return callback(null, response);
}