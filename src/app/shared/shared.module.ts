import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NavComponent],
  exports: [HeaderComponent, FooterComponent, NavComponent],
  imports: [CommonModule, SharedRoutingModule,FormsModule],
})
export class SharedModule {}
