// our root app component
import { Component, ViewEncapsulation } from '@angular/core';
import * as config from '../config';

@Component({
  selector: 'my-app',
  styleUrls: [ './style.css' ],
  template: `
    <h1 class="title well">
      {{ title }} 
      <section>
      <small>items: {{sum}}, now triggering scroll: {{direction}}</small>
      </section>
    </h1>
    <div class="search-results"
         data-infinite-scroll
         debounce
         [infiniteScrollDistance]="scrollDistance"
         [infiniteScrollUpDistance]="scrollUpDistance"
         [infiniteScrollThrottle]="throttle"
         (scrolled)="onScrollDown()"
         (scrolledUp)="onUp()">
      <p *ngFor="let i of array">
        {{ i }}
      </p>
    </div>
  `
})
export class AppComponent {
  array = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  // title = 'This is Angular InfiniteScroll v' + systemConfig.map['ngx-infinite-scroll'].split('@')[1];

  constructor() {
    this.appendItems(0, this.sum);
    // debugger
    // console.log(systemConfig);
  }

  addItems(startIndex, endIndex, _method) {
    for (let i = 0; i < this.sum; ++i) {
      this.array[_method]([i, ' ', this.generateWord()].join(''));
    }
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'push');
  }

  prependItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'unshift');
  }

  onScrollDown (ev) {
    console.log('scrolled down!!', ev);

    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    this.appendItems(start, this.sum);

    this.direction = 'down';
  }

  onUp(ev) {
    console.log('scrolled up!', ev);
    const start = this.sum;
    this.sum += 20;
    this.prependItems(start, this.sum);

    this.direction = 'up';
  }
  generateWord() {
    return chance.word();
  }
}