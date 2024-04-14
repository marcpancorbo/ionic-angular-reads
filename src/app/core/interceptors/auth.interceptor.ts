import { HttpInterceptorFn } from '@angular/common/http';
import { GoogleAuthService } from '../services/common/google-auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: GoogleAuthService = inject(GoogleAuthService);
  const user = authService.$user();
  req = req.clone({
    headers: user
      ? req.headers.set(
          'Authorization',
          `Bearer ${user.authentication.accessToken}`
        )
      : req.headers,
  });
  return next(req);
};
