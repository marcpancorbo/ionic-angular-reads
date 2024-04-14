import { CanMatchFn, Router } from '@angular/router';
import { GoogleAuthService } from '../services/common/google-auth.service';
import { inject } from '@angular/core';

export const isNotAuthenticatedGuard: CanMatchFn = async (route, segments) => {
  const authService: GoogleAuthService = inject(GoogleAuthService);
  const router: Router = inject(Router);
  if (!authService.$user()) {
    return true;
  }
  await router.navigate(['']);
  return false;
};
