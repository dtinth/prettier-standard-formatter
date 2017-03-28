# prettier-semistandard [![Circle CI](https://circleci.com/gh/conqa/prettier-semistandard.png?circle-token=c60d4bd93940038f07fa0ef1645b520d25ea7bcc)](https://circleci.com/gh/conqa/prettier-semistandard)

This tool combines the [prettier](https://github.com/jlongster/prettier) pretty-printer with the popular configuration-free [JavaScript Standard Style](http://standardjs.com/).

## API

```js
import format from 'prettier-semistandard';
import { readFileSync } from 'fs';

const source = readFileSync('index.js', 'utf8');
format(
  source
).then(
  console.log
);
```

## CLI

### Installation
```sh
$ yarn global add prettier-semistandard
```

### Usage
```sh
$ prettier-semistandard --help

  Usage
    $ prettier-semistandard [<file|glob> ...]

  Examples
    $ prettier-semistandard
    $ prettier-semistandard index.js
    $ prettier-semistandard foo.js bar.js
    $ prettier-semistandard index.js src/**/*.js
```
