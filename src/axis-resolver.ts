import { Injectable, Inject } from '@angular/core';

@Injectable()
export class AxisResolverFactory {
  constructor() { }

  create(vertical: boolean = true) {
    return new AxisResolver(vertical);
  }
}

export class AxisResolver {
  constructor(private vertical: boolean = true) {
  }
  clientHeightKey() { return this.vertical ? 'clientHeight' : 'clientWidth'; }
  offsetHeightKey() { return this.vertical ? 'offsetHeight' : 'offsetWidth'; }
  scrollHeightKey() { return this.vertical ? 'scrollHeight' : 'scrollWidth'; }
  pageYOffsetKey() { return this.vertical ? 'pageYOffset' : 'pageXOffset'; }
  offsetTopKey() { return this.vertical ? 'offsetTop' : 'offsetLeft'; }
  scrollTopKey() { return this.vertical ? 'scrollTop' : 'scrollLeft'; }
  topKey() { return this.vertical ? 'top' : 'left'; }
}
