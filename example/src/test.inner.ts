import { Component, Input } from '@angular/core';

import { ListMaker } from './list.service';

// our root app component
@Component({
  selector: 'test-inner',
  providers: [ListMaker],
  template: `
    <div class="results {{className}}"
        [scrollWindow]="scrollWindow"
         data-infinite-scroll
         [infiniteScrollContainer]="selector"
         [fromRoot]="fromRoot"
         [infiniteScrollDistance]="scrollDistance"
         [infiniteScrollUpDistance]="scrollUpDistance"
         [infiniteScrollThrottle]="throttle"
         (scrolled)="onScrollDown()"
         (scrolledUp)="onUp()">
      <h3 class="info">{{ className }}{{ info }}</h3>
      <section class="content">
        <p *ngFor="let i of array">
          {{ i }}
        </p>
      </section>
    </div>
  `
})
export class TestInnerComponent {
  @Input() scrollWindow = true;
  @Input() className = '';
  @Input() selector = null;
  @Input() fromRoot = false;
  @Input() info = '';

  array = this.listMaker.array;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  constructor(public listMaker: ListMaker) {}

  onScrollDown(ev) {
    console.log('scrolled down!!', ev);
    this.listMaker.setDirectionDown();
  }

  onUp(ev) {
    console.log('scrolled up!', ev);
    this.listMaker.setDirectionUp();
  }
  generateWord() {
    return chance.word();
  }
}
