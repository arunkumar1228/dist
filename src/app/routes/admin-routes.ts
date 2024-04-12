import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('../admin/admin.module').then((n) => n.AdminModule),
  },
  
];