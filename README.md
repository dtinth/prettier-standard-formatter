# prettier-standard-formatter

This tool combines the [prettier](https://github.com/jlongster/prettier) pretty-printer with the popular configuration-free [JavaScript Standard Style](http://standardjs.com/).

## API

```js
const prettierStandard = require('prettier-standard')

// There is no configuration, just like standard.
prettierStandard.format(source).then(console.log)
```

## Editor plugins

- __Atom:__ [prettier-standard-formatter](https://atom.io/packages/prettier-standard-formatter)
