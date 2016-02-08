# Angular 2 Infinite Scroll
A port of [ng-infinite-scroll](https://github.com/sroze/ngInfiniteScroll) directive for angular 2.

## Usage
in component, define:

```typescript
import { Component } from 'angular2/core';
import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component({
	selector: 'app',
	directives: [ InfiniteScroll ]
	template: `
		<div class="search-results"
		    infinite-scroll
		    [infiniteScrollDistance]="2"
		    (scrolled)="onScroll()">
		</div>
	`
})
export class App {
	onScroll () {
	    console.log('scrolled!!')
	}
}
```
