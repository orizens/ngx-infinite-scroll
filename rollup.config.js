export default {
    entry: './dist/modules/angular-library-starter.es5.js',
    dest: './dist/bundles/angular-library-starter.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'ng.angularLibraryStarter',
    external: [
        '@angular/core',
        '@angular/common',
        'rxjs/Observable',
        'rxjs/Observer'
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        'rxjs/Observable': 'Rx',
        'rxjs/Observer': 'Rx'
    },
    onwarn: () => { return }
}