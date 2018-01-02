import { ElementRef } from '@angular/core';

export type ContainerRef = Window | ElementRef | any;

export interface InfiniteScrollEvent {
  currentScrollPosition: number;
}

export interface IPositionElements {
  windowElement: ContainerRef;
  axis: any;
}

export interface IPositionStats {
  height: number;
  scrolledUntilNow: number;
  totalToScroll: number;
}

export interface IScrollerConfig {
  distance: {
    down: number;
    up: number;
  };
  scrollParent?: ContainerRef;
}

export interface IScrollStats {
  isScrollingDown: boolean;
  shouldScroll: boolean;
}

export interface IScrollState {
  lastTotalToScroll: number;
  totalToScroll: number;
  isTriggeredTotal: boolean;
  lastScrollPosition: number;
}

export interface IResolver {
  container: ContainerRef;
  isWindow: boolean;
  axis: any;
}
