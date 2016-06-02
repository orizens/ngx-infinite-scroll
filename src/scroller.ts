import { ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx'; 

export class Scroller {
	public scrollDistance: number;
	public scrollEnabled: boolean;
	public checkWhenEnabled: boolean;
	public container: Window | ElementRef | any;
	public immediateCheck: boolean;
	public useDocumentBottom: boolean;
	public checkInterval: number;
	private documentElement: Window | ElementRef | any;
	private isContainerWindow: boolean;
	private disposeScroll: Subscription;

	constructor(
		private windowElement: Window | ElementRef | any,
		private $interval: Function,
		private $elementRef: ElementRef,
		private infiniteScrollCallback: Function,
		infiniteScrollDistance: number,
		infiniteScrollParent: Window | ElementRef | any,
		private infiniteScrollThrottle: number,
		private isImmediate: boolean
		) {
		this.isContainerWindow = this.windowElement.hasOwnProperty('document');
		this.documentElement = this.isContainerWindow ? this.windowElement.document.documentElement : null;
		this.handleInfiniteScrollDistance(infiniteScrollDistance);

		// if (attrs.infiniteScrollParent != null) {
		// 	attachEvent(angular.element(elem.parent()));
		// }
		this.handleInfiniteScrollDisabled(false);
		this.defineContainer();
	}

	defineContainer () {
		if (this.isContainerWindow) {
			this.attachEvent(this.windowElement);
		} else {
			this.container = this.windowElement.nativeElement;
		}
	}

	createInterval () {
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
		const container = this.calculatePoints();
		const remaining: number = container.totalToScroll - container.scrolledUntilNow;
		const containerBreakpoint: number = container.height * this.scrollDistance + 1;
		const shouldScroll: boolean = remaining <= containerBreakpoint;
		const triggerCallback: boolean = shouldScroll && this.scrollEnabled;
		const shouldClearInterval = shouldScroll && this.checkInterval;
		// if (this.useDocumentBottom) {
		// 	container.totalToScroll = this.height(this.$elementRef.nativeElement.ownerDocument);
		// }
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

	handleInfiniteScrollDistance (scrollDistance: number | any) {
		return this.scrollDistance = parseFloat(scrollDistance) || 0;
	}

	attachEvent (newContainer: Window | ElementRef | any) {
		this.clean();
		this.container = newContainer;
		if (newContainer) {
			const throttle: number = this.infiniteScrollThrottle;
			this.disposeScroll = Observable.fromEvent(this.container, 'scroll')
				.debounce(ev => Observable.timer(throttle))
				.subscribe(ev => this.handler())
		}
	}

	clean () {
		if (this.disposeScroll) {
      this.disposeScroll.unsubscribe();
		}
	}

	handleInfiniteScrollDisabled (enableScroll: boolean) {
		this.scrollEnabled = !enableScroll;
		// if (this.scrollEnabled && checkWhenEnabled) {
		// 	checkWhenEnabled = false;
		// 	return handler();
		// }
	}
}