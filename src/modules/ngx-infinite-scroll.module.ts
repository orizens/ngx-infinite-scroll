import { NgModule } from '@angular/core';

import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { PositionResolver } from '../services/position-resolver';
import { ScrollRegister } from '../services/scroll-register';
import { ScrollResolver } from '../services/scroll-resolver';

@NgModule({
  declarations: [InfiniteScrollDirective],
  exports: [InfiniteScrollDirective],
  imports: [],
  providers: [
    PositionResolver,
    ScrollRegister,
    ScrollResolver
  ]
})
export class InfiniteScrollModule { }
