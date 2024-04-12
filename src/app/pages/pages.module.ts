import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { ServicesComponent } from './services/services.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { WebinarComponent } from './webinar/webinar.component';
import { LeadershipComponent } from './leadership/leadership.component';
import { NewsComponent } from './news/news.component';
import { CareerComponent } from './career/career.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { LeadershipDetailComponent } from './leadership/leadership-detail/leadership-detail.component';
import { AboutComponent } from './about/about.component';
import { HttpHeaders,HttpClient, HttpClientModule } from '@angular/common/http';
import { WebinarDetailComponent } from './webinar/webinar-detail/webinar-detail.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { ServicenowComponent } from './services/servicenow/servicenow.component';
import { CaseStudyComponent } from './case-study/case-study.component';
import { ItsmComponent } from './services/servicenow/itsm/itsm.component';
import { ItomComponent } from './services/servicenow/itom/itom.component';
import { HrsdComponent } from './services/servicenow/hrsd/hrsd.component';
import { GrcComponent } from './services/servicenow/grc/grc.component';
import { FsmComponent } from './services/servicenow/fsm/fsm.component';
import { CsmComponent } from './services/servicenow/csm/csm.component';
import { DigitalTransformationComponent } from './services/digital-transformation/digital-transformation.component';
import { MicroserviceComponent } from './services/microservice/microservice.component';
import { SalesforceComponent } from './services/salesforce/salesforce.component';
import { SapComponent } from './services/sap/sap.component';
import { ItConsultingComponent } from './services/it-consulting/it-consulting.component';
import { DataSolutionComponent } from './services/data-solution/data-solution.component';
import { CareerDetailComponent } from './career/career-detail/career-detail.component';
import { BlogService } from 'src/app/api/qbrainx-api/services/PageServices/blog-service.service';
import { NewsService } from 'src/app/api/qbrainx-api/services/PageServices/news-service.service';
import { WebinarService } from 'src/app/api/qbrainx-api/services/PageServices/webinar-service.service';
import { SuccessStoriesService } from 'src/app/api/qbrainx-api/services/PageServices/successstories-service.service';
import { SuccessStoriesDetailComponent } from './success-stories/success-stories-detail/success-stories-detail.component';
import { CaseStudyDetailComponent } from './case-study/case-study-detail/case-study-detail.component';
import { CultureComponent } from './culture/culture.component';
import { CaseStudyService } from 'src/app/api/qbrainx-api/services/PageServices/casestudy-service.service';
import { ResourcesComponent } from './resources/resources.component';
import { CareerService } from 'src/app/api/qbrainx-api/services/PageServices/career-service.service';
import { AgmCoreModule } from '@agm/core';
import { SapPlatformComponent } from './services/sap/sap-platform/sap-platform.component';
import { RajInfoComponent } from './leadership/raj-info/raj-info.component';
import { LakshmanInfoComponent } from './leadership/lakshman-info/lakshman-info.component';
import { LetsTalkComponent } from './lets-talk/lets-talk.component';
import { ThankYouComponent } from './lets-talk/thank-you/thank-you.component';
import { DataScienceComponent } from './services/data-solution/data-science/data-science.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SeoService } from './seo.service';
import { SapProgrammingComponent } from './services/sap/sap-programming/sap-programming.component';
import { SapMethodologyComponent } from './services/sap/sap-methodology/sap-methodology.component';
import { SapDataAnalyticsComponent } from './services/sap/sap-data-analytics/sap-data-analytics.component';
import { SapBusinessApplicationComponent } from './services/sap/sap-business-application/sap-business-application.component';
import { CommerceCloudComponent } from './services/salesforce/commerce-cloud/commerce-cloud.component';
import { MuleSoftComponent } from './services/salesforce/mule-soft/mule-soft.component';
import { SnowflakeChatComponent } from './snowflake-chat/snowflake-chat.component';
import { PartnershipComponent } from './partnership/partnership.component';
@NgModule({
  declarations: [
    PagesComponent,
    SapProgrammingComponent,
    LetsTalkComponent,
    HomeComponent,
    SapDataAnalyticsComponent,
    SuccessStoriesComponent,
    SapMethodologyComponent,
    ServicesComponent,
    BlogComponent,
    CaseStudyComponent,
    CultureComponent,
    DataScienceComponent,
    BlogDetailComponent,
    WebinarComponent,
    WebinarDetailComponent,
    ItsmComponent,
    ItomComponent,
    HrsdComponent,
    GrcComponent,
    FsmComponent,
    CsmComponent,
    LeadershipComponent,
    NewsComponent,
    CareerComponent,
    ContactComponent,
    ServicenowComponent,
    LeadershipDetailComponent,
    AboutComponent,
    DigitalTransformationComponent,
    MicroserviceComponent,
    SalesforceComponent,
    SapBusinessApplicationComponent,
    SapComponent,
    SalesforceComponent,
    ItConsultingComponent,
    DataSolutionComponent,
    NewsDetailComponent,
    CareerDetailComponent,
    ResourcesComponent,
    SuccessStoriesDetailComponent,
    CaseStudyDetailComponent,
    SapPlatformComponent,
    RajInfoComponent,
    LakshmanInfoComponent,
    ThankYouComponent,
    PageNotFoundComponent,
    CommerceCloudComponent,
    MuleSoftComponent,
    SnowflakeChatComponent,
    PartnershipComponent,
    
     ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAE9MLR3TmCOrraMsFwpxAiBHA8-qq_1Qg'
    }),
    HttpClientModule,   
     ],
  providers: [BlogService,NewsService,WebinarService,SuccessStoriesService,CaseStudyService,CareerService,SeoService],
})
export class PagesModule { }
