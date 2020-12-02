import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { IInfiniteScrollEvent } from '../models';

@Component({
  selector: 'ngx-infinite-scroll-container',
  template: ` <div
    class="ngxisc"
    infiniteScroll
    [infiniteScrollDistance]="infiniteScrollDistance"
    [infiniteScrollThrottle]="infiniteScrollThrottle"
    [infiniteScrollContainer]="infiniteScrollContainer"
    [immediateCheck]="immediateCheck"
    [alwaysCallback]="alwaysCallback"
    [scrollWindow]="false"
    [fromRoot]="fromRoot"
    (scrolled)="onScroll()"
  >
    <ng-content></ng-content>
  </div>`,
})
export class InfiniteScrollComponent {
  @Output() scrolled = new EventEmitter<IInfiniteScrollEvent>();
  @Output() scrolledUp = new EventEmitter<IInfiniteScrollEvent>();

  @Input() infiniteScrollDistance: number = 2;
  @Input() infiniteScrollUpDistance: number = 1.5;
  @Input() infiniteScrollThrottle: number = 150;
  @Input() infiniteScrollDisabled: boolean = false;
  @Input() infiniteScrollContainer: any = '';
  @Input() scrollWindow = false;
  @Input() immediateCheck: boolean = false;
  @Input() horizontal: boolean = false;
  @Input() alwaysCallback: boolean = false;
  @Input() fromRoot: boolean = false;

  @HostBinding('style.display') get display() {
    return 'block';
  }

  onScroll() {
    this.scrolled.emit();
  }
  // constructor() { }
}
