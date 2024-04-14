import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from 'src/app/core/layout/dashboard-layout/dashboard-layout.component';
import { SearchResultsPageComponent } from './pages/search-results-page/search-results-page.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'search',
        component: SearchResultsPageComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
    ],
  },
];
