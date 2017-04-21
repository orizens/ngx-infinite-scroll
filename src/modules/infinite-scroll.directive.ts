import { InfiniteScrollEvent, ScrollStats, PositionStats } from '../models';
import {
  Directive, ElementRef, Input, Output,
  EventEmitter, OnDestroy, OnInit,
  SimpleChanges, NgZone
} from '@angular/core';
import { PositionResolverFactory } from '../services/position-resolver';
import { ScrollRegister, ScrollRegisterConfig } from '../services/scroll-register';
import { ScrollResolver } from '../services/scroll-resolver';
import { Subscription } from 'rxjs/Subscription';

@Directive({
  selector: '[infiniteScroll], [infinite-scroll], [data-infinite-scroll]'
})
export class InfiniteScrollDirective implements OnDestroy, OnInit {
  @Output() scrolled = new EventEmitter<InfiniteScrollEvent>();
  @Output() scrolledUp = new EventEmitter<InfiniteScrollEvent>();

  @Input() infiniteScrollDistance: number = 2;
  @Input() infiniteScrollUpDistance: number = 1.5;
  @Input() infiniteScrollThrottle: number = 300;
  @Input() infiniteScrollDisabled: boolean = false;
  @Input() infiniteScrollContainer: any = null;
  @Input() scrollWindow: boolean = true;
  @Input() immediateCheck: boolean = false;
  @Input() horizontal: boolean = false;
  @Input() alwaysCallback: boolean = false;

  private disposeScroller: Subscription;

  constructor(
    private element: ElementRef,
    private zone: NgZone,
    private positionResolverFactory: PositionResolverFactory,
    private scrollRegister: ScrollRegister,
    private scrollerResolver: ScrollResolver
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const containerElement = this.resolveContainerElement();
      const positionResolver = this.positionResolverFactory.create({
        horizontal: this.horizontal,
        windowElement: containerElement
      });
      const options: ScrollRegisterConfig = {
        container: positionResolver.container,
        filterBefore: () => !this.infiniteScrollDisabled,
        mergeMap: () => positionResolver.calculatePoints(this.element),
        scrollHandler: (container: PositionStats) => this.handleOnScroll(container),
        throttleDuration: this.infiniteScrollThrottle
      };
      this.disposeScroller = this.scrollRegister.attachEvent(options);
    }
  }

  handleOnScroll(container: PositionStats) {
    const scrollResolverConfig = {
      distance: {
        down: this.infiniteScrollDistance,
        up: this.infiniteScrollUpDistance
      }
    };
    const scrollStats: ScrollStats = this.scrollerResolver.getScrollStats(container, scrollResolverConfig);
    if (this.shouldTriggerEvents(scrollStats.shouldScroll)) {
      const infiniteScrollEvent: InfiniteScrollEvent = {
        currentScrollPosition: container.scrolledUntilNow
      };
      if (scrollStats.isScrollingDown) {
        this.onScrollDown(infiniteScrollEvent);
      } else {
        this.onScrollUp(infiniteScrollEvent);
      }
    }
  }

  shouldTriggerEvents(shouldScroll: boolean) {
    return (this.alwaysCallback || shouldScroll) && !this.infiniteScrollDisabled;
  }

  ngOnDestroy () {
    if (this.disposeScroller) {
      this.disposeScroller.unsubscribe();
    }
  }

  onScrollDown(data: InfiniteScrollEvent = { currentScrollPosition: 0 }) {
    this.zone.run(() => this.scrolled.emit(data));
  }

  onScrollUp(data: InfiniteScrollEvent = { currentScrollPosition: 0 }) {
    this.zone.run(() => this.scrolledUp.emit(data));
  }

  private resolveContainerElement(): any {
    const selector = this.infiniteScrollContainer;
    const hasWindow = window && window.hasOwnProperty('document');
    const containerIsString = selector && hasWindow && typeof(this.infiniteScrollContainer) === 'string';
    let container = containerIsString
      ? window.document.querySelector(selector)
      : selector;
    if (!selector) {
      container = this.scrollWindow ? window : this.element;
    }
    return container;
  }
}
