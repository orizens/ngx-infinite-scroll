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

System.registerDynamic("src/scroller", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Scroller = (function() {
    function Scroller($window, $interval, $elementRef, infiniteScrollCallback, infiniteScrollDistance, infiniteScrollParent, infiniteScrollThrottle, isImmediate) {
      var _this = this;
      this.$window = $window;
      this.$interval = $interval;
      this.$elementRef = $elementRef;
      this.infiniteScrollCallback = infiniteScrollCallback;
      this.infiniteScrollThrottle = infiniteScrollThrottle;
      this.isImmediate = isImmediate;
      this.isContainerWindow = $window.hasOwnProperty('document');
      this.windowElement = $window;
      this.documentElement = this.isContainerWindow ? this.windowElement.document.documentElement : null;
      this.handler = this.throttle(this.handler, this.infiniteScrollThrottle);
      this.handleInfiniteScrollDistance(infiniteScrollDistance);
      this.handleInfiniteScrollDisabled(false);
      if (this.isContainerWindow) {
        this.changeContainer(this.windowElement);
      } else {
        this.container = this.windowElement.nativeElement;
      }
      this.checkInterval = this.$interval(function() {
        if (_this.isImmediate) {
          return _this.handler();
        }
      }, 0);
    }
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
      var remaining,
          containerBreakpoint,
          shouldScroll;
      var container = this.calculatePoints();
      remaining = container.totalToScroll - container.scrolledUntilNow;
      containerBreakpoint = container.height * this.scrollDistance + 1;
      shouldScroll = remaining <= containerBreakpoint;
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
    Scroller.prototype.throttle = function(func, wait) {
      var later,
          previous,
          timeout;
      var _self = this;
      timeout = null;
      previous = 0;
      later = function() {
        previous = new Date().getTime();
        clearInterval(timeout);
        timeout = null;
        func.call(_self);
      };
      return function() {
        var now,
            remaining;
        now = new Date().getTime();
        remaining = wait - (now - previous);
        if (remaining <= 0) {
          clearTimeout(timeout);
          clearInterval(timeout);
          timeout = null;
          previous = now;
          return func.call(_self);
        } else {
          if (!timeout) {
            return timeout = _self.$interval(later, remaining, 1);
          }
        }
      };
    };
    Scroller.prototype.handleInfiniteScrollDistance = function(v) {
      return this.scrollDistance = parseFloat(v) || 0;
    };
    Scroller.prototype.changeContainer = function(newContainer) {
      this.clean();
      this.container = newContainer;
      if (newContainer != null) {
        this.bindedHandler = this.handler.bind(this);
        return this.container.addEventListener('scroll', this.bindedHandler);
      }
    };
    Scroller.prototype.clean = function() {
      if (this.container !== undefined) {
        this.container.removeEventListener('scroll', this.bindedHandler);
        this.bindedHandler = null;
      }
    };
    Scroller.prototype.handleInfiniteScrollDisabled = function(isCurrentlyEnabled) {
      this.scrollEnabled = !isCurrentlyEnabled;
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
