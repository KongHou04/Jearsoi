import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { CartService } from './services/cart.service';
import { TokenInterceptor } from './services/tokenInterceptor.service';
import { UserService } from './services/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    CartService,
    UserService,
    provideHttpClient(
      withInterceptorsFromDi(),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ]
};
