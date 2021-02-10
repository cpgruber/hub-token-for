const { createCipheriv, randomBytes } = require('crypto');
const USERS = require('./users');
const { success, error } = require('./response');
const { UserSession } = require('@esri/arcgis-rest-auth');

require('cross-fetch/polyfill');
require('isomorphic-form-data');

const env = require('./_env');
const envPath = `./config/env.${env}.json`;
if (!process.env._HANDLER) require('dotenv-json')({ path: envPath });

const { SECRET_KEY, IV_LENGTH: _ivLength } = process.env;
const IV_LENGTH = parseInt(`${_ivLength}`, 10); // envvars are strings

const getToken = async username => {
  const session = new UserSession(USERS[username] || {});
  await session.getUser();
  return session.token;
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