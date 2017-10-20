// main entry point
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app';
import { TestComponent } from './test';
import { TestInnerComponent } from './test.inner';

@NgModule({
  declarations: [AppComponent, TestComponent, TestInnerComponent],
  imports: [BrowserModule, InfiniteScrollModule],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
