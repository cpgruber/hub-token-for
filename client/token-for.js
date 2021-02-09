const { createDecipheriv } = require('crypto');
const fetch = require('cross-fetch');

const decrypt = (secret, str) => {
  const parts = str.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encrypted = Buffer.from(parts.join(':'), 'hex');
  const key = Buffer.concat([Buffer.from(secret), Buffer.alloc(32)], 32);
  const decipher = createDecipheriv('aes-256-ctr', key, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

const doesTokenWork = (env, token) => {
  return fetch(`${env}ext.arcgis.com/sharing/rest?token=${token}&f=json`).then(res => {
    return !res.error;
  });
}

const token4 = async (env, username, secret) => {
  const API_URL = env.toLowerCase() === 'qa'
    ? 'https://l6ynfn9h4j.execute-api.us-east-2.amazonaws.com/qa/token'
    : 'https://0cejnizhhe.execute-api.us-east-2.amazonaws.com/dev/token';

  const url = `${API_URL}?username=${username}`;
  const { token } = await fetch(url).then(res => res.json());
  return decrypt(secret, token);
}

module.exports = {
  token4,
  doesTokenWork
};