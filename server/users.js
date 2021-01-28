// const env = require('../config/_env') || 'dev';
// const envPath = `./config/env.${env}.json`;
// if (!process.env._HANDLER) require('dotenv-json')({ path: envPath });

const { PASSWORD, PORTAL } = process.env;

const USERS = {
  juliana_pa: {
    username: 'juliana_pa',
    password: PASSWORD,
    portal: PORTAL
  },
  paige_pa: {
    username: 'paige_pa',
    password: PASSWORD,
    portal: PORTAL
  },
  chezelle_pa: {
    username: 'chezelle_pa',
    password: PASSWORD,
    portal: PORTAL
  }
};

module.exports = USERS;