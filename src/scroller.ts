import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AxisResolver } from './axis-resolver';
import { PositionResolver, PositionResolverFactory } from './position-resolver';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/throttle';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

export interface InfiniteScrollEvent {
  currentScrollPosition: number;
};

export class Scroller {
  public scrollDownDistance: number;
  public scrollUpDistance: number;
  public scrollEnabled: boolean;
  public checkWhenEnabled: boolean;
  public container: Window | ElementRef | any;
  public immediateCheck: boolean;
  public useDocumentBottom: boolean;
  public checkInterval: number;
  private documentElement: Window | ElementRef | any;
  private isContainerWindow: boolean;
  private disposeScroll: Subscription;
  public lastScrollPosition: number = 0;
  // private axis: AxisResolver;
  private positionResolver: PositionResolver;

  constructor(
    private windowElement: Window | ElementRef | any,
    private $interval: Function,
    private $elementRef: ElementRef,
    private infiniteScrollDownCallback: Function,
    private infiniteScrollUpCallback: Function,
    infiniteScrollDownDistance: number,
    infiniteScrollUpDistance: number,
    infiniteScrollParent: Window | ElementRef | any,
    private infiniteScrollThrottle: number,
    private isImmediate: boolean,
    private horizontal: boolean = false,
    private alwaysCallback: boolean = false,
    private scrollDisabled: boolean = false,
    private _positionResolver: PositionResolverFactory
  ) {
    this.isContainerWindow = Object.prototype.toString.call(this.windowElement).includes('Window');
    this.documentElement = this.isContainerWindow ? this.windowElement.document.documentElement : null;
    this.handleInfiniteScrollDistance(infiniteScrollDownDistance, infiniteScrollUpDistance);

    // if (attrs.infiniteScrollParent != null) {
    // 	attachEvent(angular.element(elem.parent()));
    // }
    this.handleInfiniteScrollDisabled(scrollDisabled);
    this.defineContainer();
    this.positionResolver = this._positionResolver.create({
      container: this.container,
      documentElement: this.documentElement,
      isContainerWindow: this.isContainerWindow,
      horizontal: horizontal
    });
    this.createInterval();
  }

  defineContainer () {
    if (this.isContainerWindow) {
      this.container = this.windowElement;
    } else {
      this.container = this.windowElement.nativeElement;
    }
    this.attachEvent(this.container);
  }

  createInterval () {
    if (this.isImmediate) {
      this.checkInterval = this.$interval(() => {
        return this.handler();
      }, 0);
    }
  }

  handler () {
    const container = this.positionResolver.calculatePoints(this.$elementRef);
    const scrollingDown: boolean = this.lastScrollPosition < container.scrolledUntilNow;
    this.lastScrollPosition = container.scrolledUntilNow;

    let remaining: number;
    let containerBreakpoint: number;
    if (scrollingDown) {
      remaining = container.totalToScroll - container.scrolledUntilNow;
      containerBreakpoint = container.height * this.scrollDownDistance + 1;
    } else {
      remaining = container.scrolledUntilNow;
      containerBreakpoint = container.height * this.scrollUpDistance + 1;
    }
    const shouldScroll: boolean = remaining <= containerBreakpoint;
    const triggerCallback: boolean = (this.alwaysCallback || shouldScroll) && this.scrollEnabled;
    const shouldClearInterval = !shouldScroll && this.checkInterval;
    // if (this.useDocumentBottom) {
    // 	container.totalToScroll = this.height(this.$elementRef.nativeElement.ownerDocument);
    // }
    this.checkWhenEnabled = shouldScroll;

    if (triggerCallback) {
      const infiniteScrollEvent: InfiniteScrollEvent = { 
        currentScrollPosition: container.scrolledUntilNow 
      };
      if (scrollingDown) {
        this.infiniteScrollDownCallback(infiniteScrollEvent);
      } else {
        this.infiniteScrollUpCallback(infiniteScrollEvent);
      }
    }
    if (shouldClearInterval) {
      clearInterval(this.checkInterval);
    }
  }

  handleInfiniteScrollDistance (scrollDownDistance: number | any, scrollUpDistance: number | any) {
    this.scrollDownDistance = parseFloat(scrollDownDistance) || 0;
    this.scrollUpDistance = parseFloat(scrollUpDistance) || 0;
  }

  attachEvent (newContainer: Window | ElementRef | any) {
    this.clean();
    if (newContainer) {
      const throttle: number = this.infiniteScrollThrottle;
      this.disposeScroll = Observable.fromEvent(this.container, 'scroll')
        .throttle(ev => Observable.timer(throttle))
        .filter(ev => this.scrollEnabled)
        .subscribe(ev => this.handler());
    }
  }

  clean () {
    if (this.disposeScroll) {
      this.disposeScroll.unsubscribe();
    }
  }

  handleInfiniteScrollDisabled (scrollDisabled: boolean) {
    this.scrollEnabled = !scrollDisabled;
  }
}
