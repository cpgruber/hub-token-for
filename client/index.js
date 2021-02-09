const { token4, doesTokenWork} = require('./token-for');
const program = require('commander');
const path = require('path');
const fs = require('fs');

const CONFIG = path.join(__dirname, '../config/local.json');

const init = async () => {
  program
    .description('get AGO token for user')
    .option('-e --env <environment>', 'which environment (dev or qa)')
    .option('-u --username <username>', 'which user (juliana_pa, paige_pa, chezelle_pa)')
    .option('-s --secret <secret key>', 'key used to decrypt token')
    .parse(process.argv);

  const opts = program.opts();
  const hist = getConfig();
  const env = opts.env || hist.env || 'qa';
  const secret = opts.secret || hist.secret || '';
  const username = opts.username || hist.username || 'juliana_pa';
  const tokenKey = [env, username].join('_');
  const existingToken = hist[tokenKey];
  if (existingToken && await doesTokenWork(env, existingToken)) {
    logAndCopy(env, username, existingToken);
    setConfig({ ...hist, env, username, secret });
  } else {
    const token = await token4(env, username, secret);
    logAndCopy(env, username, token);
    setConfig({ ...hist, env, username, secret, [tokenKey]: token });
  }
}

function logAndCopy(env, username, token) {
  console.log(`[${env.toUpperCase()}] token4: ${username}`);
  console.log(token);
  copy(token);
}

function getConfig() {
  try {
    const file = fs.readFileSync(CONFIG);
    return JSON.parse(file);
  } catch (_) {
    return {};
  }
}

function setConfig(opts) {
  return fs.writeFileSync(CONFIG, JSON.stringify(opts));
}

function copy(str) {
  var proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(str);
  proc.stdin.end();
}

module.exports = init;