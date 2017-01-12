#!/usr/bin/env node
'use strict'

const fs = require('fs')
const meow = require('meow')
const prettierStandard = require('./')

const cli = meow()

cli.input.forEach(file => {
  fs.readFile(file, 'utf-8', (err, sourceCode) => {
    if (err) throw err
    prettierStandard.format(sourceCode).then(output => {
      fs.writeFile(file, output, 'utf-8', err => {
        if (err) throw err
        console.log(file)
      })
    })
  })
})
