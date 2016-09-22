[![Build Status](https://travis-ci.org/orizens/angular2-infinite-scroll.svg?branch=master)](https://travis-ci.org/orizens/angular2-infinite-scroll)

# Angular 2 Infinite Scroll
A port & modification of [ng-infinite-scroll](https://github.com/sroze/ngInfiniteScroll) directive for angular 2.

## Angular 2 Support 
Updated to support Angular 2 - **Final - 2.0.0**

## Installation
```
npm install angular2-infinite-scroll --save
```

## Supported API
Currently supported attributes:
* (number) "infiniteScrollDistance" (optional, default: **2**) - should get a number, the number of viewport lenghts from the bottom of the page at which the event will be triggered.
* (number) "infiniteScrollUpDistance" (optional, default: **1.5**) - should get a number
* (number) "infiniteScrollThrottle" (optional, default: **300**) - should get a number of **milliseconds** for throttle. The event will be triggered this many milliseconds after the user *stops* scrolling.
* (function) - instead of defining a callback function on the "infinite-scroll" attribute, you should use the event binding **(scrolled)="handleScrollDownCallback()"** - this will callback if the distance threshold has been reached on a scroll down.
* (function) - instead of defining a callback function on the "infinite-scroll" attribute, you should use the event binding **(scrolledUp)="handleScrollUpCallback()"** - this will callback if the distance threshold has been reached on a scroll up.
* (boolean) - "scrollWindow" (optional, default: **true**) - listens to the window scroll instead of the actual element scroll. this allows to invoke a callback function in the scope of the element while listenning to the window scroll.
* (boolean) - "immediateCheck" (optional, default: **false**) - invokes the handler immediately to check if a scroll event has been already triggred when the page has been loaded (i.e. - when you refresh a page that has been scrolled).
* (boolean) - "infiniteScrollDisabled" (optional, default: **false**) - doesn't invoke the handler if set to true

## Behavior
By default, the directive listens to a window scroll event and invoked the callback.
**To trigger the callback when the actual element is scrolled**, these settings should be configured:
* [scrollWindow]="false" 
* set an explict css "height" value to the element 

## DEMO 
[Default Scroll By Window - plunkr](https://plnkr.co/edit/DrEDetYnZkFxR7OWWrxS?p=preview)  
[Scroll On a "Modal" - plunkr](https://plnkr.co/edit/QnQOwE9SEapwJCCFII3L?p=preview)

## Usage
First, import the InfiniteScrollModule to your module: 

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app';

@NgModule({
  imports:[ BrowserModule, InfiniteScrollModule ],
  declarations: [ AppComponent, ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
```

In this example, the **onScroll** callback will be invoked when the window is scrolled down:

```typescript
import { Component } from '@angular/core';

@Component({
	selector: 'app',
	template: `
		<div class="search-results"
		    infinite-scroll
		    [infiniteScrollDistance]="2"
		    [infiniteScrollThrottle]="500"
		    (scrolled)="onScroll()">
		</div>
	`
})
export class AppComponent {
	onScroll () {
	    console.log('scrolled!!')
	}
}
```
in this example, whenever the "search-results" is scrolled, the callback will be invoked:

```typescript
import { Component } from '@angular/core';

@Component({
	selector: 'app',
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
export class AppComponent {
	onScroll () {
	    console.log('scrolled!!')
	}
}
```

In this example, the **onScrollDown** callback will be invoked when the window is scrolled down and the **onScrollUp** callback will be invoked when the window is scrolled up:

```typescript
import { Component } from '@angular/core';
import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component({
	selector: 'app',
	directives: [ InfiniteScroll ],
	template: `
		<div class="search-results"
		    infinite-scroll
		    [infiniteScrollDistance]="2"
		    [infiniteScrollUpDistance]="1.5"
		    [infiniteScrollThrottle]="500"
		    (scrolled)="onScrollDown()">
		    (scrolledUp)="onScrollUp()">
		</div>
	`
})
export class AppComponent {
	onScrollDown () {
	    console.log('scrolled down!!')
	}

	onScrollUp () {
    	console.log('scrolled up!!')
    }
}
```

## Testing
To start developing tdd/bdd style: ```npm run dev```
This will: compile ts files, watch for changes and start the test task. Whenever a ts file is changed, it will rerun the tests.

Travis-ci is integrated

### Credits For Tests Setup
[ng2-test-seed](https://github.com/juliemr/ng2-test-seed) has been a huge help and source of inspiration. At first, copy & paste, then, customisation to adapt to this code repository.
Thanks [@juliemr](https://github.com/juliemr)!

# Showcase Examples
* [Echoes Player Ng2 Version](http://orizens.github.io/echoes-ng2) ([github repo for echoes player](http://github.com/orizens/echoes-ng2))
