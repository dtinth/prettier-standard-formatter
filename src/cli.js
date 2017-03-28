#!/usr/bin/env node
'use strict';

const R = require('ramda');
const globby = require('globby');
const meow = require('meow');
const stdin = require('get-stdin');
const lib = require('./lib');

const DEFAULT_IGNORE_LIST = ['.git', 'node_modules', '!*.js'];

const cli = meow(
  `
  Usage
    $ prettier-semistandard [<file|glob> ...]

  Examples
    $ prettier-semistandard
    $ prettier-semistandard index.js
    $ prettier-semistandard foo.js bar.js
    $ prettier-semistandard index.js src/**/*.js
`
);

stdin().then(data => {
  if (data) {
    // Process stdin
    return R.composeP(s => process.stdout.write(s), lib.format)(data);
  }
  if (cli.input.length === 0) {
    // No args used; show help
    return cli.showHelp(1);
  }
  // Process a list of globs
  return R.composeP(
    R.map(p => p.then(console.log)),
    lib.formatPaths(DEFAULT_IGNORE_LIST),
    globby
  )(cli.input);
});
