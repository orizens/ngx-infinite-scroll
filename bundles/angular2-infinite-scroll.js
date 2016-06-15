System.registerDynamic("src/infinite-scroll", ["@angular/core", "./scroller"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
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
      this._distance = 2;
      this._throttle = 3;
      this.scrollWindow = true;
      this._immediate = false;
      this.scrolled = new core_1.EventEmitter();
    }
    InfiniteScroll.prototype.ngOnInit = function() {
      var containerElement = this.scrollWindow ? window : this.element;
      this.scroller = new scroller_1.Scroller(containerElement, setInterval, this.element, this.onScroll.bind(this), this._distance, {}, this._throttle, this._immediate);
    };
    InfiniteScroll.prototype.ngOnDestroy = function() {
      this.scroller.clean();
    };
    InfiniteScroll.prototype.onScroll = function() {
      this.scrolled.next({});
    };
    InfiniteScroll.prototype.handleScroll = function(event) {
      this.scroller.handler();
    };
    __decorate([core_1.Input('infiniteScrollDistance'), __metadata('design:type', Number)], InfiniteScroll.prototype, "_distance", void 0);
    __decorate([core_1.Input('infiniteScrollThrottle'), __metadata('design:type', Number)], InfiniteScroll.prototype, "_throttle", void 0);
    __decorate([core_1.Input('scrollWindow'), __metadata('design:type', Boolean)], InfiniteScroll.prototype, "scrollWindow", void 0);
    __decorate([core_1.Input('immediateCheck'), __metadata('design:type', Boolean)], InfiniteScroll.prototype, "_immediate", void 0);
    __decorate([core_1.Output(), __metadata('design:type', Object)], InfiniteScroll.prototype, "scrolled", void 0);
    __decorate([core_1.HostListener('scroll', ['$event']), __metadata('design:type', Function), __metadata('design:paramtypes', [Object]), __metadata('design:returntype', void 0)], InfiniteScroll.prototype, "handleScroll", null);
    InfiniteScroll = __decorate([core_1.Directive({selector: '[infinite-scroll]'}), __metadata('design:paramtypes', [core_1.ElementRef])], InfiniteScroll);
    return InfiniteScroll;
  }());
  exports.InfiniteScroll = InfiniteScroll;
  return module.exports;
});

System.registerDynamic("src/scroller", ["rxjs/Rx"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Rx_1 = $__require('rxjs/Rx');
  var Scroller = (function() {
    function Scroller(windowElement, $interval, $elementRef, infiniteScrollCallback, infiniteScrollDistance, infiniteScrollParent, infiniteScrollThrottle, isImmediate) {
      this.windowElement = windowElement;
      this.$interval = $interval;
      this.$elementRef = $elementRef;
      this.infiniteScrollCallback = infiniteScrollCallback;
      this.infiniteScrollThrottle = infiniteScrollThrottle;
      this.isImmediate = isImmediate;
      this.isContainerWindow = this.windowElement.hasOwnProperty('document');
      this.documentElement = this.isContainerWindow ? this.windowElement.document.documentElement : null;
      this.handleInfiniteScrollDistance(infiniteScrollDistance);
      this.handleInfiniteScrollDisabled(false);
      this.defineContainer();
      this.createInterval();
    }
    Scroller.prototype.defineContainer = function() {
      if (this.isContainerWindow) {
        this.attachEvent(this.windowElement);
      } else {
        this.container = this.windowElement.nativeElement;
      }
    };
    Scroller.prototype.createInterval = function() {
      var _this = this;
      this.checkInterval = this.$interval(function() {
        if (_this.isImmediate) {
          return _this.handler();
        }
      }, 0);
    };
    Scroller.prototype.height = function(elem) {
      if (isNaN(elem.offsetHeight)) {
        return this.documentElement.clientHeight;
      } else {
        return elem.offsetHeight;
      }
    };
    Scroller.prototype.offsetTop = function(elem) {
      if (!elem.getBoundingClientRect) {
        return;
      }
      return elem.getBoundingClientRect().top + this.pageYOffset(elem);
    };
    Scroller.prototype.pageYOffset = function(elem) {
      if (isNaN(window.pageYOffset)) {
        return this.documentElement.scrollTop;
      } else if (elem.ownerDocument) {
        return elem.ownerDocument.defaultView.pageYOffset;
      } else {
        elem.offsetTop;
      }
    };
    Scroller.prototype.handler = function() {
      var container = this.calculatePoints();
      var remaining = container.totalToScroll - container.scrolledUntilNow;
      var containerBreakpoint = container.height * this.scrollDistance + 1;
      var shouldScroll = remaining <= containerBreakpoint;
      var triggerCallback = shouldScroll && this.scrollEnabled;
      var shouldClearInterval = shouldScroll && this.checkInterval;
      this.checkWhenEnabled = shouldScroll;
      if (triggerCallback) {
        this.infiniteScrollCallback();
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
      var height = this.height(this.container);
      var scrolledUntilNow = this.container.scrollTop;
      var containerTopOffset = 0;
      var offsetTop = this.offsetTop(this.container);
      if (offsetTop !== void 0) {
        containerTopOffset = offsetTop;
      }
      var totalToScroll = this.container.scrollHeight;
      return {
        height: height,
        scrolledUntilNow: scrolledUntilNow,
        totalToScroll: totalToScroll
      };
    };
    Scroller.prototype.handleInfiniteScrollDistance = function(scrollDistance) {
      return this.scrollDistance = parseFloat(scrollDistance) || 0;
    };
    Scroller.prototype.attachEvent = function(newContainer) {
      var _this = this;
      this.clean();
      this.container = newContainer;
      if (newContainer) {
        var throttle_1 = this.infiniteScrollThrottle;
        this.disposeScroll = Rx_1.Observable.fromEvent(this.container, 'scroll').debounce(function(ev) {
          return Rx_1.Observable.timer(throttle_1);
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

System.registerDynamic("angular2-infinite-scroll", ["./src/infinite-scroll", "./src/scroller"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var infinite_scroll_1 = $__require('./src/infinite-scroll');
  var scroller_1 = $__require('./src/scroller');
  __export($__require('./src/infinite-scroll'));
  __export($__require('./src/scroller'));
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {directives: [infinite_scroll_1.InfiniteScroll, scroller_1.Scroller]};
  return module.exports;
});
