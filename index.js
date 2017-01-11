const prettier = require('prettier')
const standard = require('standard')

exports.format = source => new Promise((resolve, reject) => {
  const pretty = prettier.format(source, {
    printWidth: 80,
    tabWidth: 2,
    useFlowParser: false,
    singleQuote: true,
    trailingComma: false,
    bracketSpacing: true
  })
  standard.lintText(pretty, { fix: true }, (err, result) => {
    if (err) {
      return reject(err)
    }
    const output = result.results[0].output
    if (typeof output !== 'string') {
      return reject(new Error('Expected a string back from standard'))
    }
    resolve(output)
  })
})
