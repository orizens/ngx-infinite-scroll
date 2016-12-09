import { InfiniteScroll } from './src/infinite-scroll';
import { Scroller } from './src/scroller';
import { PositionResolver } from './src/position-resolver';
import { AxisResolver } from './src/axis-resolver';

export { InfiniteScroll } from './src/infinite-scroll';
export { Scroller, InfiniteScrollEvent } from './src/scroller';
export { PositionResolver, PositionResolverFactory, PositionElements } from './src/position-resolver';
export { AxisResolver, AxisResolverFactory } from './src/axis-resolver';
export { InfiniteScrollModule } from './src/index';

export default {
	directives: [ InfiniteScroll, Scroller, AxisResolver, PositionResolver ]
}