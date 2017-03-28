const prettier = require('prettier')
const semistandard = require('semistandard')

exports.format = source => new Promise((resolve, reject) => {
  const pretty = prettier.format(source, {
    printWidth: 80,
    tabWidth: 2,
    parser: 'babylon',
    singleQuote: true,
    trailingComma: 'none',
    bracketSpacing: true
  })
  semistandard.lintText(pretty, { fix: true }, (err, result) => {
    if (err) {
      return reject(err)
    }
    const output = result.results[0].output
    if (typeof output !== 'string') {
      return reject(new Error('Expected a string back from linter'))
    }
    resolve(output)
  })
})
