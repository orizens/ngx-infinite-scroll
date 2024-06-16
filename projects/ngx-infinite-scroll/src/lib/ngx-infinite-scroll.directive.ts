import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  inject,
  input,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { IInfiniteScrollEvent, IInfiniteScrollAction } from '../models';
import { inputPropChanged } from './services/ngx-ins-utils';
import {
  createScroller,
  InfiniteScrollActions,
} from './services/scroll-register';

@Directive({
  selector: '[infiniteScroll], [infinite-scroll], [data-infinite-scroll]',
  standalone: true,
})
export class InfiniteScrollDirective
  implements OnDestroy, OnChanges, AfterViewInit
{
  @Output() scrolled = new EventEmitter<IInfiniteScrollEvent>();
  @Output() scrolledUp = new EventEmitter<IInfiniteScrollEvent>();

  infiniteScrollDistance = input(2);
  infiniteScrollUpDistance = input(1.5);
  infiniteScrollThrottle = input(150);
  infiniteScrollDisabled = input(false);
  infiniteScrollContainer = input<any>(null);
  scrollWindow = input(true);
  immediateCheck = input(false);
  horizontal = input(false);
  alwaysCallback = input(false);
  fromRoot = input(false);

  private disposeScroller?: Subscription;

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor(private element: ElementRef, private zone: NgZone) {}

  ngAfterViewInit() {
    if (!this.infiniteScrollDisabled()) {
      this.setup();
    }
  }

  ngOnChanges({
    infiniteScrollContainer,
    infiniteScrollDisabled,
    infiniteScrollDistance,
  }: SimpleChanges) {
    const containerChanged = inputPropChanged(infiniteScrollContainer);
    const disabledChanged = inputPropChanged(infiniteScrollDisabled);
    const distanceChanged = inputPropChanged(infiniteScrollDistance);
    const shouldSetup =
      (!disabledChanged && !this.infiniteScrollDisabled) ||
      (disabledChanged && !infiniteScrollDisabled.currentValue) ||
      distanceChanged;

    if (containerChanged || disabledChanged || distanceChanged) {
      this.destroyScroller();
      if (shouldSetup) {
        this.setup();
      }
    }
  }

  ngOnDestroy() {
    this.destroyScroller();
  }

  private setup() {
    if (!this.isBrowser) {
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.disposeScroller = createScroller({
        fromRoot: this.fromRoot(),
        alwaysCallback: this.alwaysCallback(),
        disable: this.infiniteScrollDisabled(),
        downDistance: this.infiniteScrollDistance(),
        element: this.element,
        horizontal: this.horizontal(),
        scrollContainer: this.infiniteScrollContainer(),
        scrollWindow: this.scrollWindow(),
        throttle: this.infiniteScrollThrottle(),
        upDistance: this.infiniteScrollUpDistance(),
      }).subscribe((payload) => this.handleOnScroll(payload));
    });
  }

  private handleOnScroll({ type, payload }: IInfiniteScrollAction) {
    const emitter =
      type === InfiniteScrollActions.DOWN ? this.scrolled : this.scrolledUp;

    if (hasObservers(emitter)) {
      this.zone.run(() => emitter.emit(payload));
    }
  }

  private destroyScroller() {
    if (this.disposeScroller) {
      this.disposeScroller.unsubscribe();
    }
  }
}

function hasObservers<T>(emitter: EventEmitter<T>): boolean {
  // Note: The `observed` property is available only in RxJS@7.2.0, which means it's
  // not available for users running the lower version.
  return emitter.observed ?? emitter.observers.length > 0;
}
