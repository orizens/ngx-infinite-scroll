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
      <h3 class="info">
        {{ className }}, {{info}}
        <input type="checkbox" name="_disable" [(ngModel)]="disableScroll" title="disables scroll">
      </h3>
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

  disableScroll = false;

  array = this.listMaker.array;
  throttle = 20;
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
