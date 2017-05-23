import { Component, ElementRef } from 'mojiito-core';
import { platformBrowser } from 'mojiito-platform-browser';
import { AppComponent } from './app/app.component';

// Init Mojiito
platformBrowser().bootstrapComponent(AppComponent);

