import { IScrollState, IScrollerDistance } from '../../models';

export class ScrollState implements IScrollState {
  lastScrollPosition = 0;
  lastTotalToScroll = 0;
  totalToScroll = 0;
  triggered: IScrollerDistance = {
    down: 0,
    up: 0,
  };

  constructor(attrs: Partial<ScrollState>) {
    Object.assign(this, attrs);
  }

  updateScrollPosition(position: number) {
    return (this.lastScrollPosition = position);
  }

  updateTotalToScroll(totalToScroll: number) {
    if (this.lastTotalToScroll !== totalToScroll) {
      this.lastTotalToScroll = this.totalToScroll;
      this.totalToScroll = totalToScroll;
    }
  }

  updateScroll(scrolledUntilNow: number, totalToScroll: number) {
    this.updateScrollPosition(scrolledUntilNow);
    this.updateTotalToScroll(totalToScroll);
  }

  updateTriggeredFlag(scroll: number, isScrollingDown: boolean) {
    if (isScrollingDown) {
      this.triggered.down = scroll;
    } else {
      this.triggered.up = scroll;
    }
  }

  isTriggeredScroll(totalToScroll: number, isScrollingDown: boolean) {
    return isScrollingDown
      ? this.triggered.down === totalToScroll
      : this.triggered.up === totalToScroll;
  }
}
