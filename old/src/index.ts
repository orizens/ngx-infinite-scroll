import { NgModule } from '@angular/core';

import { InfiniteScroll } from './infinite-scroll';
import { AxisResolverFactory } from './axis-resolver';
import { PositionResolverFactory } from './position-resolver';
import { ScrollRegister } from './scroll-register';
import { ScrollResolver } from './scroll-resolver';

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
