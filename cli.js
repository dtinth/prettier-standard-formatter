#!/usr/bin/env node
'use strict'

const resolveCwd = require('resolve-cwd')

const localCLI = resolveCwd('prettier-standard-formatter/cli')

if (localCLI && localCLI !== __filename) {
  require(localCLI)
  return
}

const fs = require('fs')
const globby = require('globby')
const meow = require('meow')
const recursive = require('recursive-readdir')
const prettierStandard = require('./')

const format = path => {
  fs.readFile(path, 'utf-8', (err, sourceCode) => {
    if (err) throw err
    prettierStandard.format(sourceCode).then(output => {
      fs.writeFile(path, output, 'utf-8', err => {
        if (err) throw err
        console.log(path)
      })
    })
  })
}

const processPaths = paths => {
  paths.forEach(path => {
    if (!fs.lstatSync(path).isDirectory()) {
      format(path)
    } else {
      recursive(path, (err, files) => {
        if (err) throw err
        files.forEach(format)
      })
    }
  })
}

const cli = meow(`
  Usage
    $ prettier-standard-formatter [<file|glob> ...]

  Examples
    $ prettier-standard-formatter
    $ prettier-standard-formatter index.js
    $ prettier-standard-formatter foo.js bar.js
    $ prettier-standard-formatter index.js src/**/*.js
`)

globby(cli.input).then(processPaths)
