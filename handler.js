'use strict';

const env = 'dev';
const envPath = `./config/env.${env}.json`;
if (!process.env._HANDLER) require('dotenv-json')({ path: envPath });

require('cross-fetch/polyfill');
require('isomorphic-form-data');

const app = require('./server');

module.exports = { app };