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

## CLI

### Installation
```sh
$ yarn global add prettier-standard-formatter
```

### Usage
```sh
$ prettier-standard-formatter --help

  Usage
    $ prettier-standard-formatter [<file|glob> ...]

  Examples
    $ prettier-standard-formatter
    $ prettier-standard-formatter index.js
    $ prettier-standard-formatter foo.js bar.js
    $ prettier-standard-formatter index.js src/**/*.js
```

_Note: CLI will use your local installation of Prettier Standard Formatter if it's available._