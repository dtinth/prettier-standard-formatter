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
const prettierStandard = require('./')

const format = paths => {
  paths.forEach(path => {
    fs.readFile(path, 'utf-8', (err, sourceCode) => {
      if (err) throw err
      prettierStandard.format(sourceCode).then(output => {
        fs.writeFile(path, output, 'utf-8', err => {
          if (err) throw err
          console.log(path)
        })
      })
    })
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

globby(cli.input).then(format)
