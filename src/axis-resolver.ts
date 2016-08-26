import { Injectable } from "@angular/core";

@Injectable()
export class AxisResolver {
  private vertical: boolean; // else horizontal

  constructor() {
    this.setVertical(true);
  }

  setVertical(vertical: boolean = true) {
    this.vertical = vertical;
  }

  clientHeightKey() {return this.vertical ? 'clientHeight' : 'clientWidth'}
  offsetHeightKey() {return this.vertical ? 'offsetHeight' : 'offsetWidth'}
  scrollHeightKey() {return this.vertical ? 'scrollHeight' : 'scrollWidth'}
  pageYOffsetKey()  {return this.vertical ? 'pageYOffset'  : 'pageXOffset'}
  offsetTopKey()    {return this.vertical ? 'offsetTop'    : 'offsetLeft'}
  scrollTopKey()    {return this.vertical ? 'scrollTop'    : 'scrollLeft'}
  topKey()          {return this.vertical ? 'top'          : 'left'}
}
