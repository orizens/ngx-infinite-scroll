System.registerDynamic("src/infinite-scroll", ["@angular/core", "./scroller"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var scroller_1 = $__require('./scroller');
  var InfiniteScroll = (function() {
    function InfiniteScroll(element) {
      this.element = element;
      this._distanceDown = 2;
      this._distanceUp = 1.5;
      this._throttle = 3;
      this.scrollWindow = true;
      this._immediate = false;
      this._horizontal = false;
      this._alwaysCallback = false;
      this.scrolled = new core_1.EventEmitter();
      this.scrolledUp = new core_1.EventEmitter();
    }
    InfiniteScroll.prototype.ngOnInit = function() {
      var containerElement = this.scrollWindow ? window : this.element;
      this.scroller = new scroller_1.Scroller(containerElement, setInterval, this.element, this.onScrollDown.bind(this), this.onScrollUp.bind(this), this._distanceDown, this._distanceUp, {}, this._throttle, this._immediate, this._horizontal, this._alwaysCallback);
    };
    InfiniteScroll.prototype.ngOnDestroy = function() {
      this.scroller.clean();
    };
    InfiniteScroll.prototype.onScrollDown = function(data) {
      if (data === void 0) {
        data = {};
      }
      this.scrolled.next(data);
    };
    InfiniteScroll.prototype.onScrollUp = function(data) {
      if (data === void 0) {
        data = {};
      }
      this.scrolledUp.next(data);
    };
    __decorate([core_1.Input('infiniteScrollDistance'), __metadata('design:type', Number)], InfiniteScroll.prototype, "_distanceDown", void 0);
    __decorate([core_1.Input('infiniteScrollUpDistance'), __metadata('design:type', Number)], InfiniteScroll.prototype, "_distanceUp", void 0);
    __decorate([core_1.Input('infiniteScrollThrottle'), __metadata('design:type', Number)], InfiniteScroll.prototype, "_throttle", void 0);
    __decorate([core_1.Input('scrollWindow'), __metadata('design:type', Boolean)], InfiniteScroll.prototype, "scrollWindow", void 0);
    __decorate([core_1.Input('immediateCheck'), __metadata('design:type', Boolean)], InfiniteScroll.prototype, "_immediate", void 0);
    __decorate([core_1.Input('horizontal'), __metadata('design:type', Boolean)], InfiniteScroll.prototype, "_horizontal", void 0);
    __decorate([core_1.Input('alwaysCallback'), __metadata('design:type', Boolean)], InfiniteScroll.prototype, "_alwaysCallback", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], InfiniteScroll.prototype, "scrolled", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], InfiniteScroll.prototype, "scrolledUp", void 0);
    InfiniteScroll = __decorate([core_1.Directive({selector: '[infinite-scroll]'}), __metadata('design:paramtypes', [core_1.ElementRef])], InfiniteScroll);
    return InfiniteScroll;
  }());
  exports.InfiniteScroll = InfiniteScroll;
  return module.exports;
});

System.registerDynamic("src/scroller", ["rxjs/Observable", "./axis-resolver", "rxjs/add/observable/fromEvent", "rxjs/add/observable/timer", "rxjs/add/operator/throttle"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
  var Observable_1 = $__require('rxjs/Observable');
  var axis_resolver_1 = $__require('./axis-resolver');
  $__require('rxjs/add/observable/fromEvent');
  $__require('rxjs/add/observable/timer');
  $__require('rxjs/add/operator/throttle');
  var Scroller = (function() {
    function Scroller(windowElement, $interval, $elementRef, infiniteScrollDownCallback, infiniteScrollUpCallback, infiniteScrollDownDistance, infiniteScrollUpDistance, infiniteScrollParent, infiniteScrollThrottle, isImmediate, horizontal, alwaysCallback) {
      if (horizontal === void 0) {
        horizontal = false;
      }
      if (alwaysCallback === void 0) {
        alwaysCallback = false;
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
      this.lastScrollPosition = 0;
      this.isContainerWindow = toString.call(this.windowElement).includes('Window');
      this.documentElement = this.isContainerWindow ? this.windowElement.document.documentElement : null;
      this.handleInfiniteScrollDistance(infiniteScrollDownDistance, infiniteScrollUpDistance);
      this.handleInfiniteScrollDisabled(false);
      this.defineContainer();
      this.createInterval();
      this.axis = new axis_resolver_1.AxisResolver(!this.horizontal);
    }
    Scroller.prototype.defineContainer = function() {
      if (this.isContainerWindow) {
        this.container = this.windowElement;
      } else {
        this.container = this.windowElement.nativeElement;
      }
      this.attachEvent(this.container);
    };
    Scroller.prototype.createInterval = function() {
      var _this = this;
      if (this.isImmediate) {
        this.checkInterval = this.$interval(function() {
          return _this.handler();
        }, 0);
      }
    };
    Scroller.prototype.height = function(elem) {
      var offsetHeight = this.axis.offsetHeightKey();
      var clientHeight = this.axis.clientHeightKey();
      if (isNaN(elem[offsetHeight])) {
        return this.documentElement[clientHeight];
      } else {
        return elem[offsetHeight];
      }
    };
    Scroller.prototype.offsetTop = function(elem) {
      var top = this.axis.topKey();
      if (!elem.getBoundingClientRect) {
        return;
      }
      return elem.getBoundingClientRect()[top] + this.pageYOffset(elem);
    };
    Scroller.prototype.pageYOffset = function(elem) {
      var pageYOffset = this.axis.pageYOffsetKey();
      var scrollTop = this.axis.scrollTopKey();
      var offsetTop = this.axis.offsetTopKey();
      if (isNaN(window[pageYOffset])) {
        return this.documentElement[scrollTop];
      } else if (elem.ownerDocument) {
        return elem.ownerDocument.defaultView[pageYOffset];
      } else {
        return elem[offsetTop];
      }
    };
    Scroller.prototype.handler = function() {
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
      var shouldClearInterval = shouldScroll && this.checkInterval;
      this.checkWhenEnabled = shouldScroll;
      if (triggerCallback) {
        if (scrollingDown) {
          this.infiniteScrollDownCallback({currentScrollPosition: container.scrolledUntilNow});
        } else {
          this.infiniteScrollUpCallback({currentScrollPosition: container.scrolledUntilNow});
        }
      }
      if (shouldClearInterval) {
        clearInterval(this.checkInterval);
      }
    };
    Scroller.prototype.calculatePoints = function() {
      return this.isContainerWindow ? this.calculatePointsForWindow() : this.calculatePointsForElement();
    };
    Scroller.prototype.calculatePointsForWindow = function() {
      var height = this.height(this.container);
      var scrolledUntilNow = height + this.pageYOffset(this.documentElement);
      var totalToScroll = this.offsetTop(this.$elementRef.nativeElement) + this.height(this.$elementRef.nativeElement);
      return {
        height: height,
        scrolledUntilNow: scrolledUntilNow,
        totalToScroll: totalToScroll
      };
    };
    Scroller.prototype.calculatePointsForElement = function() {
      var scrollTop = this.axis.scrollTopKey();
      var scrollHeight = this.axis.scrollHeightKey();
      var height = this.height(this.container);
      var scrolledUntilNow = this.container[scrollTop];
      var containerTopOffset = 0;
      var offsetTop = this.offsetTop(this.container);
      if (offsetTop !== void 0) {
        containerTopOffset = offsetTop;
      }
      var totalToScroll = this.container[scrollHeight];
      return {
        height: height,
        scrolledUntilNow: scrolledUntilNow,
        totalToScroll: totalToScroll
      };
    };
    Scroller.prototype.handleInfiniteScrollDistance = function(scrollDownDistance, scrollUpDistance) {
      this.scrollDownDistance = parseFloat(scrollDownDistance) || 0;
      this.scrollUpDistance = parseFloat(scrollUpDistance) || 0;
    };
    Scroller.prototype.attachEvent = function(newContainer) {
      var _this = this;
      this.clean();
      if (newContainer) {
        var throttle_1 = this.infiniteScrollThrottle;
        this.disposeScroll = Observable_1.Observable.fromEvent(this.container, 'scroll').throttle(function(ev) {
          return Observable_1.Observable.timer(throttle_1);
        }).subscribe(function(ev) {
          return _this.handler();
        });
      }
    };
    Scroller.prototype.clean = function() {
      if (this.disposeScroll) {
        this.disposeScroll.unsubscribe();
      }
    };
    Scroller.prototype.handleInfiniteScrollDisabled = function(enableScroll) {
      this.scrollEnabled = !enableScroll;
    };
    return Scroller;
  }());
  exports.Scroller = Scroller;
  return module.exports;
});

System.registerDynamic("src/axis-resolver", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
  var AxisResolver = (function() {
    function AxisResolver(vertical) {
      if (vertical === void 0) {
        vertical = true;
      }
      this.vertical = vertical;
    }
    AxisResolver.prototype.clientHeightKey = function() {
      return this.vertical ? 'clientHeight' : 'clientWidth';
    };
    AxisResolver.prototype.offsetHeightKey = function() {
      return this.vertical ? 'offsetHeight' : 'offsetWidth';
    };
    AxisResolver.prototype.scrollHeightKey = function() {
      return this.vertical ? 'scrollHeight' : 'scrollWidth';
    };
    AxisResolver.prototype.pageYOffsetKey = function() {
      return this.vertical ? 'pageYOffset' : 'pageXOffset';
    };
    AxisResolver.prototype.offsetTopKey = function() {
      return this.vertical ? 'offsetTop' : 'offsetLeft';
    };
    AxisResolver.prototype.scrollTopKey = function() {
      return this.vertical ? 'scrollTop' : 'scrollLeft';
    };
    AxisResolver.prototype.topKey = function() {
      return this.vertical ? 'top' : 'left';
    };
    return AxisResolver;
  }());
  exports.AxisResolver = AxisResolver;
  return module.exports;
});

System.registerDynamic("angular2-infinite-scroll", ["./src/infinite-scroll", "./src/scroller", "./src/axis-resolver"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this || self,
      GLOBAL = global;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var infinite_scroll_1 = $__require('./src/infinite-scroll');
  var scroller_1 = $__require('./src/scroller');
  var axis_resolver_1 = $__require('./src/axis-resolver');
  __export($__require('./src/infinite-scroll'));
  __export($__require('./src/scroller'));
  __export($__require('./src/axis-resolver'));
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {directives: [infinite_scroll_1.InfiniteScroll, scroller_1.Scroller, axis_resolver_1.AxisResolver]};
  return module.exports;
});
