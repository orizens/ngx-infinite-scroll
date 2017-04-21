import { ContainerRef } from '../models';
import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';


export interface ScrollRegisterConfig {
  container: ContainerRef;
  throttleDuration: number;
  filterBefore: () => boolean;
  mergeMap: Function;
  scrollHandler: (value: any) => void;
}

@Injectable()
export class ScrollRegister {
  attachEvent (options: ScrollRegisterConfig): Subscription {
    const scroller$: Subscription = Observable.fromEvent(options.container, 'scroll')
      .sampleTime(options.throttleDuration)
      .filter(options.filterBefore)
      .mergeMap((ev: any) => Observable.of(options.mergeMap(ev)))
      .subscribe(options.scrollHandler);
    return scroller$;
  }
}
