import { PositionStats, ScrollerConfig } from './models';
import { Injectable } from '@angular/core';

@Injectable()
export class ScrollResolver {
  public lastScrollPosition: number = 0;

  shouldScroll (container: PositionStats, config: ScrollerConfig, scrollingDown: boolean) {
    const distance = config.distance;
    let remaining: number;
    let containerBreakpoint: number;
    if (scrollingDown) {
      remaining = container.totalToScroll - container.scrolledUntilNow;
      containerBreakpoint = container.height * distance.down + 1;
    } else {
      remaining = container.scrolledUntilNow;
      containerBreakpoint = container.height * distance.up + 1;
    }
    const shouldScroll: boolean = remaining <= containerBreakpoint;
    console.log({containerBreakpoint, container, remaining });
    this.lastScrollPosition = container.scrolledUntilNow;
    return shouldScroll;
  }

  isScrollingDown (container: PositionStats) {
    return this.lastScrollPosition < container.scrolledUntilNow;
  }

  getScrollStats (container: PositionStats, config: ScrollerConfig) {
    const isScrollingDown = this.isScrollingDown(container);
    const shouldScroll = this.shouldScroll(container, config, isScrollingDown);
    return { isScrollingDown, shouldScroll };
  }
}
