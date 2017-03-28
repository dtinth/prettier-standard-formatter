# prettier-standard-formatter [![Circle CI](https://circleci.com/gh/dtinth/prettier-standard-formatter.png?circle-token=c60d4bd93940038f07fa0ef1645b520d25ea7bcc)](https://circleci.com/gh/dtinth/prettier-standard-formatter)

This tool combines the [prettier](https://github.com/jlongster/prettier) pretty-printer with the popular configuration-free [JavaScript Standard Style](http://standardjs.com/).

## API

```js
import format from 'prettier-standard-formatter'
import { readFileSync } from 'fs'

const source = readFileSync('index.js', 'utf8')
format(
  source
).then(
  console.log
)
```

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
