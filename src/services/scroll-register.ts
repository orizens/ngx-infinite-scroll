import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/sampleTime';

import { ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ContainerRef, IPositionStats } from '../models';
import { AxisResolver } from './axis-resolver';
import { shouldTriggerEvents, triggerEvents } from './event-trigger';
import { resolveContainerElement } from './ngx-ins-utils';
import { calculatePoints, createResolver, isElementWindow } from './position-resolver';
import { getScrollStats, updateScrollPosition } from './scroll-resolver';

export interface IScrollRegisterConfig {
  container: ContainerRef;
  throttleDuration: number;
  filterBefore: () => boolean;
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
  filterBefore: () => boolean;
  alwaysCallback: boolean;
  downDistance: number;
  upDistance: number;
  events?: {
    down: (ev) => any;
    up: (ev) => any;
  };
}

export function attachScrollEvent(
  options: IScrollRegisterConfig
): Subscription {
  return Observable.fromEvent(options.container, 'scroll')
    .sampleTime(options.throttleDuration)
    .filter(options.filterBefore)
    .mergeMap((ev: any) => Observable.of(options.mergeMap(ev)))
    .subscribe(options.scrollHandler);
}

export function createScroller(config: IScroller): Subscription {
  const containerElement = resolveContainerElement(
    config.scrollContainer,
    config.scrollWindow,
    config.element,
    config.fromRoot
  );
  const resolver = createResolver({
    axis: new AxisResolver(!config.horizontal),
    isWindow: isElementWindow(containerElement),
    windowElement: containerElement
  });
  const scrollPosition = {
    last: 0
  };
  const options: IScrollRegisterConfig = {
    container: resolver.container,
    filterBefore: config.filterBefore,
    mergeMap: () => calculatePoints(config.element, resolver),
    scrollHandler: (positionStats: IPositionStats) =>
      handleOnScroll(scrollPosition, positionStats, config),
    throttleDuration: config.throttle
  };
  return attachScrollEvent(options);
}

export function handleOnScroll(
  scrollPosition,
  positionStats: IPositionStats,
  config: IScroller
) {
  const distance = {
    down: config.downDistance,
    up: config.upDistance
  };
  const { isScrollingDown, shouldScroll } = getScrollStats(
    scrollPosition.last,
    positionStats,
    {
      distance
    }
  );
  const scrollConfig = {
    alwaysCallback: config.alwaysCallback,
    disable: config.disable,
    shouldScroll
  };
  updateScrollPosition(positionStats.scrolledUntilNow, scrollPosition);
  if (shouldTriggerEvents(scrollConfig)) {
    triggerEvents(
      config.events,
      isScrollingDown,
      positionStats.scrolledUntilNow
    );
  }
}
