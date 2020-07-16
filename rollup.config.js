export default {
    entry: './dist/modules/ngx-infinite-scroll.es5.js',
    dest: './dist/bundles/ngx-infinite-scroll.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'ng.ngxInfiniteScroll',
    external: [
        '@angular/core',
        '@angular/common',
        'rxjs',
        'rxjs/Observable',
        'rxjs/Observer',
        'rxjs/operators'
    ],
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        rxjs: 'rxjs',
        'rxjs/Observable': 'Rx',
        'rxjs/Observer': 'Rx',
        'rxjs/operators': 'rxjs.operators'
    },
    onwarn: () => { return }
}