module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      // Polyfills.
      'node_modules/es6-shim/es6-shim.js',

      'node_modules/reflect-metadata/Reflect.js',

      // System.js for module loading
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',

      // Zone.js dependencies
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs.
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },


      {pattern: 'karma-test-shim.js', included: true, watched: true},

      // paths loaded via module imports
      // Angular itself
      {pattern: 'node_modules/@angular/**/*.js', included: false, watched: true},
      {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: true},

      // Our built application code
      {pattern: '.tmp/built/**/*.js', included: false, watched: true},
      // Our Spec Files
      // {pattern: 'tests/built/**/*.js', included: false, watched: true},

      // paths to support debugging with source maps in dev tools
      {pattern: 'tests/**/*.ts', included: false, watched: false},
      {pattern: '.tmp/built/**/*.js.map', included: false, watched: false},
      // {pattern: 'tests/built/**/*.js.map', included: false, watched: false},

      // {pattern: 'built/test/matchers.js', included: true, watched: true},
      // {pattern: 'tests/built/**/*.js', included: true, watched: true},
    ],

    // proxied base paths
    // proxies: {
      // required for component assests fetched by Angular's compiler
      // "/tests/": "/base/tests/built/"
    // },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  })
}