System.registerDynamic("src/infinite-scroll", ["angular2/core", "./scroller"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  var core_1 = $__require('angular2/core');
  var scroller_1 = $__require('./scroller');
  var InfiniteScroll = (function() {
    function InfiniteScroll(element) {
      this.element = element;
      this.scrolled = new core_1.EventEmitter();
    }
    Object.defineProperty(InfiniteScroll.prototype, "infiniteScrollDistance", {
      set: function(distance) {
        this._distance = distance;
      },
      enumerable: true,
      configurable: true
    });
    InfiniteScroll.prototype.ngOnInit = function() {
      this.scroller = new scroller_1.Scroller(window, setInterval, this.element, this.onScroll.bind(this), this._distance, {});
    };
    InfiniteScroll.prototype.onScroll = function() {
      this.scrolled.next({});
    };
    __decorate([core_1.Input(), __metadata('design:type', Number), __metadata('design:paramtypes', [Number])], InfiniteScroll.prototype, "infiniteScrollDistance", null);
    __decorate([core_1.Output(), __metadata('design:type', Object)], InfiniteScroll.prototype, "scrolled", void 0);
    InfiniteScroll = __decorate([core_1.Directive({selector: '[infinite-scroll]'}), __metadata('design:paramtypes', [core_1.ElementRef])], InfiniteScroll);
    return InfiniteScroll;
  })();
  exports.InfiniteScroll = InfiniteScroll;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("src/scroller", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var Scroller = (function() {
    function Scroller($window, $interval, $elementRef, infiniteScrollCallback, infiniteScrollDistance, infiniteScrollParent) {
      var THROTTLE_MILLISECONDS = 300;
      this.windowElement = $window;
      this.infiniteScrollCallback = infiniteScrollCallback;
      this.$interval = $interval;
      this.$elementRef = $elementRef;
      if (THROTTLE_MILLISECONDS != null) {
        this.handler = this.throttle(this.handler, THROTTLE_MILLISECONDS);
      }
      this.handleInfiniteScrollDistance(infiniteScrollDistance);
      var _self = this;
      this.handleInfiniteScrollDisabled(false);
      this.changeContainer(_self.windowElement);
      this.checkInterval = setInterval((function() {
        if (_self.immediateCheck) {
          return _self.handler();
        }
      }), 0);
    }
    Scroller.prototype.height = function(elem) {
      if (isNaN(elem.offsetHeight)) {
        return elem.document.documentElement.clientHeight;
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
        return elem.document.documentElement.scrollTop;
      } else {
        return elem.ownerDocument.defaultView.pageYOffset;
      }
    };
    Scroller.prototype.handler = function() {
      var containerBottom,
          containerTopOffset,
          elementBottom,
          remaining,
          shouldScroll;
      if (this.container === this.windowElement) {
        containerBottom = this.height(this.container) + this.pageYOffset(this.container.document.documentElement);
        elementBottom = this.offsetTop(this.$elementRef.nativeElement) + this.height(this.$elementRef.nativeElement);
      } else {
        containerBottom = this.height(this.container);
        containerTopOffset = 0;
        if (this.offsetTop(this.container) !== void 0) {
          containerTopOffset = this.offsetTop(this.container);
        }
        elementBottom = this.offsetTop(this.$elementRef.nativeElement) - containerTopOffset + this.height(this.$elementRef.nativeElement);
      }
      if (this.useDocumentBottom) {
        elementBottom = this.height((this.$elementRef.nativeElement.ownerDocument || this.$elementRef.nativeElement.document).documentElement);
      }
      remaining = elementBottom - containerBottom;
      shouldScroll = remaining <= this.height(this.container) * this.scrollDistance + 1;
      if (shouldScroll) {
        this.checkWhenEnabled = true;
        if (this.scrollEnabled) {
          this.infiniteScrollCallback();
        }
      } else {
        if (this.checkInterval) {
          clearInterval(this.checkInterval);
        }
        return this.checkWhenEnabled = false;
      }
    };
    Scroller.prototype.throttle = function(func, wait) {
      var later,
          previous,
          timeout;
      var _self = this;
      timeout = null;
      previous = 0;
      later = function() {
        var context;
        previous = new Date().getTime();
        clearInterval(timeout);
        timeout = null;
        func.call(_self);
        return context = null;
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
      this.container = newContainer;
      if (newContainer != null) {
        return this.container.addEventListener('scroll', this.handler.bind(this));
      }
    };
    Scroller.prototype.handleInfiniteScrollDisabled = function(v) {
      this.scrollEnabled = !v;
    };
    return Scroller;
  })();
  exports.Scroller = Scroller;
  global.define = __define;
  return module.exports;
});

System.registerDynamic("angular2-infinite-scroll", ["./src/infinite-scroll", "./src/scroller"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  global.define = __define;
  return module.exports;
});
