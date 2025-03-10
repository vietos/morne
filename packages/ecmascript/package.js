Package.describe({
  name: 'ecmascript',
  version: '0.16.5',
  summary: 'Compiler plugin that supports ES2015+ in all .js files',
  documentation: 'README.md',
});

Package.registerBuildPlugin({
  name: 'compile-ecmascript',
  use: ['babel-compiler', 'react-fast-refresh'],
  sources: ['plugin.js'],
});

Package.onUse(function(api) {
  api.use('isobuild:compiler-plugin@1.0.0');
  api.use('babel-compiler');
  api.use('react-fast-refresh');

  // The following api.imply calls should match those in
  // ../coffeescript/package.js.
  api.imply('modules');
  api.imply('ecmascript-runtime');
  api.imply('babel-runtime');
  api.imply('promise');

  // Runtime support for Meteor 1.5 dynamic import(...) syntax.
  api.imply('dynamic-import');

  api.addFiles('ecmascript.js', 'server');
  api.export('ECMAScript', 'server');
});

Package.onTest(function(api) {
  api.use(['tinytest']);
  api.use(['es5-shim', 'ecmascript', 'babel-compiler']);
  api.addFiles('runtime-tests.js');
  api.addFiles('transpilation-tests.js', 'server');

  api.addFiles('bare-test.js');
  api.addFiles('bare-test-file.js', ['client', 'server'], {
    bare: true,
  });
  api.addFiles('runtime-tests-client.js', ['client', 'web.browser.legacy']);
});
