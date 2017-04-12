import { NgModule } from '@angular/core';

import { InfiniteScroll } from './infinite-scroll';
import { AxisResolverFactory } from '../services/axis-resolver';
import { PositionResolverFactory } from '../services/position-resolver';
import { ScrollRegister } from '../services/scroll-register';
import { ScrollResolver } from '../services/scroll-resolver';

@NgModule({
  imports: [],
  declarations: [InfiniteScroll],
  exports: [InfiniteScroll],
  providers: [
    AxisResolverFactory,
    PositionResolverFactory,
    ScrollRegister,
    ScrollResolver
  ]
})
export class InfiniteScrollModule { }
