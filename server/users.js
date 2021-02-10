const env = require('./_env');
const envPath = `./config/env.${env}.json`;
if (!process.env._HANDLER) require('dotenv-json')({ path: envPath });

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
  },
  qa_pre_a_hub_admin: {
    username: 'qa_pre_a_hub_admin',
    password: PASSWORD,
    portal: PORTAL
  },
  qa_pre_hub_admin: {
    username: 'qa_pre_hub_admin',
    password: PASSWORD,
    portal: PORTAL
  }
};

module.exports = USERS;