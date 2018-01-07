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

export function shouldTriggerEvents(
  alwaysCallback: boolean,
  shouldFireScrollEvent: boolean,
  isTriggeredCurrentTotal: boolean) {
  return (alwaysCallback || shouldFireScrollEvent) && !isTriggeredCurrentTotal;
}
