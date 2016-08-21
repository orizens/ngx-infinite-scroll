import { Directive, ElementRef, Input, Output, EventEmitter, OnDestroy, OnInit, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { Scroller } from './scroller';
import { AxisResolver } from './axis-resolver';

@Directive({
  selector: '[infinite-scroll]'
})
export class InfiniteScroll implements OnDestroy, OnInit, OnChanges {
  public scroller: Scroller;

  @Input('infiniteScrollDistance') _distanceDown: number = 2;
  @Input('infiniteScrollUpDistance') _distanceUp: number = 1.5;
  @Input('infiniteScrollThrottle') _throttle: number = 300;
  @Input('infiniteScrollDisabled') _disabled: boolean = false;
  @Input('scrollWindow') scrollWindow: boolean = true;
  @Input('immediateCheck') _immediate: boolean = false;
  @Input('horizontal') _horizontal: boolean = false;
  @Input('alwaysCallback') _alwaysCallback: boolean = false;

  @Output() scrolled = new EventEmitter();
  @Output() scrolledUp = new EventEmitter();

  constructor(
    private element: ElementRef,
    private zone: NgZone,
    private axis: AxisResolver
  ) {}

  ngOnInit() {
    const containerElement = this.scrollWindow ? window : this.element;
    this.scroller = new Scroller(containerElement, setInterval, this.element,
        this.onScrollDown.bind(this), this.onScrollUp.bind(this),
        this._distanceDown, this._distanceUp, {}, this._throttle,
        this._immediate, this._horizontal, this._alwaysCallback,
        this._disabled, this.axis);
  }

  ngOnDestroy () {
    if (this.scroller) {
      this.scroller.clean();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['_disabled'] && this.scroller){
      this.scroller.handleInfiniteScrollDisabled(changes['_disabled'].currentValue);
    }
  }

  onScrollDown(data = {}) {
    this.zone.run(() => this.scrolled.next(data));
  }

  onScrollUp(data = {}) {
    this.zone.run(() => this.scrolledUp.next(data));
  }
}
