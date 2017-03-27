#!/usr/bin/env node
'use strict';

const R = require('ramda');
const resolveCwd = require('resolve-cwd');
const globby = require('globby');
const meow = require('meow');
const lib = require('./index.js');

const DEFAULT_IGNORE_LIST = ['.git', 'node_modules', '!*.js'];

const localCliPath = resolveCwd('prettier-semistandard/cli');

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

if (localCliPath && localCliPath !== __filename) {
  // Local copy already exists; load it instead
  require(localCliPath);
} else if (cli.input.length === 0) {
  // No args used; show help
  cli.showHelp(1);
} else {
  // Run CLI
  R.composeP(
    R.map(p => p.then(console.log)),
    lib.formatPaths(DEFAULT_IGNORE_LIST),
    globby
  )(cli.input);
}
