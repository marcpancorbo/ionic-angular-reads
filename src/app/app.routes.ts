import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './core/guards/is-not-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canMatch: [isNotAuthenticatedGuard],
    loadChildren: () =>
      import('./routes/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    canMatch: [isAuthenticatedGuard],
    loadChildren: () =>
      import('./routes/dashboard/dashboard.routes').then(
        (m) => m.DASHBOARD_ROUTES
      ),
  },
];
