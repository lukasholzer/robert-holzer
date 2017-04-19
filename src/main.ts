import { Component, ElementRef } from 'mojiito-core';
import { platformBrowser } from 'mojiito-platform-browser';
import { AppComponent } from './app/app.component';


// Init Mojiito
platformBrowser().bootstrapComponent(AppComponent);


// Webpack Hot Module Reloading
declare const _module: any;

if (_module.hot) {
    _module.hot.accept();
}