/*global jasmine, __karma__, window*/
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () {
};


function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isSpecFile(path) {
  return path.slice(-8) == '.spec.js';
}

function isBuiltFile(path) {
  var builtPath = '/base/src/';
  return isJsFile(path) && (path.substr(0, builtPath.length) == builtPath);
}

var allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)
  .filter(isBuiltFile);

// Load our SystemJS configuration.
System.config({
  baseURL: '/base'
});

System.config({
  map: {
    'rxjs': 'node_modules/rxjs',
    '@angular': 'node_modules/@angular',
    'app': 'src'
  },
  packages: {
    'app': {
      main: 'main.js',
      defaultExtension: 'js'
    },
    '@angular/core': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/compiler': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/common': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser-dynamic': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    // '@angular/router-deprecated': {
    //   main: 'index.js',
    //   defaultExtension: 'js'
    // },
    // '@angular/router': {
    //   main: 'index.js',
    //   defaultExtension: 'js'
    // },
    'rxjs': {
      defaultExtension: 'js'
    }
  }
});
//
// Promise.all([
//   // System.import('@angular/core/testing'),
//   System.import('@angular/platform-browser-dynamic/testing')
// ]).then(function (providers) {
//   var testing = providers[0];
//   var testingBrowser = providers[1];
//
//   testing.setBaseTestProviders(testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
//     testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);
//
// }).then(function() {
//   // Finally, load all spec files.
//   // This will run the tests directly.
//   return Promise.all(
//     allSpecFiles.map(function (moduleName) {
//       return System.import(moduleName);
//     }));
// }).then(__karma__.start, __karma__.error);

// Tun on full stack traces in errors to help debugging
// Error.stackTraceLimit = Infinity;
//
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
//
// // // Cancel Karma's synchronous start,
// // // we will call `__karma__.start()` later, once all the specs are loaded.
// __karma__.loaded = function() {};
//
// System.config({
//     packages: {
//         'base/dist': {
//             defaultExtension: false,
//             format: 'cjs',
//             map: Object.keys(window.__karma__.files).filter(onlyAppFiles).reduce(createPathRecords, {})
//         }
//     }
// });

System.import('@angular/core/testing')
    // .then(function(browser_adapter) { browser_adapter.BrowserDomAdapter.makeCurrent(); })
    .then(function() { return Promise.all(resolveTestFiles()); })
    .then(function() { __karma__.start(); }, function(error) { __karma__.error(error.stack || error); });

// function createPathRecords(pathsMapping, appPath) {
//     // creates local module name mapping to global path with karma's fingerprint in path, e.g.:
//     // './vg-player/vg-player':
//     // '/base/dist/vg-player/vg-player.js?f4523daf879cfb7310ef6242682ccf10b2041b3e'
//     var pathParts = appPath.split('/');
//     var moduleName = './' + pathParts.slice(Math.max(pathParts.length - 2, 1)).join('/');
//     moduleName = moduleName.replace(/\.js$/, '');
//     pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath];
//     return pathsMapping;
// }
//
// function onlyAppFiles(filePath) {
//     return /\/base\/dist\/(?!.*\.spec\.js$).*\.js$/.test(filePath);
// }

function onlySpecFiles(path) {
  return /\.spec\.js$/.test(path);
}

function resolveTestFiles() {
  return Object.keys(window.__karma__.files)  // All files served by Karma.
    .filter(onlySpecFiles)
    .filter(isBuiltFile)
    .map(function(moduleName) {
      // loads all spec files via their global module names (e.g.
      // 'base/dist/vg-player/vg-player.spec')
      return System.import(moduleName);
    });
}
