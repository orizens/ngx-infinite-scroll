import { NgModule } from '@angular/core';

import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { PositionResolver } from '../services/position-resolver';
import { ScrollRegister } from '../services/scroll-register';

@NgModule({
  declarations: [InfiniteScrollDirective],
  exports: [InfiniteScrollDirective],
  imports: [],
  providers: [
    PositionResolver,
    ScrollRegister
  ]
})
export class InfiniteScrollModule { }
