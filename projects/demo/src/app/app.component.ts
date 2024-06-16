import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, ModalComponent],
})
export class AppComponent {
  title = 'demo';
  array = signal<string[]>([]);
  sum = signal(100);
  throttle = signal(300);
  scrollDistance = signal(1);
  scrollUpDistance = signal(2);
  direction = signal('');
  modalOpen = signal(false);

  // nisVersion = nisPackage.dependencies["ngx-infinite-scroll"];

  constructor() {
    this.appendItems(0, this.sum());
  }

  addItems(startIndex: number, endIndex: number, _method: 'push' | 'unshift') {
    for (let i = 0; i < this.sum(); ++i) {
      const value = [i, ' ', this.generateWord()].join('');
      if (_method === 'push') {
        this.array.update((array) => [...array, value]);
      } else {
        this.array.update((array) => [value, ...array]);
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
    const start = this.sum();
    this.sum.update((sum) => sum + 20);
    this.appendItems(start, this.sum());

    this.direction.set('down');
  }

  onUp() {
    // console.log('scrolled up!', ev);
    const start = this.sum();
    this.sum.update((sum) => sum + 20);
    this.prependItems(start, this.sum());

    this.direction.set('up');
  }
  generateWord() {
    return Math.random() * 3342411313;
    // return chance.word();
  }

  toggleModal() {
    this.modalOpen.update((modalOpen) => !modalOpen);
  }
}
