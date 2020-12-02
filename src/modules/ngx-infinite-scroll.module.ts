import { NgModule } from '@angular/core';
import { InfiniteScrollComponent } from './infinite-scroll-container.component';

import { InfiniteScrollDirective } from './infinite-scroll.directive';

@NgModule({
  declarations: [InfiniteScrollDirective, InfiniteScrollComponent],
  exports: [InfiniteScrollDirective, InfiniteScrollComponent],
  imports: [],
  providers: [],
})
export class InfiniteScrollModule {}
