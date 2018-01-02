import { InfiniteScrollEvent, IPositionStats } from '../models';

export interface IScrollerProps {
  container: IPositionStats;
  down: number;
  up: number;
  alwaysCallback: boolean;
  disabled: boolean;
}

export interface ITriggerEvents {
  down: (event: any) => any;
  up: (event: any) => any;
}

export interface IDistanceRange {
  down: number;
  up: number;
}

export interface IScrollConfig {
  alwaysCallback: boolean;
  shouldFireScrollEvent: boolean;
}

export function shouldTriggerEvents({ alwaysCallback, shouldFireScrollEvent }: IScrollConfig) {
  return (alwaysCallback || shouldFireScrollEvent);
}

export function triggerEvents(
  callbacks: ITriggerEvents,
  isScrollingDown: boolean,
  scrolledUntilNow: number
) {
  const eventData: InfiniteScrollEvent = {
    currentScrollPosition: scrolledUntilNow
  };
  const callback = isScrollingDown ? callbacks.down : callbacks.up;
  callback(eventData);
}
