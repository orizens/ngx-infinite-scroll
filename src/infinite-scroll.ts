import { Directive, ElementRef, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Scroller } from './scroller';

@Directive({
  selector: '[infinite-scroll]'
})
export class InfiniteScroll implements OnDestroy, OnInit {
  private scroller: Scroller;
  private _distance: number = 2;

  @Input() set infiniteScrollDistance(distance: number) {
    this._distance = distance;
  }

  @Output() scrolled = new EventEmitter();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    if("undefined" !== typeof window) {
      this.scroller = new Scroller(window, setInterval, this.element, this.onScroll.bind(this), this._distance, {});
    }
  }

  ngOnDestroy () {
    this.scroller.clean();
  }
  
  onScroll() {
    this.scrolled.next({});
  }
}
