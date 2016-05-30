import { Directive, ElementRef, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Scroller } from './scroller';

@Directive({
  selector: '[infinite-scroll]'
})
export class InfiniteScroll implements OnDestroy, OnInit {
  private scroller: Scroller;
  private _distance: number = 2;
  private _throttle: number = 300;

  @Input() set infiniteScrollDistance(distance: number) {
    this._distance = distance;
  }

  @Input() set infiniteScrollThrottle(throttle: number) {
    this._throttle = throttle;
  }

  @Output() scrolled = new EventEmitter();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.scroller = new Scroller(window, setInterval, this.element, this.onScroll.bind(this), this._distance, {}
        , this._throttle);
  }

  ngOnDestroy () {
    this.scroller.clean();
  }
  
  onScroll() {
    this.scrolled.next({});
  }
}
