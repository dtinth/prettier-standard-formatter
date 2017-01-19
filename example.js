const prettierSourceCode = require('fs').readFileSync(
  require.resolve('prettier'),
  'utf8'
)
const prettierStandard = require('./')
prettierStandard.format(prettierSourceCode).then(console.log)
