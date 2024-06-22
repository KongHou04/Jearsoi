/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './app/services/tokenInterceptor.service';

appConfig.providers.push({ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true });

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
