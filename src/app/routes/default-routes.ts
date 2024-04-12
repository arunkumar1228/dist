import { Routes } from '@angular/router';

export const DEFAULT_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule),
  },
  
];
