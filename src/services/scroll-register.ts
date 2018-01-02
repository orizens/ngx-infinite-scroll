import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/sampleTime';

import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ContainerRef, IPositionStats, IScrollState } from '../models';
import { AxisResolver } from './axis-resolver';
import { shouldTriggerEvents, triggerEvents } from './event-trigger';
import { resolveContainerElement } from './ngx-ins-utils';
import { calculatePoints, createResolver } from './position-resolver';
import * as ScrollResolver from './scroll-resolver';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface IScrollRegisterConfig {
  container: ContainerRef;
  throttleDuration: number;
  mergeMap: Function;
  scrollHandler: (value: any) => void;
}

export interface IScroller {
  fromRoot: boolean;
  horizontal: boolean;
  disable: boolean;
  throttle: number;
  scrollWindow: boolean;
  element: ElementRef;
  scrollContainer: string | ElementRef;
  alwaysCallback: boolean;
  downDistance: number;
  upDistance: number;
  events?: {
    down: (ev) => any;
    up: (ev) => any;
  };
}

export function createScroller(config: IScroller): Subscription {
  const { scrollContainer, scrollWindow, element, fromRoot } = config;
  const resolver = createResolver({
    axis: new AxisResolver(!config.horizontal),
    windowElement: resolveContainerElement(scrollContainer, scrollWindow, element, fromRoot)
  });
  const stats = calculatePoints(element, resolver);
  const scrollState: IScrollState = {
    lastScrollPosition: 0,
    lastTotalToScroll: 0,
    totalToScroll: stats.totalToScroll,
    isTriggeredTotal: false
  };
  const options: IScrollRegisterConfig = {
    container: resolver.container,
    mergeMap: () => calculatePoints(element, resolver),
    scrollHandler: (positionStats: IPositionStats) =>
      handleOnScroll(scrollState, positionStats, config),
    throttleDuration: config.throttle
  };
  return attachScrollEvent(options);
}

export function attachScrollEvent(
  options: IScrollRegisterConfig
): Subscription {
  return Observable.fromEvent(options.container, 'scroll')
    .sampleTime(options.throttleDuration)
    .mergeMap((ev: any) => Observable.of(options.mergeMap(ev)))
    .subscribe(options.scrollHandler);
}

export function handleOnScroll(
  scrollState: IScrollState,
  positionStats: IPositionStats,
  config: IScroller
) {
  const distance = {
    down: config.downDistance,
    up: config.upDistance
  };
  const { isScrollingDown, shouldFireScrollEvent } = ScrollResolver.getScrollStats(
    scrollState.lastScrollPosition,
    positionStats,
    { distance }
  );
  const scrollConfig = {
    alwaysCallback: config.alwaysCallback,
    shouldFireScrollEvent
  };
  ScrollResolver.updateScrollState(scrollState, positionStats.scrolledUntilNow, positionStats.totalToScroll);
  const shouldTrigger = shouldTriggerEvents(scrollConfig);
  if (shouldTrigger && !scrollState.isTriggeredTotal) {
    ScrollResolver.updateTriggeredFlag(scrollState, true);
    triggerEvents(
      config.events,
      isScrollingDown,
      positionStats.scrolledUntilNow
    );
  }
}
