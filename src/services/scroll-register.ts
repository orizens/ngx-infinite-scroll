import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/sampleTime';

import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { of } from 'rxjs/observable/of';

import * as Models from '../models';
import { AxisResolver } from './axis-resolver';
import { shouldTriggerEvents, IScrollConfig } from './event-trigger';
import { resolveContainerElement } from './ngx-ins-utils';
import { calculatePoints, createResolver } from './position-resolver';
import * as ScrollResolver from './scroll-resolver';

export function createScroller(config: Models.IScroller) {
  const { scrollContainer, scrollWindow, element, fromRoot } = config;
  const resolver = createResolver({
    axis: new AxisResolver(!config.horizontal),
    windowElement: resolveContainerElement(scrollContainer, scrollWindow, element, fromRoot)
  });
  const stats = calculatePoints(element, resolver);
  const scrollState: Models.IScrollState = {
    lastScrollPosition: 0,
    lastTotalToScroll: 0,
    totalToScroll: stats.totalToScroll,
    isTriggeredTotal: false
  };
  const options: Models.IScrollRegisterConfig = {
    container: resolver.container,
    throttle: config.throttle
  };
  const distance = {
    up: config.upDistance,
    down: config.downDistance
  };
  return attachScrollEvent(options)
    .mergeMap((ev: any) => of(calculatePoints(element, resolver)))
    .map((positionStats: Models.IPositionStats) =>
      toInfiniteScrollParams(scrollState.lastScrollPosition, positionStats, distance))
    .do(({ positionStats }: Models.IScrollParams) =>
      ScrollResolver.updateScrollState(
        scrollState,
        positionStats.scrolledUntilNow,
        positionStats.totalToScroll
      ))
    .filter(({ shouldFireScrollEvent }: Models.IScrollParams) =>
      shouldTriggerEvents(shouldFireScrollEvent, config.alwaysCallback, scrollState.isTriggeredTotal)
    )
    .do(() => {
      ScrollResolver.updateTriggeredFlag(scrollState, true);
    })
    .map(toInfiniteScrollAction);
}

export function attachScrollEvent(options: Models.IScrollRegisterConfig): Observable<{}> {
  return Observable
    .fromEvent(options.container, 'scroll')
    .sampleTime(options.throttle);
}

export function toInfiniteScrollParams(
  lastScrollPosition: number,
  positionStats: Models.IPositionStats,
  distance: Models.IScrollerDistance
): Models.IScrollParams {
  const { isScrollingDown, shouldFireScrollEvent } = ScrollResolver.getScrollStats(
    lastScrollPosition,
    positionStats,
    distance
  );
  return {
    isScrollingDown,
    shouldFireScrollEvent,
    positionStats
  };
}

export const InfiniteScrollActions = {
  DOWN: '[NGX_ISE] DOWN',
  UP: '[NGX_ISE] UP'
};

export function toInfiniteScrollAction(response: Models.IScrollParams): Models.IInfiniteScrollAction {
  const { isScrollingDown, positionStats: { scrolledUntilNow: currentScrollPosition } } = response;
  return {
    type: isScrollingDown ? InfiniteScrollActions.DOWN : InfiniteScrollActions.UP,
    payload: {
      currentScrollPosition
    }
  };
}
