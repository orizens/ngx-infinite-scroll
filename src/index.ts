import { NgModule }      from '@angular/core';

import { InfiniteScroll }  from './infinite-scroll';
import { AxisResolver } from './axis-resolver';
import { PositionResolver } from './position-resolver';

@NgModule({
  imports:      [  ],
  declarations: [ InfiniteScroll ],
  exports:      [ InfiniteScroll ],
  providers:    [ AxisResolver, PositionResolver ]
})
export class InfiniteScrollModule { }
