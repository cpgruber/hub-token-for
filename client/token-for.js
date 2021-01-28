const env = require('../config/_env') || 'dev';
const envPath = `./config/env.${env}.json`;
require('dotenv-json')({ path: envPath });

const fetch = require('cross-fetch');
const { decrypt } = require('../shared/utils');

const { API_URL } = process.env;

module.exports = async username => {
  const url = `${API_URL}?username=${username}`;
  const { token } = await fetch(url).then(res => res.json());
  return decrypt(token);
}