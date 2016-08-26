import { NgModule }      from '@angular/core';

import { InfiniteScroll }  from './infinite-scroll';
import { AxisResolver } from './axis-resolver';

@NgModule({
  imports:      [  ],
  declarations: [ InfiniteScroll ],
  exports:      [ InfiniteScroll ],
  providers:    [ AxisResolver ]
})
export class InfiniteScrollModule { }
