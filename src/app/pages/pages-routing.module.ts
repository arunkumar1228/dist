import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { SuccessStoriesComponent } from './success-stories/success-stories.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { WebinarComponent } from './webinar/webinar.component';
import { LeadershipComponent } from './leadership/leadership.component';
import { NewsComponent } from './news/news.component';
import { CareerComponent } from './career/career.component';
import { ContactComponent } from './contact/contact.component';
import { LeadershipDetailComponent } from './leadership/leadership-detail/leadership-detail.component';
import { ServicenowComponent } from './services/servicenow/servicenow.component';
import { ItsmComponent } from './services/servicenow/itsm/itsm.component';
import { ItomComponent } from './services/servicenow/itom/itom.component';
import { CsmComponent } from './services/servicenow/csm/csm.component';
import { HrsdComponent } from './services/servicenow/hrsd/hrsd.component';
import { GrcComponent } from './services/servicenow/grc/grc.component';
import { FsmComponent } from './services/servicenow/fsm/fsm.component';
import { MicroserviceComponent } from './services/microservice/microservice.component';
import { SalesforceComponent } from './services/salesforce/salesforce.component';
import { AboutComponent } from './about/about.component';
import { SapComponent } from './services/sap/sap.component';
import { WebinarDetailComponent } from './webinar/webinar-detail/webinar-detail.component';
import { NewsDetailComponent } from './news/news-detail/news-detail.component';
import { SuccessStoriesDetailComponent } from './success-stories/success-stories-detail/success-stories-detail.component';
import { CaseStudyComponent } from './case-study/case-study.component';
import { CaseStudyDetailComponent } from './case-study/case-study-detail/case-study-detail.component';
import { CareerDetailComponent } from './career/career-detail/career-detail.component';
import { DigitalTransformationComponent } from './services/digital-transformation/digital-transformation.component';
import { DataSolutionComponent } from './services/data-solution/data-solution.component';
import { ItConsultingComponent } from './services/it-consulting/it-consulting.component';
import { CultureComponent } from './culture/culture.component';
import { ResourcesComponent } from './resources/resources.component';
import { SapBusinessApplicationComponent } from './services/sap/sap-business-application/sap-business-application.component';
import { SapDataAnalyticsComponent } from './services/sap/sap-data-analytics/sap-data-analytics.component';
import { SapMethodologyComponent } from './services/sap/sap-methodology/sap-methodology.component';
import { SapPlatformComponent } from './services/sap/sap-platform/sap-platform.component';
import { SapProgrammingComponent } from './services/sap/sap-programming/sap-programming.component';
import { CpqComponent } from './services/salesforce/cpq/cpq.component';
import { ServiceCloudComponent } from './services/salesforce/service-cloud/service-cloud.component';
import { CrmComponent } from './services/salesforce/crm/crm.component';
import { SalesCloudComponent } from './services/salesforce/sales-cloud/sales-cloud.component';
import { MarketingCloudComponent } from './services/salesforce/marketing-cloud/marketing-cloud.component';
import { DataAnalyticsComponent } from './services/data-solution/data-analytics/data-analytics.component';
import { DataEngineeringComponent } from './services/data-solution/data-engineering/data-engineering.component';
import { DataScienceComponent } from './services/data-solution/data-science/data-science.component';
import { BusinessInsightsComponent } from './services/data-solution/business-insights/business-insights.component';
import { DataGovernanceComponent } from './services/data-solution/data-governance/data-governance.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { CookieComponent } from './cookie/cookie.component';
import { LakshmanInfoComponent } from './leadership/lakshman-info/lakshman-info.component';
import { RajInfoComponent } from './leadership/raj-info/raj-info.component';
import { GrapevineComponent } from './services/data-solution/grapevine/grapevine.component';
import { DataDrivenGovernmentComponent } from './services/data-solution/data-driven-government/data-driven-government.component';
import { LetsTalkComponent } from './lets-talk/lets-talk.component';
import { ThankYouComponent } from './lets-talk/thank-you/thank-you.component';
import { CommerceCloudComponent } from './services/salesforce/commerce-cloud/commerce-cloud.component';
import { MuleSoftComponent } from './services/salesforce/mule-soft/mule-soft.component';
import { SnowflakeChatComponent } from './snowflake-chat/snowflake-chat.component';
import { PartnershipComponent } from './partnership/partnership.component';

const routes: Routes = [            
            { path: '', component: HomeComponent},
            { path: 'services', component: ServicesComponent},
            { path: 'about', component: AboutComponent},
            { path: 'Qualioptix', component: SnowflakeChatComponent},
            { path: 'resources', component: ResourcesComponent},
            { path: 'blog', component: BlogComponent},
            { path: 'blog/:title', component: BlogDetailComponent}, 
            { path: 'contact', component: ContactComponent},
            { path: 'privacy-policy', component: PrivacyComponent},
            { path: 'cookie-policy', component: CookieComponent},
            { path: 'services/servicenow', component: ServicenowComponent},
            { path: 'services/digitaltransformation', component: DigitalTransformationComponent},
            { path: 'services/sap', component: SapComponent},
            { path: 'services/salesforce', component: SalesforceComponent},            
            { path: 'services/data-and-ai', component: DataSolutionComponent},
            { path: 'services/data-and-ai/data-strategy', component: DataAnalyticsComponent},
            { path: 'services/data-and-ai/data-engineering', component: DataEngineeringComponent},
            { path: 'services/data-and-ai/gen-ai', component: DataScienceComponent},
            { path: 'services/data-and-ai/business-insights', component: BusinessInsightsComponent},
            { path: 'services/data-and-ai/data-governance', component: DataGovernanceComponent},
            { path: 'services/data-and-ai/data-insights-for-government', component: DataDrivenGovernmentComponent},
            { path: 'services/data-and-ai/grapevine', component: GrapevineComponent},
            { path: 'services/it-consulting', component: ItConsultingComponent},
            { path: 'resources/case-study', component: CaseStudyComponent},
            { path: 'resources/case-study/:title', component: CaseStudyDetailComponent},
            { path: 'resources/success-stories', component: SuccessStoriesComponent },
            { path: 'resources/success-stories/:title', component: SuccessStoriesDetailComponent },
            { path: 'resources/webinar', component: WebinarComponent},
            { path: 'resources/webinar/:title', component: WebinarDetailComponent},          
            { path: 'about/leadership', component: LeadershipComponent},
            { path: 'about/leadership/Lakshman',component:LakshmanInfoComponent},
            { path: 'about/leadership/Rajkumar',component:RajInfoComponent},
            { path: 'about/news', component: NewsComponent},
            { path: 'about/news/:title', component: NewsDetailComponent},
            { path: 'about/career', component: CareerComponent },
            { path: 'about/career/:title', component: CareerDetailComponent },
            { path: 'about/culture', component: CultureComponent},  
            { path: 'leadership-info', component: LeadershipDetailComponent},
            { path: 'services/servicenow/it-service-management', component: ItsmComponent},
            { path: 'services/servicenow/it-operations-management', component: ItomComponent},
            { path: 'services/servicenow/customer-service-management', component: CsmComponent},
            { path: 'services/servicenow/hr-service-delivery', component: HrsdComponent},
            { path: 'services/servicenow/governance-risk-compliance-management', component: GrcComponent},
            { path: 'services/servicenow/field-service-management', component: FsmComponent},
            { path: 'services/digitaltransformation/microservice', component: MicroserviceComponent},                      
            { path: 'services/sap/sap-business-application', component: SapBusinessApplicationComponent},
            { path: 'services/sap/sap-data-analytics', component: SapDataAnalyticsComponent},
            { path: 'services/sap/sap-methodology', component: SapMethodologyComponent},
            { path: 'services/sap/sap-platform', component: SapPlatformComponent},
            { path: 'services/sap/sap-programming', component: SapProgrammingComponent},
            { path: 'services/salesforce/cpq', component:CpqComponent},
            { path: 'services/salesforce/service-cloud', component:ServiceCloudComponent},
            { path: 'services/salesforce/crm', component:CrmComponent},
            { path: 'services/salesforce/sales-cloud', component:SalesCloudComponent},
            { path: 'services/salesforce/marketing-cloud', component:MarketingCloudComponent},
            { path: 'services/salesforce/Commerce-Cloud', component:CommerceCloudComponent},
            { path: 'services/salesforce/MuleSoft', component:MuleSoftComponent},
            { path: 'lets-talk',component:LetsTalkComponent},
            { path: 'lets-talk/Thank-you', component: ThankYouComponent },  
            {path: 'about/partnerships', component:PartnershipComponent}
            
            ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
