import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './services/token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(),
    provideAnimations(),
    provideToastr({timeOut: 3000, preventDuplicates: true, positionClass: 'toast-top-right'}), provideAnimationsAsync(),
  ],

};
