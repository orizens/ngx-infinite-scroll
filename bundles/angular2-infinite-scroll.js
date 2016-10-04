System.registerDynamic('src/scroller', ['rxjs/Observable', 'rxjs/add/observable/fromEvent', 'rxjs/add/observable/timer', 'rxjs/add/operator/throttle', 'rxjs/add/operator/filter'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var Observable_1 = $__require('rxjs/Observable');
    $__require('rxjs/add/observable/fromEvent');
    $__require('rxjs/add/observable/timer');
    $__require('rxjs/add/operator/throttle');
    $__require('rxjs/add/operator/filter');
    var Scroller = function () {
        // private axis: AxisResolver;
        function Scroller(windowElement, $interval, $elementRef, infiniteScrollDownCallback, infiniteScrollUpCallback, infiniteScrollDownDistance, infiniteScrollUpDistance, infiniteScrollParent, infiniteScrollThrottle, isImmediate, horizontal, alwaysCallback, scrollDisabled, axis) {
            if (horizontal === void 0) {
                horizontal = false;
            }
            if (alwaysCallback === void 0) {
                alwaysCallback = false;
            }
            if (scrollDisabled === void 0) {
                scrollDisabled = false;
            }
            this.windowElement = windowElement;
            this.$interval = $interval;
            this.$elementRef = $elementRef;
            this.infiniteScrollDownCallback = infiniteScrollDownCallback;
            this.infiniteScrollUpCallback = infiniteScrollUpCallback;
            this.infiniteScrollThrottle = infiniteScrollThrottle;
            this.isImmediate = isImmediate;
            this.horizontal = horizontal;
            this.alwaysCallback = alwaysCallback;
            this.scrollDisabled = scrollDisabled;
            this.axis = axis;
            this.lastScrollPosition = 0;
            this.isContainerWindow = Object.prototype.toString.call(this.windowElement).includes('Window');
            this.documentElement = this.isContainerWindow ? this.windowElement.document.documentElement : null;
            this.handleInfiniteScrollDistance(infiniteScrollDownDistance, infiniteScrollUpDistance);
            // if (attrs.infiniteScrollParent != null) {
            // 	attachEvent(angular.element(elem.parent()));
            // }
            this.handleInfiniteScrollDisabled(scrollDisabled);
            this.defineContainer();
            this.createInterval();
            this.axis.setVertical(!this.horizontal);
        }
        Scroller.prototype.defineContainer = function () {
            if (this.isContainerWindow) {
                this.container = this.windowElement;
            } else {
                this.container = this.windowElement.nativeElement;
            }
            this.attachEvent(this.container);
        };
        Scroller.prototype.createInterval = function () {
            var _this = this;
            if (this.isImmediate) {
                this.checkInterval = this.$interval(function () {
                    return _this.handler();
                }, 0);
            }
        };
        Scroller.prototype.height = function (elem) {
            var offsetHeight = this.axis.offsetHeightKey();
            var clientHeight = this.axis.clientHeightKey();
            // elem = elem.nativeElement;
            if (isNaN(elem[offsetHeight])) {
                return this.documentElement[clientHeight];
            } else {
                return elem[offsetHeight];
            }
        };
        Scroller.prototype.offsetTop = function (elem) {
            var top = this.axis.topKey();
            // elem = elem.nativeElement;
            if (!elem.getBoundingClientRect) {
                return;
            }
            return elem.getBoundingClientRect()[top] + this.pageYOffset(elem);
        };
        Scroller.prototype.pageYOffset = function (elem) {
            var pageYOffset = this.axis.pageYOffsetKey();
            var scrollTop = this.axis.scrollTopKey();
            var offsetTop = this.axis.offsetTopKey();
            // elem = elem.nativeElement;
            if (isNaN(window[pageYOffset])) {
                return this.documentElement[scrollTop];
            } else if (elem.ownerDocument) {
                return elem.ownerDocument.defaultView[pageYOffset];
            } else {
                return elem[offsetTop];
            }
        };
        Scroller.prototype.handler = function () {
            var container = this.calculatePoints();
            var scrollingDown = this.lastScrollPosition < container.scrolledUntilNow;
            this.lastScrollPosition = container.scrolledUntilNow;
            var remaining;
            var containerBreakpoint;
            if (scrollingDown) {
                remaining = container.totalToScroll - container.scrolledUntilNow;
                containerBreakpoint = container.height * this.scrollDownDistance + 1;
            } else {
                remaining = container.scrolledUntilNow;
                containerBreakpoint = container.height * this.scrollUpDistance + 1;
            }
            var shouldScroll = remaining <= containerBreakpoint;
            var triggerCallback = (this.alwaysCallback || shouldScroll) && this.scrollEnabled;
            var shouldClearInterval = !shouldScroll && this.checkInterval;
            // if (this.useDocumentBottom) {
            // 	container.totalToScroll = this.height(this.$elementRef.nativeElement.ownerDocument);
            // }
            this.checkWhenEnabled = shouldScroll;
            if (triggerCallback) {
                if (scrollingDown) {
                    this.infiniteScrollDownCallback({ currentScrollPosition: container.scrolledUntilNow });
                } else {
                    this.infiniteScrollUpCallback({ currentScrollPosition: container.scrolledUntilNow });
                }
            }
            if (shouldClearInterval) {
                clearInterval(this.checkInterval);
            }
        };
        Scroller.prototype.calculatePoints = function () {
            return this.isContainerWindow ? this.calculatePointsForWindow() : this.calculatePointsForElement();
        };
        Scroller.prototype.calculatePointsForWindow = function () {
            // container's height
            var height = this.height(this.container);
            // scrolled until now / current y point
            var scrolledUntilNow = height + this.pageYOffset(this.documentElement);
            // total height / most bottom y point
            var totalToScroll = this.offsetTop(this.$elementRef.nativeElement) + this.height(this.$elementRef.nativeElement);
            return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
        };
        Scroller.prototype.calculatePointsForElement = function () {
            var scrollTop = this.axis.scrollTopKey();
            var scrollHeight = this.axis.scrollHeightKey();
            var height = this.height(this.container);
            // perhaps use this.container.offsetTop instead of 'scrollTop'
            var scrolledUntilNow = this.container[scrollTop];
            var containerTopOffset = 0;
            var offsetTop = this.offsetTop(this.container);
            if (offsetTop !== void 0) {
                containerTopOffset = offsetTop;
            }
            var totalToScroll = this.container[scrollHeight];
            // const totalToScroll = this.offsetTop(this.$elementRef.nativeElement) - containerTopOffset + this.height(this.$elementRef.nativeElement);
            return { height: height, scrolledUntilNow: scrolledUntilNow, totalToScroll: totalToScroll };
        };
        Scroller.prototype.handleInfiniteScrollDistance = function (scrollDownDistance, scrollUpDistance) {
            this.scrollDownDistance = parseFloat(scrollDownDistance) || 0;
            this.scrollUpDistance = parseFloat(scrollUpDistance) || 0;
        };
        Scroller.prototype.attachEvent = function (newContainer) {
            var _this = this;
            this.clean();
            if (newContainer) {
                var throttle_1 = this.infiniteScrollThrottle;
                this.disposeScroll = Observable_1.Observable.fromEvent(this.container, 'scroll').throttle(function (ev) {
                    return Observable_1.Observable.timer(throttle_1);
                }).filter(function (ev) {
                    return _this.scrollEnabled;
                }).subscribe(function (ev) {
                    return _this.handler();
                });
            }
        };
        Scroller.prototype.clean = function () {
            if (this.disposeScroll) {
                this.disposeScroll.unsubscribe();
            }
        };
        Scroller.prototype.handleInfiniteScrollDisabled = function (scrollDisabled) {
            this.scrollEnabled = !scrollDisabled;
        };
        return Scroller;
    }();
    exports.Scroller = Scroller;
    return module.exports;
});
System.registerDynamic('src/infinite-scroll', ['@angular/core', './scroller', './axis-resolver'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('@angular/core');
    var scroller_1 = $__require('./scroller');
    var axis_resolver_1 = $__require('./axis-resolver');
    var InfiniteScroll = function () {
        function InfiniteScroll(element, zone, axis) {
            this.element = element;
            this.zone = zone;
            this.axis = axis;
            this._distanceDown = 2;
            this._distanceUp = 1.5;
            this._throttle = 300;
            this._disabled = false;
            this.scrollWindow = true;
            this._immediate = false;
            this._horizontal = false;
            this._alwaysCallback = false;
            this.scrolled = new core_1.EventEmitter();
            this.scrolledUp = new core_1.EventEmitter();
        }
        InfiniteScroll.prototype.ngOnInit = function () {
            var containerElement = this.scrollWindow ? window : this.element;
            this.scroller = new scroller_1.Scroller(containerElement, setInterval, this.element, this.onScrollDown.bind(this), this.onScrollUp.bind(this), this._distanceDown, this._distanceUp, {}, this._throttle, this._immediate, this._horizontal, this._alwaysCallback, this._disabled, this.axis);
        };
        InfiniteScroll.prototype.ngOnDestroy = function () {
            this.scroller.clean();
        };
        InfiniteScroll.prototype.ngOnChanges = function (changes) {
            if (changes['_disabled'] && this.scroller) {
                this.scroller.handleInfiniteScrollDisabled(changes['_disabled'].currentValue);
            }
        };
        InfiniteScroll.prototype.onScrollDown = function (data) {
            var _this = this;
            if (data === void 0) {
                data = {};
            }
            this.zone.run(function () {
                return _this.scrolled.next(data);
            });
        };
        InfiniteScroll.prototype.onScrollUp = function (data) {
            var _this = this;
            if (data === void 0) {
                data = {};
            }
            this.zone.run(function () {
                return _this.scrolledUp.next(data);
            });
        };
        InfiniteScroll.decorators = [{ type: core_1.Directive, args: [{
                selector: '[infinite-scroll]'
            }] }];
        /** @nocollapse */
        InfiniteScroll.ctorParameters = [{ type: core_1.ElementRef }, { type: core_1.NgZone }, { type: axis_resolver_1.AxisResolver }];
        InfiniteScroll.propDecorators = {
            '_distanceDown': [{ type: core_1.Input, args: ['infiniteScrollDistance'] }],
            '_distanceUp': [{ type: core_1.Input, args: ['infiniteScrollUpDistance'] }],
            '_throttle': [{ type: core_1.Input, args: ['infiniteScrollThrottle'] }],
            '_disabled': [{ type: core_1.Input, args: ['infiniteScrollDisabled'] }],
            'scrollWindow': [{ type: core_1.Input, args: ['scrollWindow'] }],
            '_immediate': [{ type: core_1.Input, args: ['immediateCheck'] }],
            '_horizontal': [{ type: core_1.Input, args: ['horizontal'] }],
            '_alwaysCallback': [{ type: core_1.Input, args: ['alwaysCallback'] }],
            'scrolled': [{ type: core_1.Output }],
            'scrolledUp': [{ type: core_1.Output }]
        };
        return InfiniteScroll;
    }();
    exports.InfiniteScroll = InfiniteScroll;
    return module.exports;
});
System.registerDynamic("src/axis-resolver", ["@angular/core"], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require("@angular/core");
    var AxisResolver = function () {
        function AxisResolver() {
            this.setVertical(true);
        }
        AxisResolver.prototype.setVertical = function (vertical) {
            if (vertical === void 0) {
                vertical = true;
            }
            this.vertical = vertical;
        };
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
        AxisResolver.decorators = [{ type: core_1.Injectable }];
        /** @nocollapse */
        AxisResolver.ctorParameters = [];
        return AxisResolver;
    }();
    exports.AxisResolver = AxisResolver;
    return module.exports;
});
System.registerDynamic('src/index', ['@angular/core', './infinite-scroll', './axis-resolver'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    var core_1 = $__require('@angular/core');
    var infinite_scroll_1 = $__require('./infinite-scroll');
    var axis_resolver_1 = $__require('./axis-resolver');
    var InfiniteScrollModule = function () {
        function InfiniteScrollModule() {}
        InfiniteScrollModule.decorators = [{ type: core_1.NgModule, args: [{
                imports: [],
                declarations: [infinite_scroll_1.InfiniteScroll],
                exports: [infinite_scroll_1.InfiniteScroll],
                providers: [axis_resolver_1.AxisResolver]
            }] }];
        /** @nocollapse */
        InfiniteScrollModule.ctorParameters = [];
        return InfiniteScrollModule;
    }();
    exports.InfiniteScrollModule = InfiniteScrollModule;
    return module.exports;
});
System.registerDynamic('angular2-infinite-scroll', ['./src/infinite-scroll', './src/scroller', './src/axis-resolver', './src/index'], true, function ($__require, exports, module) {
    "use strict";

    var define,
        global = this || self,
        GLOBAL = global;
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    var infinite_scroll_1 = $__require('./src/infinite-scroll');
    var scroller_1 = $__require('./src/scroller');
    var axis_resolver_1 = $__require('./src/axis-resolver');
    __export($__require('./src/infinite-scroll'));
    __export($__require('./src/scroller'));
    __export($__require('./src/axis-resolver'));
    __export($__require('./src/index'));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        directives: [infinite_scroll_1.InfiniteScroll, scroller_1.Scroller, axis_resolver_1.AxisResolver]
    };
    return module.exports;
});