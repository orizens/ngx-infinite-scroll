import { Component, Input } from "@angular/core";

import { ListService } from "./list.service";

// our root app component
@Component({
  selector: "test-inner",
  providers: [ListService],
  template: `
    <div class="{{className}}"
        [scrollWindow]="scrollWindow"
         infiniteScroll
         [infiniteScrollContainer]="selector"
         [fromRoot]="fromRoot"
         [infiniteScrollDistance]="scrollDistance"
         [infiniteScrollUpDistance]="scrollUpDistance"
         [infiniteScrollThrottle]="throttle"
         (scrolled)="onScrollDown()"
         (scrolledUp)="onUp()"
      >
      <section class="content">
        <div *ngFor="let i of array()">
          {{ i }}
        </div>
      </section>
    </div>
  `
})
export class TestInnerComponent {
  @Input() scrollWindow = true;
  @Input() className = "";
  @Input() selector = null;
  @Input() fromRoot = false;
  @Input() info = "";

  throttle = 300;
  scrollDistance = 2;
  scrollUpDistance = 2;

  constructor(public listMaker: ListService) {}

  array() {
    return this.listMaker.array;
  }
  onScrollDown(ev) {
    // setTimeout(() => {
    console.log(`scrolled down, from ${this.className} ${this.info}`);
    this.listMaker.setDirectionDown();
    // }, 3000);
  }

  onUp(ev) {
    // setTimeout(() => {
    console.log(`scrolled up, from  ${this.className} ${this.info}`);
    this.listMaker.setDirectionUp();
    // }, 3000);
  }

  generateWord() {
    return window["chance"].word();
  }
}
