import { Directive, ElementRef, Input, Output, HostListener, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Scroller } from './scroller';

@Directive({
  selector: '[infinite-scroll]'
})
export class InfiniteScroll implements OnDestroy, OnInit {
  private scroller: Scroller;

  @Input('infiniteScrollDistance') _distance: number = 2;
  @Input('infiniteScrollThrottle') _throttle: number = 3;
  @Input('scrollWindow') scrollWindow: boolean = true;
  @Input('immediateCheck') _immediate: boolean = false;

  @Output() scrolled = new EventEmitter();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const containerElement = this.scrollWindow ? window : this.element;
    this.scroller = new Scroller(containerElement, setInterval, this.element, this.onScroll.bind(this), this._distance, {}
        , this._throttle, this._immediate);
  }

  ngOnDestroy () {
    this.scroller.clean();
  }
  
  onScroll() {
    this.scrolled.next({});
  }

  @HostListener('scroll', ['$event'])
  handleScroll(event: any) {
    this.scroller.handler();
  }
}
