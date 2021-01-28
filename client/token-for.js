const fetch = require('cross-fetch');
const { decrypt } = require('../shared/utils');

const env = require('../config/_env') || 'dev';
const envPath = `./config/env.${env}.json`;
if (!process.env._HANDLER) require('dotenv-json')({ path: envPath });
const { API_URL, PORTAL } = process.env;

module.exports = async username => {
  const url = `${API_URL}?username=${username}`;
  const { token } = await fetch(url).then(res => res.json());
  return decrypt(token);
}