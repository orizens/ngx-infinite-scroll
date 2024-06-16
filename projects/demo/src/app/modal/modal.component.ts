import { Component, Output, EventEmitter, signal } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'modal',
  templateUrl: './modal.html',
  standalone: true,
  imports: [InfiniteScrollModule],
})
export class ModalComponent {
  @Output() onClose = new EventEmitter();

  array = signal<number[]>([]);
  sum = signal(100);

  modalIsOpen = signal('');
  modalTitle = signal('scroll to update');
  modalBody = signal(modalText);

  modalScrollDistance = signal(2);
  modalScrollThrottle = signal(50);

  constructor() {
    for (let i = 0; i < this.sum(); ++i) {
      this.array.update((array) => [...array, i]);
    }
    this.open();
  }

  onScrollDown() {
    console.log('scrolled!!');

    // add another 20 items
    const start = this.sum();
    this.sum.update(sum => sum + 20);
    for (let i = start; i < this.sum(); ++i) {
      this.array.update((array) => [...array, i]);
    }
  }

  onModalScrollDown() {
    this.modalTitle.set('updated on ' + new Date().toString());
    this.modalBody.update((modalBody) => modalBody + modalText);
  }

  open() {
    this.modalIsOpen.set('in modal-open');
  }

  close() {
    this.modalIsOpen.set('');
    this.modalBody.set(modalText);
    this.onClose.emit();
  }
}

var modalText = `Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.`;
