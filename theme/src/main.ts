import { Component, ElementRef } from 'mojiito-core';
import { platformBrowser } from 'mojiito-platform-browser';
import { AppComponent } from './app/app.component';

// Init Mojiito
platformBrowser().bootstrapComponent(AppComponent);


const m = module as any;
if (m.hot) {
  m.hot.accept();
}
