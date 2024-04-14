import { APP_INITIALIZER, enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { Observable, tap } from 'rxjs';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { GoogleAuthService } from './app/core/services/common/google-auth.service';
import { environment } from './environments/environment';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

function loadUserFromStorage(authService: GoogleAuthService): any {
  return () =>
    authService.loadUserFromStorage().pipe(
      tap((user) => {
        authService.setUser(user);
      })
    );
}

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => GoogleAuth.initialize(),
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadUserFromStorage,
      multi: true,
      deps: [GoogleAuthService],
    },
  ],
});
