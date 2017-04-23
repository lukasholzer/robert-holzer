import { Component, ElementRef } from 'mojiito-core';
import { platformBrowser } from 'mojiito-platform-browser';
import { AppComponent } from './app/app.component';

// import './fonts/neutra-text/neutra-text.scss';
// import './styles/inline.scss';
// import './styles/main.scss';

// Init Mojiito
platformBrowser().bootstrapComponent(AppComponent);

