const fs = require('fs');
const https = require('https');
const path = require('path');
const compression = require('compression');

const chalk = require('chalk');
const express = require('express');

const HTTPS_ADDRESS = 3000;

const TLS_KEY_PATH = path.join(__dirname,'..','private','key.pem');
const TLS_CERT_PATH = path.join(__dirname,'..','private','cert.pem');

let app = express();

if (!fs.existsSync(TLS_KEY_PATH)) {
  process.stderr.write(
    chalk.bgRed.white('X.509 private key was not found.') +
    chalk.red(`\n  ↪ Expected to find it at ${TLS_KEY_PATH}`) +
    chalk.red('\n    Make sure to run ') +
    chalk.yellow('npm run certs') +
    chalk.red(' which should create this file for you')
  );
  process.exit(1);
}
if (!fs.existsSync(TLS_CERT_PATH)) {
  process.stderr.write(
    chalk.bgRed.white('X.509 certificate was not found.') +
    chalk.red(`\n  ↪ Expected to find it at ${TLS_CERT_PATH}`) +
    chalk.red('\n    Make sure to run ') +
    chalk.yellow('npm run certs') +
    chalk.red(' which should create this file for you')
  );
  process.exit(1);
}

let httpsOptions = {
  key: fs.readFileSync(TLS_KEY_PATH),
  cert: fs.readFileSync(TLS_CERT_PATH)
};

https.createServer(httpsOptions, app).listen(HTTPS_ADDRESS);

app.use(compression());

app.use(express.static(path.resolve(__dirname, '..', '..', 'build')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..','..','build', 'index.html'));
});

process.stdout.write(chalk.yellow(' 💻  Running  on https://localhost:3000\n'));
