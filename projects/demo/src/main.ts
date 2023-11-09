import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {providers: [importProvidersFrom(BrowserModule)]})
  .catch(err => console.error(err));
