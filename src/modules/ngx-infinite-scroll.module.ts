import { NgModule } from '@angular/core';

import { InfiniteScroll } from './infinite-scroll.directive';
import { AxisResolverFactory } from '../services/axis-resolver';
import { PositionResolverFactory } from '../services/position-resolver';
import { ScrollRegister } from '../services/scroll-register';
import { ScrollResolver } from '../services/scroll-resolver';

@NgModule({
  declarations: [InfiniteScroll],
  exports: [InfiniteScroll],
  imports: [],
  providers: [
    AxisResolverFactory,
    PositionResolverFactory,
    ScrollRegister,
    ScrollResolver
  ]
})
export class InfiniteScrollModule { }
