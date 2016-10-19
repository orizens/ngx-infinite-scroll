import { NgModule }      from '@angular/core';

import { InfiniteScroll }  from './infinite-scroll';
import { AxisResolverFactory } from './axis-resolver';
import { PositionResolverFactory } from './position-resolver';

@NgModule({
  imports:      [  ],
  declarations: [ InfiniteScroll ],
  exports:      [ InfiniteScroll ],
  providers:    [ AxisResolverFactory, PositionResolverFactory ]
})
export class InfiniteScrollModule { }
