import { IPositionStats, IScrollerConfig } from '../models';
import { Injectable } from '@angular/core';

@Injectable()
export class ScrollResolver {
  public lastScrollPosition: number = 0;

  shouldScroll (container: IPositionStats, config: IScrollerConfig, scrollingDown: boolean) {
    const distance = config.distance;
    const scrollUpBy = config.scrollUpBy;
    let remaining: number;
    let containerBreakpoint: number;
    if (scrollingDown) {
      containerBreakpoint = container.height * distance.down + 1;
      remaining = container.totalToScroll - container.scrolledUntilNow;
    } else {
      containerBreakpoint = container.height * distance.up + 1;
      if (scrollUpBy === false) {
        remaining = container.scrolledUntilNow;
      } else {
        remaining = this.lastScrollPosition - container.scrolledUntilNow;
      }
    }
    const shouldScroll: boolean = remaining <= containerBreakpoint;
    this.lastScrollPosition = container.scrolledUntilNow;
    return shouldScroll;
  }

  isScrollingDown (container: IPositionStats) {
    return this.lastScrollPosition < container.scrolledUntilNow;
  }

  getScrollStats (container: IPositionStats, config: IScrollerConfig) {
    const isScrollingDown = this.isScrollingDown(container);
    const shouldScroll = this.shouldScroll(container, config, isScrollingDown);
    return { isScrollingDown, shouldScroll };
  }
}
