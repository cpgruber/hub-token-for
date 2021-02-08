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

function token4(env, username, secret) {
  const API_URL = env.toLowerCase() === 'qa'
    ? 'https://l6ynfn9h4j.execute-api.us-east-2.amazonaws.com/qa/token'
    : 'https://0cejnizhhe.execute-api.us-east-2.amazonaws.com/dev/token';

  const url = `${API_URL}?username=${username}`;
  return fetch(url)
    .then(res => res.json())
    .then(({ token }) => decrypt(secret, token));
}

if (window) {
  window.token4 = token4;
}

module.exports = token4;