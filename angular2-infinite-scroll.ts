import { InfiniteScroll } from './src/infinite-scroll';
import { Scroller } from './src/scroller';
import { AxisResolver } from './src/axis-resolver';

export * from './src/infinite-scroll';
export * from './src/scroller';
export * from './src/axis-resolver';

export default {
	directives: [ InfiniteScroll, Scroller, AxisResolver ]
}