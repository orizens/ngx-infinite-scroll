System.registerDynamic('src/infinite-scroll', ['@angular/core', './position-resolver', './scroll-register', './scroll-resolver'], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var core_1 = $__require('@angular/core');
    var position_resolver_1 = $__require('./position-resolver');
    var scroll_register_1 = $__require('./scroll-register');
    var scroll_resolver_1 = $__require('./scroll-resolver');
    var InfiniteScroll = function () {
        function InfiniteScroll(element, zone, positionResolverFactory, scrollRegister, scrollerResolver) {
            this.element = element;
            this.zone = zone;
            this.positionResolverFactory = positionResolverFactory;
            this.scrollRegister = scrollRegister;
            this.scrollerResolver = scrollerResolver;
            this.scrolled = new core_1.EventEmitter();
            this.scrolledUp = new core_1.EventEmitter();
            this._distanceDown = 2;
            this._distanceUp = 1.5;
            this._throttle = 300;
            this._disabled = false;
            this._container = null;
            this.scrollWindow = true;
            this._immediate = false;
            this._horizontal = false;
            this._alwaysCallback = false;
            this.throttleType = 'throttle';
        }
        Object.defineProperty(InfiniteScroll.prototype, "debounce", {
            set: function (value) {
                this.throttleType = value === '' || !!value ? 'debounce' : 'throttle';
            },
            enumerable: true,
            configurable: true
        });
        InfiniteScroll.prototype.ngOnInit = function () {
            var _this = this;
            if (typeof window !== 'undefined') {
                var containerElement = this.resolveContainerElement();
                var positionResolver_1 = this.positionResolverFactory.create({
                    windowElement: containerElement,
                    horizontal: this._horizontal
                });
                var options = {
                    container: positionResolver_1.container,
                    throttleType: this.throttleType,
                    throttleDuration: this._throttle,
                    filterBefore: function () {
                        return !_this._disabled;
                    },
                    mergeMap: function () {
                        return positionResolver_1.calculatePoints(_this.element);
                    },
                    scrollHandler: function (container) {
                        return _this.handleOnScroll(container);
                    }
                };
                this.disposeScroller = this.scrollRegister.attachEvent(options);
            }
        };
        InfiniteScroll.prototype.handleOnScroll = function (container) {
            var scrollResolverConfig = {
                distance: {
                    down: this._distanceDown,
                    up: this._distanceUp
                }
            };
            var scrollStats = this.scrollerResolver.getScrollStats(container, scrollResolverConfig);
            if (this.shouldTriggerEvents(scrollStats.shouldScroll)) {
                var infiniteScrollEvent = {
                    currentScrollPosition: container.scrolledUntilNow
                };
                if (scrollStats.isScrollingDown) {
                    this.onScrollDown(infiniteScrollEvent);
                } else {
                    this.onScrollUp(infiniteScrollEvent);
                }
            }
        };
        InfiniteScroll.prototype.shouldTriggerEvents = function (shouldScroll) {
            return (this._alwaysCallback || shouldScroll) && !this._disabled;
        };
        InfiniteScroll.prototype.ngOnDestroy = function () {
            if (this.disposeScroller) {
                this.disposeScroller.unsubscribe();
            }
        };
        InfiniteScroll.prototype.onScrollDown = function (data) {
            var _this = this;
            if (data === void 0) {
                data = { currentScrollPosition: 0 };
            }
            this.zone.run(function () {
                return _this.scrolled.emit(data);
            });
        };
        InfiniteScroll.prototype.onScrollUp = function (data) {
            var _this = this;
            if (data === void 0) {
                data = { currentScrollPosition: 0 };
            }
            this.zone.run(function () {
                return _this.scrolledUp.emit(data);
            });
        };
        InfiniteScroll.prototype.resolveContainerElement = function () {
            if (this._container) {
                return typeof this._container === 'string' ? window.document.querySelector(this._container) : this._container;
            } else {
                return this.scrollWindow ? window : this.element;
            }
        };
        InfiniteScroll.decorators = [{ type: core_1.Directive, args: [{
                selector: '[infinite-scroll]'
            }] }];
        /** @nocollapse */
        InfiniteScroll.ctorParameters = function () {
            return [{ type: core_1.ElementRef }, { type: core_1.NgZone }, { type: position_resolver_1.PositionResolverFactory }, { type: scroll_register_1.ScrollRegister }, { type: scroll_resolver_1.ScrollResolver }];
        };
        InfiniteScroll.propDecorators = {
            'scrolled': [{ type: core_1.Output }],
            'scrolledUp': [{ type: core_1.Output }],
            '_distanceDown': [{ type: core_1.Input, args: ['infiniteScrollDistance'] }],
            '_distanceUp': [{ type: core_1.Input, args: ['infiniteScrollUpDistance'] }],
            '_throttle': [{ type: core_1.Input, args: ['infiniteScrollThrottle'] }],
            '_disabled': [{ type: core_1.Input, args: ['infiniteScrollDisabled'] }],
            '_container': [{ type: core_1.Input, args: ['infiniteScrollContainer'] }],
            'scrollWindow': [{ type: core_1.Input, args: ['scrollWindow'] }],
            '_immediate': [{ type: core_1.Input, args: ['immediateCheck'] }],
            '_horizontal': [{ type: core_1.Input, args: ['horizontal'] }],
            '_alwaysCallback': [{ type: core_1.Input, args: ['alwaysCallback'] }],
            'debounce': [{ type: core_1.Input }]
        };
        return InfiniteScroll;
    }();
    exports.InfiniteScroll = InfiniteScroll;
});
System.registerDynamic('src/axis-resolver', ['@angular/core'], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var core_1 = $__require('@angular/core');
    var AxisResolverFactory = function () {
        function AxisResolverFactory() {}
        AxisResolverFactory.prototype.create = function (vertical) {
            if (vertical === void 0) {
                vertical = true;
            }
            return new AxisResolver(vertical);
        };
        AxisResolverFactory.decorators = [{ type: core_1.Injectable }];
        /** @nocollapse */
        AxisResolverFactory.ctorParameters = function () {
            return [];
        };
        return AxisResolverFactory;
    }();
    exports.AxisResolverFactory = AxisResolverFactory;
    var AxisResolver = function () {
        function AxisResolver(vertical) {
            if (vertical === void 0) {
                vertical = true;
            }
            this.vertical = vertical;
        }
        AxisResolver.prototype.clientHeightKey = function () {
            return this.vertical ? 'clientHeight' : 'clientWidth';
        };
        AxisResolver.prototype.offsetHeightKey = function () {
            return this.vertical ? 'offsetHeight' : 'offsetWidth';
        };
        AxisResolver.prototype.scrollHeightKey = function () {
            return this.vertical ? 'scrollHeight' : 'scrollWidth';
        };
        AxisResolver.prototype.pageYOffsetKey = function () {
            return this.vertical ? 'pageYOffset' : 'pageXOffset';
        };
        AxisResolver.prototype.offsetTopKey = function () {
            return this.vertical ? 'offsetTop' : 'offsetLeft';
        };
        AxisResolver.prototype.scrollTopKey = function () {
            return this.vertical ? 'scrollTop' : 'scrollLeft';
        };
        AxisResolver.prototype.topKey = function () {
            return this.vertical ? 'top' : 'left';
        };
        return AxisResolver;
    }();
    exports.AxisResolver = AxisResolver;
});
System.registerDynamic('src/position-resolver', ['@angular/core', './axis-resolver'], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var core_1 = $__require('@angular/core');
    var axis_resolver_1 = $__require('./axis-resolver');
    var PositionResolverFactory = function () {
        function PositionResolverFactory(axisResolver) {
            this.axisResolver = axisResolver;
        }
        PositionResolverFactory.prototype.create = function (options) {
            return new PositionResolver(this.axisResolver.create(!options.horizontal), options);
        };
        PositionResolverFactory.decorators = [{ type: core_1.Injectable }];
        /** @nocollapse */
        PositionResolverFactory.ctorParameters = function () {
            return [{ type: axis_resolver_1.AxisResolverFactory }];
        };
        return PositionResolverFactory;
    }();
    exports.PositionResolverFactory = PositionResolverFactory;
    var PositionResolver = function () {
        function PositionResolver(axis, options) {
            this.axis = axis;
            this.options = options;
            this.resolveContainer(this.options.windowElement);
            this.defineContainer(this.options.windowElement);
        }
        PositionResolver.prototype.defineContainer = function (windowElement) {
            if (this.resolveContainer(windowElement) || !windowElement.nativeElement) {
                this.container = windowElement;
            } else {
                this.container = windowElement.nativeElement;
            }
            return this.container;
        };
        PositionResolver.prototype.resolveContainer = function (windowElement) {
            var isContainerWindow = Object.prototype.toString.call(windowElement).includes('Window');
            this.isContainerWindow = isContainerWindow;
            return isContainerWindow;
        };
        PositionResolver.prototype.getDocumentElement = function () {
            return this.isContainerWindow ? this.options.windowElement.document.documentElement : null;
        };
        PositionResolver.prototype.calculatePoints = function (element) {
            return this.isContainerWindow ? this.calculatePointsForWindow(element) : this.calculatePointsForElement(element);
        };
        PositionResolver.prototype.calculatePointsForWindow = function (element) {
            // container's height
            var height = this.height(this.container);
            // scrolled until now / current y point
            var scrolledUntilNow = height + this.pageYOffset(this.getDocumentElement());
            // total height / most bottom y point
            var totalToScroll = this.offsetTop(element.nativeElement) + this.height(element.nativeElement);
            return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
        };
        PositionResolver.prototype.calculatePointsForElement = function (element) {
            var scrollTop = this.axis.scrollTopKey();
            var scrollHeight = this.axis.scrollHeightKey();
            var container = this.container;
            var height = this.height(container);
            // perhaps use this.container.offsetTop instead of 'scrollTop'
            var scrolledUntilNow = container[scrollTop];
            var containerTopOffset = 0;
            var offsetTop = this.offsetTop(container);
            if (offsetTop !== void 0) {
                containerTopOffset = offsetTop;
            }
            var totalToScroll = container[scrollHeight];
            return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
        };
        PositionResolver.prototype.height = function (elem) {
            var offsetHeight = this.axis.offsetHeightKey();
            var clientHeight = this.axis.clientHeightKey();
            // elem = elem.nativeElement;
            if (isNaN(elem[offsetHeight])) {
                return this.getDocumentElement()[clientHeight];
            } else {
                return elem[offsetHeight];
            }
        };
        PositionResolver.prototype.offsetTop = function (elem) {
            var top = this.axis.topKey();
            // elem = elem.nativeElement;
            if (!elem.getBoundingClientRect) {
                return;
            }
            return elem.getBoundingClientRect()[top] + this.pageYOffset(elem);
        };
        PositionResolver.prototype.pageYOffset = function (elem) {
            var pageYOffset = this.axis.pageYOffsetKey();
            var scrollTop = this.axis.scrollTopKey();
            var offsetTop = this.axis.offsetTopKey();
            // elem = elem.nativeElement;
            if (isNaN(window[pageYOffset])) {
                return this.getDocumentElement()[scrollTop];
            } else if (elem.ownerDocument) {
                return elem.ownerDocument.defaultView[pageYOffset];
            } else {
                return elem[offsetTop];
            }
        };
        return PositionResolver;
    }();
    exports.PositionResolver = PositionResolver;
});
System.registerDynamic('src/index', ['@angular/core', './infinite-scroll', './axis-resolver', './position-resolver', './scroll-register', './scroll-resolver'], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var core_1 = $__require('@angular/core');
    var infinite_scroll_1 = $__require('./infinite-scroll');
    var axis_resolver_1 = $__require('./axis-resolver');
    var position_resolver_1 = $__require('./position-resolver');
    var scroll_register_1 = $__require('./scroll-register');
    var scroll_resolver_1 = $__require('./scroll-resolver');
    var InfiniteScrollModule = function () {
        function InfiniteScrollModule() {}
        InfiniteScrollModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [],
                declarations: [infinite_scroll_1.InfiniteScroll],
                exports: [infinite_scroll_1.InfiniteScroll],
                providers: [axis_resolver_1.AxisResolverFactory, position_resolver_1.PositionResolverFactory, scroll_register_1.ScrollRegister, scroll_resolver_1.ScrollResolver]
            }] }];
        /** @nocollapse */
        InfiniteScrollModule.ctorParameters = function () {
            return [];
        };
        return InfiniteScrollModule;
    }();
    exports.InfiniteScrollModule = InfiniteScrollModule;
});
System.registerDynamic('src/scroll-register', ['@angular/core', 'rxjs/Observable', 'rxjs/add/observable/fromEvent', 'rxjs/add/observable/timer', 'rxjs/add/observable/of', 'rxjs/add/operator/debounce', 'rxjs/add/operator/throttle', 'rxjs/add/operator/filter', 'rxjs/add/operator/mergeMap'], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var core_1 = $__require('@angular/core');
    var Observable_1 = $__require('rxjs/Observable');
    $__require('rxjs/add/observable/fromEvent');
    $__require('rxjs/add/observable/timer');
    $__require('rxjs/add/observable/of');
    $__require('rxjs/add/operator/debounce');
    $__require('rxjs/add/operator/throttle');
    $__require('rxjs/add/operator/filter');
    $__require('rxjs/add/operator/mergeMap');
    var ScrollRegister = function () {
        function ScrollRegister() {}
        ScrollRegister.prototype.attachEvent = function (options) {
            var scroller$ = Observable_1.Observable.fromEvent(options.container, 'scroll')[options.throttleType](function () {
                return Observable_1.Observable.timer(options.throttleDuration);
            }).filter(options.filterBefore).mergeMap(function (ev) {
                return Observable_1.Observable.of(options.mergeMap(ev));
            }).subscribe(options.scrollHandler);
            return scroller$;
        };
        ScrollRegister.decorators = [{ type: core_1.Injectable }];
        /** @nocollapse */
        ScrollRegister.ctorParameters = function () {
            return [];
        };
        return ScrollRegister;
    }();
    exports.ScrollRegister = ScrollRegister;
});
System.registerDynamic("src/scroll-resolver", ["@angular/core"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var core_1 = $__require('@angular/core');
    var ScrollResolver = function () {
        function ScrollResolver() {
            this.lastScrollPosition = 0;
        }
        ScrollResolver.prototype.shouldScroll = function (container, config, scrollingDown) {
            var distance = config.distance;
            var remaining;
            var containerBreakpoint;
            if (scrollingDown) {
                remaining = container.totalToScroll - container.scrolledUntilNow;
                containerBreakpoint = container.height * distance.down + 1;
            } else {
                remaining = container.scrolledUntilNow;
                containerBreakpoint = container.height * distance.up + 1;
            }
            var shouldScroll = remaining <= containerBreakpoint;
            this.lastScrollPosition = container.scrolledUntilNow;
            return shouldScroll;
        };
        ScrollResolver.prototype.isScrollingDown = function (container) {
            return this.lastScrollPosition < container.scrolledUntilNow;
        };
        ScrollResolver.prototype.getScrollStats = function (container, config) {
            var isScrollingDown = this.isScrollingDown(container);
            var shouldScroll = this.shouldScroll(container, config, isScrollingDown);
            return { isScrollingDown: isScrollingDown, shouldScroll: shouldScroll };
        };
        ScrollResolver.decorators = [{ type: core_1.Injectable }];
        /** @nocollapse */
        ScrollResolver.ctorParameters = function () {
            return [];
        };
        return ScrollResolver;
    }();
    exports.ScrollResolver = ScrollResolver;
});
System.registerDynamic('angular2-infinite-scroll', ['./src/infinite-scroll', './src/position-resolver', './src/axis-resolver', './src/index', './src/scroll-register', './src/scroll-resolver'], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var infinite_scroll_1 = $__require('./src/infinite-scroll');
    var position_resolver_1 = $__require('./src/position-resolver');
    var axis_resolver_1 = $__require('./src/axis-resolver');
    var infinite_scroll_2 = $__require('./src/infinite-scroll');
    exports.InfiniteScroll = infinite_scroll_2.InfiniteScroll;
    var position_resolver_2 = $__require('./src/position-resolver');
    exports.PositionResolver = position_resolver_2.PositionResolver;
    exports.PositionResolverFactory = position_resolver_2.PositionResolverFactory;
    var axis_resolver_2 = $__require('./src/axis-resolver');
    exports.AxisResolver = axis_resolver_2.AxisResolver;
    exports.AxisResolverFactory = axis_resolver_2.AxisResolverFactory;
    var index_1 = $__require('./src/index');
    exports.InfiniteScrollModule = index_1.InfiniteScrollModule;
    var scroll_register_1 = $__require('./src/scroll-register');
    exports.ScrollRegister = scroll_register_1.ScrollRegister;
    var scroll_resolver_1 = $__require('./src/scroll-resolver');
    exports.ScrollResolver = scroll_resolver_1.ScrollResolver;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        directives: [infinite_scroll_1.InfiniteScroll, axis_resolver_1.AxisResolver, position_resolver_1.PositionResolver]
    };
});