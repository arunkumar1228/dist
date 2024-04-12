import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top', // This configures scrolling to the top on route changes
  })],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
