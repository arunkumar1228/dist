import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminComponent } from './admin.component';
import { BannerComponent } from './banner/banner.component';
import { LifeAtQbxComponent } from './life-at-qbx/life-at-qbx.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { WhatWeOfferComponent } from './what-we-offer/what-we-offer.component';
// import { ReachUsComponent } from './reach-us/reach-us.component';
import { ServicesComponent } from './services/services.component';
import { ItsmComponent } from './itsm/itsm.component';
import { ItsmfeaturesComponent } from './itsm/itsmfeatures/itsmfeatures.component';
import { ItsmadvantagesComponent } from './itsm/itsmadvantages/itsmadvantages.component';
import { WebinarComponent } from './webinar/webinar.component';
import { BlogComponent } from './blog/blog.component';
import { CasestudyComponent } from './casestudy/casestudy.component';
import { SuccessstoriesComponent } from './successstories/successstories.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ClientFeedbackComponent } from './client-feedback/client-feedback.component';
import { QnewsComponent } from './qnews/qnews.component';
import { LeadershipComponent } from './leadership/leadership.component';
import { AllServiceComponent } from './all-service/all-service.component';
import { CareerDetailComponent } from './career-detail/career-detail.component';
import { ResourcesComponent } from './resources/resources.component';
import { OurcultureComponent } from './ourculture/ourculture.component';
import { ContactComponent } from './contact/contact.component';
import { DownloadComponent } from './download/download.component';
const routes: Routes = [
  { path: '', component: AdminComponent },

  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'banner', component: BannerComponent },
  { path: 'all-Service', component: AllServiceComponent },
  { path: 'whoWeAre', component: WhoWeAreComponent },
  {path:'our-culture',component:OurcultureComponent},
  {path:'contact',component:ContactComponent},
  { path: 'life-Qbx', component: LifeAtQbxComponent },
  { path: 'whatWeOffer', component: WhatWeOfferComponent },
  // { path: 'reachus', component: ReachUsComponent },
  { path: 'testimonial', component: TestimonialComponent },
  { path: 'clientfeedback', component: ClientFeedbackComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'itsm', component: ItsmComponent },
  { path: 'itsm-features', component: ItsmfeaturesComponent },
  { path: 'itsm-advantages', component: ItsmadvantagesComponent },
  { path: 'webinar', component: WebinarComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'casestudy', component: CasestudyComponent },
  { path: 'successstories', component: SuccessstoriesComponent},
  {path:'career-detail',component:CareerDetailComponent},
  { path: 'qnews', component: QnewsComponent},
  { path: 'leadership', component: LeadershipComponent},
  { path: 'resources', component: ResourcesComponent},
  { path: 'Download', component: DownloadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
