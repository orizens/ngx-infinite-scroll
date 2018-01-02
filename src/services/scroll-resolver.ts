import { IPositionStats, IScrollerConfig, IScrollState } from '../models';

export function shouldFireScrollEvent(
  container: IPositionStats,
  config: IScrollerConfig,
  scrollingDown: boolean
) {
  const distance = config.distance;
  let remaining: number;
  let containerBreakpoint: number;
  if (scrollingDown) {
    remaining = (container.totalToScroll - container.scrolledUntilNow) / container.totalToScroll;
    containerBreakpoint = distance.down / 10;
  } else {
    remaining = container.scrolledUntilNow / container.totalToScroll;
    containerBreakpoint = distance.up / 10;
  }

  const shouldFireEvent: boolean = remaining <= containerBreakpoint;
  return shouldFireEvent;
}

export function isScrollingDownwards(
  lastScrollPosition: number,
  container: IPositionStats
) {
  return lastScrollPosition < container.scrolledUntilNow;
}

export function getScrollStats(
  lastScrollPosition: number,
  container: IPositionStats,
  config: IScrollerConfig
) {
  const isScrollingDown = isScrollingDownwards(lastScrollPosition, container);
  return {
    shouldFireScrollEvent: shouldFireScrollEvent(container, config, isScrollingDown),
    isScrollingDown
  };
}

export function updateScrollPosition(position: number, scrollState: IScrollState) {
  return (scrollState.lastScrollPosition = position);
}

export function updateTotalToScroll(totalToScroll: number, scrollState: IScrollState) {
  scrollState.lastTotalToScroll = scrollState.totalToScroll;
  scrollState.totalToScroll = totalToScroll;
}

export function isSameTotalToScroll(scrollState) {
  return scrollState.totalToScroll === scrollState.lastTotalToScroll;
}

export function updateTriggeredFlag(scrollState, triggered: boolean) {
  scrollState.isTriggeredTotal = triggered;
}

export function updateScrollState(scrollState: IScrollState, scrolledUntilNow: number, totalToScroll: number) {
  updateScrollPosition(scrolledUntilNow, scrollState);
  updateTotalToScroll(totalToScroll, scrollState);
  const isSameTotal = isSameTotalToScroll(scrollState);
  if (!isSameTotal) {
    updateTriggeredFlag(scrollState, false);
  }
}
