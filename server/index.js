const { UserSession } = require('@esri/arcgis-rest-auth');
const { encrypt } = require('./utils');
const USERS = require('./users');
const { success, error } = require('./response');
require('cross-fetch/polyfill');
require('isomorphic-form-data');

const authenticate = async username => {
  const session = new UserSession(USERS[username] || {});
  const user = await session.getUser();
  return session.token;
}

module.exports = async (event, _, callback) => {
  let response;
  try {
    const { username } = event.queryStringParameters;
    const token = await authenticate(username);
    response = success(encrypt(token));
  } catch (err) {
    console.log(err);
    response = error();
  }
  return callback(null, response);
}