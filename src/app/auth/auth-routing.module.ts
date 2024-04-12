import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  // { path: '', component: AdminPanelComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'adminPanel', component: AdminPanelComponent },

  // { path: 'public', loadChildren: () => import('./admin-pan/admin-pan.module').then(m => m.AdminPanModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
