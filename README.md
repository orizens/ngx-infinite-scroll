# Angular 2 Infinite Scroll
A port & modification of [ng-infinite-scroll](https://github.com/sroze/ngInfiniteScroll) directive for angular 2.

## Supported API
The directive triggers 
Currently supported attributes:
* (number) "infiniteDcrollDistance" (optional, default: **2**) - should get a number
* (number) "infiniteScrollThrottle" (optional, default: **300**) - should get a number of milliseconds for throttle  
* (function) - instead of defining a callback function on the "infinite-scroll" attribute, you should use the event binding **(scrolled)="handleScrollCallback()"** 
* (boolean) - "scrollWindow" (optional, default: **true**) - listens to the window scroll instead of the actual element scroll. this allows to invoke a callback function in the scope of the element while listenning to the window scroll. 
* (boolean) - "immediateCheck" (optional, default: **false**) - invokes the handler immediately to check if a scroll event has been already triggred when the page has been loaded (i.e. - when you refresh a page that has been scrolled). 

## Behavior
By default, the directive listens to a window scroll event and invoked the callback. 
**To trigger the callback when the actual element is scrolled**, these settings should be configured:  
* [scrollWindow]="false" 
* set an explict css "height" value to the element

## Usage
In this example, the **onScroll** callback will be invoked when the window is scrolled:

```typescript
import { Component } from 'angular2/core';
import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component({
	selector: 'app',
	directives: [ InfiniteScroll ],
	template: `
		<div class="search-results"
		    infinite-scroll
		    [infiniteScrollDistance]="2"
		    [infiniteScrollThrottle]="500"
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
in this example, whenever the "search-results" is scrolled, the callback will be invoked:  

```typescript
import { Component } from 'angular2/core';
import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component({
	selector: 'app',
	directives: [ InfiniteScroll ],
	styles: [
		`.search-results {
			height: 20rem;
			overflow: scroll;
		}`
	],
	template: `
		<div class="search-results"
		    infinite-scroll
		    [infiniteScrollDistance]="2"
		    [infiniteScrollThrottle]="500"
		    (scrolled)="onScroll()"
		    [scrollWindow]="false">
		</div>
	`
})
export class App {
	onScroll () {
	    console.log('scrolled!!')
	}
}
``` 

# Showcase Examples 
* [Echoes Player Ng2 Version](http://orizens.github.io/echoes-ng2) ([github repo for echoes player](http://github.com/orizens/echoes-ng2))