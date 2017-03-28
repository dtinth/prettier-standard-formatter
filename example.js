const prettierSourceCode = require('fs').readFileSync(
  require.resolve('prettier'),
  'utf8'
)
const prettierSemistandard = require('./')
prettierSemistandard.format(prettierSourceCode).then(console.log)
