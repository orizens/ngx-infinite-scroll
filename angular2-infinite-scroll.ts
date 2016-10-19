import { InfiniteScroll } from './src/infinite-scroll';
import { Scroller } from './src/scroller';
import { PositionResolver } from './src/position-resolver';
import { AxisResolver } from './src/axis-resolver';

export * from './src/infinite-scroll';
export * from './src/scroller';
export * from './src/position-resolver';
export * from './src/axis-resolver';
export * from './src/index';

export default {
	directives: [ InfiniteScroll, Scroller, AxisResolver, PositionResolver ]
}