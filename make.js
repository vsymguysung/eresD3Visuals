// name of the library
global.library = 'vsnxtD3Visuals'

var command = process.argv[2],
  utils   = require('./tasks/_utils'),
  eslint  = require('./tasks/eslint'),
  test    = require('./tasks/test'),
  minify  = require('./tasks/minify'),
  build   = require('./tasks/build'),
  watch   = require('./tasks/watch'),
  serve   = require('./tasks/serve'),
  assets  = require('./tasks/assets');

/**
 * Each task required (except watch) returns a promise so you will be able to chain them as you prefer
 */

switch (command) {
case 'serve':
  serve()
  break
case 'eslint':
  eslint()
  break
case 'build':
  build()
    .then(assets)
  break
case 'run':
  build()
    .then(minify)
    .then(assets)
    .then(serve)
  break
case 'watch':
  watch()
  break
case 'minify':
  minify()
  break
case 'test':
  test()
  break
default:
  eslint()
      .then(build)
      .then(minify)
      .then(test)
      .then(function() {
        utils.print('Project successfully compiled!', 'confirm')
      })
}
