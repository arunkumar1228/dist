import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { ADMIN_ROUTES } from './routes/admin-routes';
import { DEFAULT_ROUTES } from './routes/default-routes';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
const routes: Routes = [
  { path: '', component: DefaultLayoutComponent, children: DEFAULT_ROUTES },
  { path: 'login', component: LoginComponent },
  { path: 'admin',
    canActivate:[AuthenticationGuard],
    component: AdminLayoutComponent,
    children: ADMIN_ROUTES },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((n) => n.AuthModule),
  },
  { path: '**', pathMatch: 'full',  component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
