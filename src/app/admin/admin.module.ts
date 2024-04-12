import { NgModule ,CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BannerComponent } from './banner/banner.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { LifeAtQbxComponent } from './life-at-qbx/life-at-qbx.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WhatWeOfferComponent } from './what-we-offer/what-we-offer.component';
import { ServicesComponent } from './services/services.component';
import { ItsmComponent } from './itsm/itsm.component';
import { ItsmfeaturesComponent } from './itsm/itsmfeatures/itsmfeatures.component';
import { ItsmadvantagesComponent } from './itsm/itsmadvantages/itsmadvantages.component';
import { HttpClientModule } from '@angular/common/http'
import { QuillModule } from 'ngx-quill';
import { BlogComponent } from './blog/blog.component';
import { WebinarComponent } from './webinar/webinar.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ClientFeedbackComponent } from './client-feedback/client-feedback.component';
import { QnewsComponent } from './qnews/qnews.component';
import { LeadershipComponent } from './leadership/leadership.component';
import { SuccessstoriesComponent } from './successstories/successstories.component';
import { CasestudyComponent } from './casestudy/casestudy.component';
import { AllServiceComponent } from './all-service/all-service.component';
import { CareerDetailComponent } from './career-detail/career-detail.component';
import { OurcultureComponent } from './ourculture/ourculture.component';
import { ResourcesComponent } from './resources/resources.component';
import { ContactComponent } from './contact/contact.component';
import { DatePipe } from '@angular/common';
import { DownloadComponent } from './download/download.component';
@NgModule({
  declarations: [AdminComponent,AdminDashboardComponent, BannerComponent, WhoWeAreComponent, LifeAtQbxComponent, WhatWeOfferComponent, ServicesComponent, ItsmComponent, ItsmfeaturesComponent, ItsmadvantagesComponent, BlogComponent,WebinarComponent, TestimonialComponent, ClientFeedbackComponent, QnewsComponent, LeadershipComponent,SuccessstoriesComponent,CasestudyComponent, AllServiceComponent, CareerDetailComponent, OurcultureComponent, ResourcesComponent, ContactComponent, DownloadComponent],
  providers: [
    DatePipe, // Provide DatePipe here
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QuillModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap:    [ AdminComponent ]
})
export class AdminModule { }
