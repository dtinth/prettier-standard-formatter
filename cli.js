#!/usr/bin/env node
'use strict'
main()

function main () {
  const resolveCwd = require('resolve-cwd')
  const localCLI = resolveCwd('prettier-semistandard/cli')

  if (localCLI && localCLI !== __filename) {
    require(localCLI)
    return
  }

  run()
}

function run () {
  const fs = require('fs')
  const globby = require('globby')
  const meow = require('meow')
  const recursive = require('recursive-readdir')
  const prettierSemistandard = require('./')

  const DEFAULT_IGNORE_LIST = ['.git', 'node_modules', '!*.js']

  const format = path => {
    fs.readFile(path, 'utf-8', (err, sourceCode) => {
      if (err) throw err
      prettierSemistandard.format(sourceCode).then(output => {
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
        recursive(path, DEFAULT_IGNORE_LIST, (err, files) => {
          if (err) throw err
          files.forEach(format)
        })
      }
    })
  }

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
  )

  if (!cli.input.length) {
    cli.showHelp(1)
  }

  globby(cli.input).then(processPaths)
}
