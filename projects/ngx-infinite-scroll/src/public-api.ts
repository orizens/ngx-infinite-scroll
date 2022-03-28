/*
 * Public API Surface of ngx-infinite-scroll
 */

export * from './lib/ngx-infinite-scroll.service';
export { InfiniteScrollDirective } from './lib/ngx-infinite-scroll.directive';
export { InfiniteScrollModule } from './lib/ngx-infinite-scroll.module';
export {
  ContainerRef,
  IInfiniteScrollEvent,
  IPositionElements,
  IPositionStats,
  IResolver,
} from './models';
