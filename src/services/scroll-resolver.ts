import { IPositionStats, IScrollState, IScrollerDistance } from '../models';

export function shouldFireScrollEvent(
  container: IPositionStats,
  distance: IScrollerDistance,
  scrollingDown: boolean
) {
  let remaining: number;
  let containerBreakpoint: number;
  if (container.totalToScroll <= 0) {
    return false;
  }
  const scrolledUntilNow = container.height + container.scrolled;
  if (scrollingDown) {
    remaining =
      (container.totalToScroll - scrolledUntilNow) / container.totalToScroll;
    containerBreakpoint = distance.down / 10;
  } else {
    const totalHiddenContentHeight =
      container.scrolled + (container.totalToScroll - scrolledUntilNow);
    remaining = container.scrolled / totalHiddenContentHeight;
    containerBreakpoint = distance.up / 10;
  }

  const shouldFireEvent: boolean = remaining <= containerBreakpoint;
  return shouldFireEvent;
}

export function isScrollingDownwards(
  lastScrollPosition: number,
  container: IPositionStats
) {
  return lastScrollPosition < container.scrolled;
}

export function getScrollStats(
  lastScrollPosition: number,
  container: IPositionStats,
  distance: IScrollerDistance
) {
  const scrollDown = isScrollingDownwards(lastScrollPosition, container);
  return {
    fire: shouldFireScrollEvent(container, distance, scrollDown),
    scrollDown
  };
}

export function updateScrollPosition(
  position: number,
  scrollState: IScrollState
) {
  return (scrollState.lastScrollPosition = position);
}

export function updateTotalToScroll(
  totalToScroll: number,
  scrollState: IScrollState
) {
  if (scrollState.lastTotalToScroll !== totalToScroll) {
    scrollState.lastTotalToScroll = scrollState.totalToScroll;
    scrollState.totalToScroll = totalToScroll;
  }
}

export function isSameTotalToScroll(scrollState: IScrollState) {
  return scrollState.totalToScroll === scrollState.lastTotalToScroll;
}

export function updateTriggeredFlag(
  scroll,
  scrollState: IScrollState,
  triggered: boolean,
  isScrollingDown: boolean
) {
  if (isScrollingDown) {
    scrollState.triggered.down = scroll;
  } else {
    scrollState.triggered.up = scroll;
  }
}

export function isTriggeredScroll(
  totalToScroll,
  scrollState: IScrollState,
  isScrollingDown: boolean
) {
  return isScrollingDown
    ? scrollState.triggered.down === totalToScroll
    : scrollState.triggered.up === totalToScroll;
}

export function updateScrollState(
  scrollState: IScrollState,
  scrolledUntilNow: number,
  totalToScroll: number
) {
  updateScrollPosition(scrolledUntilNow, scrollState);
  updateTotalToScroll(totalToScroll, scrollState);
  // const isSameTotal = isSameTotalToScroll(scrollState);
  // if (!isSameTotal) {
  //   updateTriggeredFlag(scrollState, false, isScrollingDown);
  // }
}
