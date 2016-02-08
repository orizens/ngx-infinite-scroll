# Angular 2 Infinite Scroll
A port of [ng-infinite-scroll](https://github.com/sroze/ngInfiniteScroll) directive for angular 2.

## Supported API
Currently supports:
* (attribute) "infinite-scroll-distance" - should get a number
* (function) - instead of defining a callback function on the "infinite-scroll" attribute, you should use the event binding **(scrolled)="handleScrollCallback()"**

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
