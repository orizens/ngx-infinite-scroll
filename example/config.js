let systemConfig = {
  //use typescript for compilation
  transpiler: 'typescript',
  //typescript compiler options
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  //map tells the System loader where to look for things
  map: {
    app: './src',
    '@angular': 'https://unpkg.com/@angular',
    '@angular/common': 'https://unpkg.com/@angular/common@4.2.4',
    '@angular/core': 'https://unpkg.com/@angular/core@4.2.4',
    '@angular/compiler': 'https://unpkg.com/@angular/compiler@4.2.4',
    '@angular/platform-browser-dynamic': 'https://unpkg.com/@angular/platform-browser-dynamic@4.2.4',
    '@angular/platform-browser': 'https://unpkg.com/@angular/platform-browser@4.2.4',
    'rxjs': 'https://unpkg.com/rxjs@5.4.2'
    // 'ngx-infinite-scroll': 'https://unpkg.com/ngx-infinite-scroll'
  },
  //packages defines our app package
  packages: {
    app: {
      main: './main.ts',
      defaultExtension: 'ts'
    },
    '@angular/core': {
      main: 'bundles/core.umd.js',
      defaultExtension: 'js'
    },
    '@angular/compiler': {
      main: 'bundles/compiler.umd.js',
      defaultExtension: 'js'
    },
    '@angular/common': {
      main: 'bundles/common.umd.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser-dynamic': {
      main: 'bundles/platform-browser-dynamic.umd.js',
      defaultExtension: 'js'
    },
    '@angular/platform-browser': {
      main: 'bundles/platform-browser.umd.js',
      defaultExtension: 'js'
    },
    rxjs: {
      defaultExtension: 'js'
    },
    'ngx-infinite-scroll': {
      main: '../ngx-infinite-scroll.umd.js',
      defaultExtension: 'js'
    }
  }
};
System.config(systemConfig);
module.exports = systemConfig;