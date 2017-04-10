import { ElementRef } from '@angular/core';

export type ContainerRef = Window | ElementRef | any;

export interface InfiniteScrollEvent {
  currentScrollPosition: number;
};

export interface PositionElements {
  windowElement: ContainerRef;
  horizontal: boolean;
}

export interface PositionStats {
  height: number;
  scrolledUntilNow: number;
  totalToScroll: number;
}

export interface ScrollerConfig {
  distance: {
    down: number;
    up: number;
  };
  scrollParent?: ContainerRef;
}

export interface ScrollStats {
  isScrollingDown: boolean;
  shouldScroll: boolean
}
