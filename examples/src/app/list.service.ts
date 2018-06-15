import { Injectable } from "@angular/core";

@Injectable()
export class ListService {
  array = [];

  sum = 40;
  direction = "";

  constructor() {
    this.appendItems(0, this.sum);
  }

  addItems(startIndex, endIndex, arrMethod) {
    // this._array = this._array.concat()
    // [;...Array(this.sum);].map((el, i) => {
    // this._array[arrMethod]([i, ' ', this.generateWord()].join(''));
    // });
    // this._array = this._array.slice();
  }

  appendItems(startIndex, endIndex) {
    this.array = this.array.concat(
      Array(endIndex)
        .fill(0)
        .map((el, i) => `${i} -> ${this.generateWord()}`)
    );
    // this.addItems(startIndex, endIndex, 'push');
  }

  prependItems(startIndex, endIndex) {
    this.array = Array(endIndex)
      .fill(0)
      .map((el, i) => `${i} -> ${this.generateWord()}`)
      .concat(this.array.concat());
    // this.addItems(startIndex, endIndex, 'unshift');
  }

  setDirectionDown() {
    const start = this.sum;
    this.sum += 10;
    this.appendItems(start, this.sum);
    this.direction = "down";
  }

  setDirectionUp() {
    const start = this.sum;
    this.sum += 10;
    this.prependItems(start, this.sum);
    this.direction = "up";
  }

  generateWord() {
    return window["chance"].word();
  }
}
