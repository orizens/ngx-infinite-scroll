import { Component } from '@angular/core';

import { ListMaker } from './list.service';

// our root app component
@Component({
  selector: 'my-app',
  providers: [ListMaker],
  styleUrls: ['./style.css'],
  template: `
    <h1 class="title well">
      <section>
      <small>items: {{sum}}, now triggering scroll: {{direction}}</small>
      </section>
    </h1>
    <div class="fixed dummy">
      <div>DUMMY</div>
      <div *ngFor="let item of items">{{ item }}</div>
    </div>
    <test-inner className="fixed inner" [scrollWindow]="false" [selector]="'.content'" [fromRoot]="false" 
      [info]="'selector inside: .content'"></test-inner>
    <test className="fixed third" [scrollWindow]="true" info="'listen to window'"></test>
    <test className="fixed second" [scrollWindow]="false" [selector]="'.dummy'" [fromRoot]="true"></test>
    <test className="fixed first" [scrollWindow]="false"></test>
    <test className="search-results"></test>
    `
})
export class AppComponent {
  public items = this.listMaker.array;
  constructor(public listMaker: ListMaker) {}
}
