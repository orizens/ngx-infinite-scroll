import { Injectable } from '@angular/core';

@Injectable()
export class ListMaker {
  public array = [];
  sum = 100;
  direction = '';

  constructor() {
    this.appendItems(0, this.sum);
  }

  addItems(startIndex, endIndex, arrMethod) {
    for (let i = 0; i < this.sum; ++i) {
      this.array[arrMethod]([i, ' ', this.generateWord()].join(''));
    }
  }

  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'push');
  }

  prependItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex, 'unshift');
  }

  setDirectionDown() {
    const start = this.sum;
    this.sum += 20;
    this.appendItems(start, this.sum);
    this.direction = 'down';
  }

  setDirectionUp() {
    const start = this.sum;
    this.sum += 20;
    this.prependItems(start, this.sum);
    this.direction = 'up';
  }

  generateWord() {
    return chance.word();
  }
}
