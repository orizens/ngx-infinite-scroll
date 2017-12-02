import { Component, Input } from '@angular/core';

import { ListMaker } from './list.service';

// our root app component
@Component({
  selector: 'test',
  providers: [ListMaker],
  template: `
  <div class="results {{className}}"
    [scrollWindow]="scrollWindow"
    data-infinite-scroll
    [infiniteScrollContainer]="selector"
    [fromRoot]="fromRoot"
    [infiniteScrollDisabled]="disableScroll"
    [infiniteScrollDistance]="scrollDistance"
    [infiniteScrollUpDistance]="scrollUpDistance"
    [infiniteScrollThrottle]="throttle"
    (scrolled)="onScrollDown()"
    (scrolledUp)="onUp()">
      <h4 class="info">
        {{ className }}, {{info}}<br>
        disable scroll <input type="checkbox" name="_disable" [(ngModel)]="disableScroll" title="disables scroll">
      </h4>
      <p *ngFor="let i of array">
        {{ i }}
      </p>
    </div>
  `
})
export class TestComponent {
  @Input() scrollWindow = true;
  @Input() className = '';
  @Input() selector = null;
  @Input() fromRoot = false;
  @Input() info = '';
  @Input() throttle = 20;

  disableScroll = false;

  array = this.listMaker.array;
  scrollDistance = 3;
  scrollUpDistance = 2;

  constructor(public listMaker: ListMaker) { }

  onScrollDown(ev) {
    console.log(`scrolled down, from ${this.className} ${this.info}`);
    this.listMaker.setDirectionDown();
  }

  onUp(ev) {
    console.log(`scrolled up, from  ${this.className} ${this.info}`);
    this.listMaker.setDirectionUp();
  }
  generateWord() {
    return chance.word();
  }
}
