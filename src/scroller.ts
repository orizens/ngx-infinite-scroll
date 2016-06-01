import { ElementRef } from '@angular/core';

export class Scroller {
	public scrollDistance: number;
	public scrollEnabled: boolean;
	public checkWhenEnabled: boolean;
	public container: any;
	public immediateCheck: boolean;
	public useDocumentBottom: boolean;
	public checkInterval: any;
	public windowElement: any;
	private bindedHandler: Function;
	private documentElement: any;
	private isContainerWindow: boolean;

	constructor(
		private $window: any,
		private $interval: any,
		private $elementRef: ElementRef,
		private infiniteScrollCallback: Function,
		infiniteScrollDistance: number,
		infiniteScrollParent: any,
		private infiniteScrollThrottle: number,
		private isImmediate: boolean
		) {
		this.isContainerWindow = $window.hasOwnProperty('document');
		this.windowElement = $window;
		this.documentElement = this.isContainerWindow ? this.windowElement.document.documentElement : null;

		this.handler = this.throttle(this.handler, this.infiniteScrollThrottle);
		this.handleInfiniteScrollDistance(infiniteScrollDistance);

		// if (attrs.infiniteScrollParent != null) {
		// 	changeContainer(angular.element(elem.parent()));
		// }
		this.handleInfiniteScrollDisabled(false);
		if (this.isContainerWindow) {
			this.changeContainer(this.windowElement);
		} else {
			this.container = this.windowElement.nativeElement;
		}
		
		this.checkInterval = this.$interval(() => {
			if (this.isImmediate) {
				return this.handler();
			}
		}, 0);
	}

	height (elem: any) {
		// elem = elem.nativeElement;
		if (isNaN(elem.offsetHeight)) {
			return this.documentElement.clientHeight;
		} else {
			return elem.offsetHeight;
		}
	}

	offsetTop (elem: any) {
		// elem = elem.nativeElement;
		if (!elem.getBoundingClientRect) { // || elem.css('none')) {
			return;
		}
		return elem.getBoundingClientRect().top + this.pageYOffset(elem);
	}

	pageYOffset (elem: any) {
		// elem = elem.nativeElement;
		if (isNaN(window.pageYOffset)) {
			return this.documentElement.scrollTop;
		} else if (elem.ownerDocument) {
			return elem.ownerDocument.defaultView.pageYOffset;
		} else {
			elem.offsetTop;
		}
	}

	handler () {
		let remaining: number,
			containerBreakpoint: number,
			shouldScroll: boolean;
		const container = this.calculatePoints();
		
		// if (this.useDocumentBottom) {
		// 	container.totalToScroll = this.height(this.$elementRef.nativeElement.ownerDocument);
		// }
		remaining = container.totalToScroll - container.scrolledUntilNow;
		containerBreakpoint = container.height * this.scrollDistance + 1;
		shouldScroll = remaining <= containerBreakpoint;
		const triggerCallback = shouldScroll && this.scrollEnabled;
		const shouldClearInterval = shouldScroll && this.checkInterval;
		this.checkWhenEnabled = shouldScroll;
		if (triggerCallback) {
			this.infiniteScrollCallback();
		}
		if (shouldClearInterval) {
			clearInterval(this.checkInterval);
		}
	}

	calculatePoints() {
		return this.isContainerWindow
			? this.calculatePointsForWindow()
			: this.calculatePointsForElement();
	}

	calculatePointsForWindow () {
		// container's height
		const height = this.height(this.container);
		// scrolled until now / current y point
		const scrolledUntilNow = height + this.pageYOffset(this.documentElement);
		// total height / most bottom y point
		const totalToScroll = this.offsetTop(this.$elementRef.nativeElement) + this.height(this.$elementRef.nativeElement);
		return { height, scrolledUntilNow, totalToScroll };
	}

	calculatePointsForElement () {
		const height = this.height(this.container);
		// perhaps use this.container.offsetTop instead of 'scrollTop'
		const scrolledUntilNow = this.container.scrollTop;
		let containerTopOffset = 0;
		const offsetTop = this.offsetTop(this.container)
		if (offsetTop !== void 0) {
			containerTopOffset = offsetTop;
		}
		const totalToScroll = this.container.scrollHeight;
		// const totalToScroll = this.offsetTop(this.$elementRef.nativeElement) - containerTopOffset + this.height(this.$elementRef.nativeElement);
		return { height, scrolledUntilNow, totalToScroll };
	}

	throttle (func: Function, wait: number) {
		var later: Function, previous: number, timeout: number;
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
			var now: number, remaining: number;
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
	}

	handleInfiniteScrollDistance (v) {
		return this.scrollDistance = parseFloat(v) || 0;
	}

	changeContainer (newContainer: Window) {
		this.clean();
		this.container = newContainer;
		if (newContainer != null) {
			this.bindedHandler = this.handler.bind(this);
            return this.container.addEventListener('scroll', this.bindedHandler);
		}
	}

	clean () {
		if (this.container !== undefined) {
            this.container.removeEventListener('scroll', this.bindedHandler);
            this.bindedHandler = null;
		}
	}

	handleInfiniteScrollDisabled (isCurrentlyEnabled: boolean) {
		this.scrollEnabled = !isCurrentlyEnabled;
		// if (this.scrollEnabled && checkWhenEnabled) {
		// 	checkWhenEnabled = false;
		// 	return handler();
		// }
	}
}