import { Component } from "@angular/core";
import { ListService } from "./list.service";
import { ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-root",
  encapsulation: ViewEncapsulation.None,
  providers: [ListService],
  // templateUrl: './app.component.html',
  // <test-inner className="inner test1"
  //   [scrollWindow]="false"
  //   [fromRoot]="false"
  //   >
  // </test-inner>
  // <test-inner
  //   [scrollWindow]="false"
  //   className="inner test1"
  // ></test-inner>
  template: `

  <test-inner
    className="inner test1"
    [scrollWindow]="false"
  ></test-inner>

  `,
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  modalScrollDistance = 2;
  modalScrollDistanceUp = 3;
  modalScrollThrottle = 50;
  modalBody = [modalText];
  selector = null;

  txt = modalText + modalText;
  array = [];

  onModalScrollDown() {
    console.log("-> DOWN");
    this.modalBody = this.modalBody.concat(modalText);
  }

  onScrollDown(ev) {
    this.array.push(modalText[0]);
  }

  onScrollUp(ev) {
    console.log("=> UP");
    this.modalBody = [].concat(modalText, this.modalBody.concat());
  }
}

const modalText = `Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.

Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.

Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.`;
