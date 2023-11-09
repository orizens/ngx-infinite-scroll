import {CommonModule} from "@angular/common";
import { Component } from '@angular/core';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ModalComponent } from "./modal/modal.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, ModalComponent]
})
export class AppComponent {
  title = 'demo';
  array: string[] = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  modalOpen = false;

  // nisVersion = nisPackage.dependencies["ngx-infinite-scroll"];

  constructor() {
    this.appendItems(0, this.sum);
  }

  addItems(startIndex: number, endIndex: number, _method: 'push' | 'unshift') {
    for (let i = 0; i < this.sum; ++i) {
      const value = [i, ' ', this.generateWord()].join('');
      if (_method === 'push') {
        this.array.push(value);
      } else {
        this.array.unshift(value);
      }
    }
  }

  appendItems(startIndex: number, endIndex: number) {
    this.addItems(startIndex, endIndex, 'push');
  }

  prependItems(startIndex: number, endIndex: number) {
    this.addItems(startIndex, endIndex, 'unshift');
  }

  onScrollDown() {
    // console.log('scrolled down!!', ev);

    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    this.appendItems(start, this.sum);

    this.direction = 'down';
  }

  onUp() {
    // console.log('scrolled up!', ev);
    const start = this.sum;
    this.sum += 20;
    this.prependItems(start, this.sum);

    this.direction = 'up';
  }
  generateWord() {
    return Math.random() * 3342411313;
    // return chance.word();
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }
}
