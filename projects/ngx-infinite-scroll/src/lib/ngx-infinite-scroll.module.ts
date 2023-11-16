import { NgModule } from '@angular/core';
import { InfiniteScrollDirective } from './ngx-infinite-scroll.directive';

/**
 * @deprecated Import InfiniteScrollDirective instead
 */
@NgModule({
  exports: [InfiniteScrollDirective],
  imports: [InfiniteScrollDirective],
})
export class InfiniteScrollModule {}
