import { Directive, ElementRef, Input, Output, HostListener, EventEmitter, OnDestroy, OnInit, NgZone } from '@angular/core';
import { Scroller } from './scroller';

@Directive({
  selector: '[infinite-scroll]'
})
export class InfiniteScroll implements OnDestroy, OnInit {
  public scroller: Scroller;

  @Input('infiniteScrollDistance') _distanceDown: number = 2;
  @Input('infiniteScrollUpDistance') _distanceUp: number = 1.5;
  @Input('infiniteScrollThrottle') _throttle: number = 3;
  @Input('scrollWindow') scrollWindow: boolean = true;
  @Input('immediateCheck') _immediate: boolean = false;
  @Input('horizontal') _horizontal: boolean = false;
  @Input('alwaysCallback') _alwaysCallback: boolean = false;

  @Output() scrolled = new EventEmitter();
  @Output() scrolledUp = new EventEmitter();

  constructor(private element: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    const containerElement = this.scrollWindow ? window : this.element;
    this.scroller = new Scroller(containerElement, setInterval, this.element,
        this.onScrollDown.bind(this), this.onScrollUp.bind(this),
        this._distanceDown, this._distanceUp, {}, this._throttle,
        this._immediate, this._horizontal, this._alwaysCallback);
  }

  ngOnDestroy () {
    this.scroller.clean();
  }

  onScrollDown(data = {}) {
    this.zone.run(() => this.scrolled.next(data));
  }

  onScrollUp(data = {}) {
    this.zone.run(() => this.scrolledUp.next(data));
  }
}
