## v 0.8.3 (2018/02/21)
* [FIX] - fix for #198 - takes a long time for onscroll to fire 
* [UPDATE] - default value for throttle changed to 150  

## v 0.8.2 (2018/01/07)
* [FIX] - fix for #221 - action not fired on Windows scrolling
* [FIX] - fix for #228 - scrolling back up to the top of the list and then scroll down doesn't trigger event 
* [REFACTOR] - shorten var names 

## v 0.8.1 (2018/01/07)
* [REFACTOR] - performance optimization for scroll events 

## v 0.8.0 (2018/01/02)
* [FIX] - now triggers only once when in or after target (#200) 
* [REFACTOR] - "distance" number has been refined to be the percentage point of the scroll nob. 
* [REFACTOR] - added more unit tests. 

## v 0.7.2 (2017/12/07)
* [FIX] - fix for ie11 - fix #157

## v 0.7.1 (2017/11/27)
* [FIX] - use html container if passed in #217 - fix #216

## v 0.7.0 (2017/11/27)
* [ADD] - watch changes for: infiniteScrollDisabled - fix #196
* [ADD] - watch changes for: infiniteScrollDistance - fix #202
* [FIX] - fix for IE11 - fix #203 
* [REFACTOR] - "disable" now removes the scroll listener instead of rxjs/filter

## v 0.6.1 (2017/10/20)
* [REFACTOR] - updated code to be functional based
* [FIX] - fix #67, fix #191, fix #190

## v 0.5.2 (2017/09/27)
* [FIX] -  fix #157, fix #162, fix #171, fix #188
* [DOCS] - added example for development

## v 0.5.1 (2017/04/25)
* [FIX] - fixes #156 - running scroll logics outside of angular's zone

## v 0.5.0 (2017/04/24)
* [MAINTAINANCE] - code refactor - removing factories to rely more pure functional methods in PositionResolver, AxisResolver

## v 0.4.2 (2017/04/19)
* [NEW] - added **'[infiniteScroll]'** by [Angular's styleguide](https://angular.io/docs/ts/latest/guide/style-guide.html#!#02-06). **[infinite-scroll]** will be deprecated in future version.
* reduced bundle size with imports for RxJS Observable and Subscription objects #126. 
* removed old code directory from repo

## v 0.4.1 (2017/04/13)
* Fixes #147 - (__InfiniteScrollModule is not an NgModule__)

## v 0.4.0 (2017/04/12)
* Added Angular 4 support
* New starter code base ([based on angular-library-starter](https://github.com/robisim74/angular-library-starter))

## v 0.3.3 (2017/03/01) 

### Updates
* reverted the fix of #126

## v 0.3.2 (2017/03/01) 

### Updates
* fixes [#126](https://github.com/orizens/angular2-infinite-scroll/issues/126)

## v 0.3.1 (2017/02/15) 

### Updates
* added custom scrollable container from [#108](https://github.com/orizens/angular2-infinite-scroll/pull/108/files)

## v 0.3.0 (2017/01/31) 

### Updates
* refactored infinite scroller to smaller modules with composition
* added "models" - includes interfaces for development

## v 0.2.9 (2017/01/13)

### Updates
* added changelog.md
* ([refactor(scroll): replaces throttle with debounce](https://github.com/orizens/angular2-infinite-scroll/pull/82))

