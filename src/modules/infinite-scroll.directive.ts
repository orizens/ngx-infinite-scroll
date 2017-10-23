import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { InfiniteScrollEvent } from '../models';
import { hasWindowDefined, inputPropChanged } from '../services/ngx-ins-utils';
import { createScroller } from '../services/scroll-register';

@Directive({
  selector: '[infiniteScroll], [infinite-scroll], [data-infinite-scroll]'
})
export class InfiniteScrollDirective
  implements OnDestroy, OnChanges, AfterViewInit {
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
  @Input() fromRoot: boolean = false;

  private disposeScroller: Subscription;

  constructor(private element: ElementRef, private zone: NgZone) {}

  ngAfterViewInit() {
    this.setup();
  }

  ngOnChanges({ infiniteScrollContainer, infiniteScrollDisabled }: SimpleChanges) {
    if (inputPropChanged(infiniteScrollContainer) || inputPropChanged(infiniteScrollDisabled)) {
      this.destroyScroller();
      this.setup();
    }
  }

  setup() {
    if (hasWindowDefined()) {
      this.zone.runOutsideAngular(() => {
        this.disposeScroller = createScroller({
          fromRoot: this.fromRoot,
          alwaysCallback: this.alwaysCallback,
          disable: this.infiniteScrollDisabled,
          downDistance: this.infiniteScrollDistance,
          element: this.element,
          events: {
            // tslint:disable-next-line:arrow-parens
            down: event => this.zone.run(() => this.scrolled.emit(event)),
            // tslint:disable-next-line:arrow-parens
            up: event => this.zone.run(() => this.scrolledUp.emit(event))
          },
          filterBefore: () => !this.infiniteScrollDisabled,
          horizontal: this.horizontal,
          scrollContainer: this.infiniteScrollContainer,
          scrollWindow: this.scrollWindow,
          throttle: this.infiniteScrollThrottle,
          upDistance: this.infiniteScrollUpDistance
        });
      });
    }
  }

  ngOnDestroy() {
    this.destroyScroller();
  }

  destroyScroller() {
    if (this.disposeScroller) {
      this.disposeScroller.unsubscribe();
    }
  }
}
