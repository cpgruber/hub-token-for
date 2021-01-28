const { createCipheriv, createDecipheriv, randomBytes } = require('crypto');
const algo = 'aes-256-ctr';

const env = require('../config/_env') || 'dev';
const envPath = `./config/env.${env}.json`;
if (!process.env._HANDLER) require('dotenv-json')({ path: envPath });
const { SECRET_KEY, IV_LENGTH: _ivLength } = process.env;
const IV_LENGTH = parseInt(`${_ivLength}`, 10); // envvars are strings

const encrypt = str => {
  const iv = randomBytes(IV_LENGTH);
  const key = Buffer.concat([Buffer.from(SECRET_KEY), Buffer.alloc(32)], 32)
  const cipher = createCipheriv(algo, key, iv);
  let encrypted = cipher.update(str);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

const decrypt = str => {
  const parts = str.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encrypted = Buffer.from(parts.join(':'), 'hex');
  const key = Buffer.concat([Buffer.from(SECRET_KEY), Buffer.alloc(32)], 32)
  const decipher = createDecipheriv(algo, key, iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

module.exports = { encrypt, decrypt };