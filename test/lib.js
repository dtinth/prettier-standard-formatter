const Promise = require('bluebird');
const R = require('ramda');
const tape = require('tape');
const lib = require('../src/lib');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

tape.test('lib.lint', test => {
  test.plan(1);

  lib
    .lint('console.log(1)\n')
    .catch(R.identity)
    .then(result =>
      test.equal(result, 'console.log(1)\n', 'lint should lint correctly'));
});

tape.test('lib.pretty', test => {
  test.plan(1);

  test.equal(
    lib.pretty(`\nimport x from "x"\n\n\n\n\nx(\na,\nb,  'c',)`),
    `import x from 'x';\n\nx(a, b, 'c');\n`,
    'pretty should prettyify correctly'
  );
});

tape.test('lib.format', test => {
  test.plan(1);

  lib
    .format(`\nimport x from "x"\n\n\n\n\nx(\na,\nb,  'c',)`)
    .catch(R.identity)
    .then(result =>
      test.equal(
        result,
        "import x from 'x'\n\nx(a, b, 'c')\n",
        'format should format correctly'
      ));
});

tape.test('lib.formatFile', test => {
  test.plan(1);

  rimraf.sync('test/.temp/formatFile');
  mkdirp.sync('test/.temp/formatFile');
  const path = 'test/.temp/formatFile/1';
  fs.writeFileSync(path, '\n    console.log("test")');

  lib
    .formatFile(path)
    .then(() => fs.readFileSync(path, 'utf8'))
    .catch(R.identity)
    .then(result =>
      test.equal(
        result,
        `console.log('test')\n`,
        'formatFile should format file correctly'
      ));
});

tape.test('lib.formatPaths', test => {
  test.plan(3);

  rimraf.sync('test/.temp/formatPaths');
  mkdirp.sync('test/.temp/formatPaths/folder');
  const paths = [
    'test/.temp/formatPaths/file',
    'test/.temp/formatPaths/folder/1',
    'test/.temp/formatPaths/folder/2'
  ];
  const ignored = 'test/.temp/formatPaths/folder/file.ignore';
  fs.writeFileSync(paths[0], '\n    console.log("0")');
  fs.writeFileSync(paths[1], '\n    console.log("1")');
  fs.writeFileSync(paths[2], '\n    console.log("2")');
  fs.writeFileSync(ignored, '\n    console.log("3")');

  lib
    .formatPaths(
      ['*.ignore'],
      ['test/.temp/formatPaths/file', 'test/.temp/formatPaths/folder']
    )
    .then(Promise.all)
    .then(result =>
      test.deepEqual(
        result,
        paths,
        'formatPaths should return an array of file path promises'
      ))
    .then(() => paths.map(path => fs.readFileSync(path, 'utf8')))
    .then(files => {
      test.deepEqual(
        files,
        [`console.log('0')\n`, `console.log('1')\n`, `console.log('2')\n`],
        'formatPaths should format an array of file & directory paths'
      );
    })
    .then(() =>
      test.equal(
        fs.readFileSync(ignored, 'utf8'),
        '\n    console.log("3")',
        'formatPaths should ignore certain paths'
      ));
});
