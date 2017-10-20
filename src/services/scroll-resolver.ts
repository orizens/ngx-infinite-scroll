import { IPositionStats, IScrollerConfig } from '../models';

export function shouldScroll(
  container: IPositionStats,
  config: IScrollerConfig,
  scrollingDown: boolean
) {
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
  return shouldScroll;
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
    shouldScroll: shouldScroll(container, config, isScrollingDown),
    isScrollingDown
  };
}

export function updateScrollPosition(position: number, lastPositionState) {
  return (lastPositionState.last = position);
}
