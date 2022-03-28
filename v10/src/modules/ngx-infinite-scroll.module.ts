import { NgModule } from '@angular/core';

import { InfiniteScrollDirective } from './infinite-scroll.directive';

@NgModule({
  declarations: [InfiniteScrollDirective],
  exports: [InfiniteScrollDirective],
  imports: [],
  providers: []
})
export class InfiniteScrollModule { }
