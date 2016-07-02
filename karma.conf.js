const isDebug = process.env.DEBUG || false;
const isTravis = process.env.TRAVIS || false;
const browsers = isDebug ? ['Chrome'] : ['PhantomJS'];
const hasSingleRunAsSwitch = process.argv.filter(s => s.includes('single-run'));
const singleRun = isTravis || hasSingleRunAsSwitch[0] ? true : false;

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
      {pattern: 'src/**/*.js', included: false, watched: true},

      // paths to support debugging with source maps in dev tools
      {pattern: 'src/**/*.ts', included: false, watched: false}
      // if we swtich to sourcemap files
      // {pattern: 'src/**/*.js.map', included: false, watched: false},

      // {pattern: 'built/test/matchers.js', included: true, watched: true},
    ],

    // proxied base paths
    // proxies: {
      // required for component assests fetched by Angular's compiler
      // "/tests/": "/base/tests/built/"
    // },
    plugins : [
        'karma-jasmine',
        'karma-mocha-reporter',
        'karma-chrome-launcher',
        'karma-phantomjs-launcher'
    ],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: browsers,
    singleRun: singleRun
  })
}