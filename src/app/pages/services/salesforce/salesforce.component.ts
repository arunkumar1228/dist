import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CaseStudyService } from 'src/app/api/qbrainx-api/services/PageServices/casestudy-service.service';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-salesforce',
  templateUrl: './salesforce.component.html',
  styleUrls: ['./salesforce.component.scss']
})
export class SalesforceComponent implements OnInit {

  currentUrl: string;
  serviceArray = [];
  caseStudyArray = [];
  caseStudyArrayList = [];
  lastpage;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  constructor(private httpClient: HttpClient,private caseStudyService:CaseStudyService,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) {
    this.titleService.setTitle('Transform with Salesforce Consulting Services');
    this.metaService.addTag({ name: 'description', content:"Empower your business with our Salesforce consulting services. Drive growth, enhance customer experiences, and unlock the full potential of Salesforce solutions."});
  
   }


  ngOnInit(): void {
    this.blogList();
    this.caseStudyList('Salesforce');
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.location.reload();
      }
    });
    
    this.currentUrl = window.location.origin + this.location.path();
    const link: HTMLLinkElement = this.renderer.createElement('link');
    link.rel = 'canonical';
    link.href = this.currentUrl;
    this.renderer.appendChild(document.head, link);
  }
  blogList() {
    this.httpClient
      .get('https://qbrainx.com/qbrainx-web/v1/Common-Service/byServiceName?serviceName=salesforce', {
        responseType: 'text' as 'json'
      })
      .subscribe((data: any) => {
        JSON.parse(data).forEach((e: any) => {
          let fileName = e.fileName.split('.');

          this.serviceArray.push({
            data: e.data,
            extensioniconName: fileName[1],
            serviceName: e.serviceName,
            buttonName: e.buttonName,
            link: e.link,
            title: e.title,
            text: e.text,
            serviceId: e.serviceId,

            fileName: e.fileName,
          })
        });
      });
  }

  caseStudyList(category){
    this.caseStudyService.getByCategoryCaseStudyDetails(category).subscribe((res:any) => {
      if(res) {
        res.forEach((e,index) => {
         let extension = e.fileName.split('.');
         this.caseStudyArray.push({
              image: e.data,
              extension: extension[1],
              text: e.text,
              subTitle: e.subTitle, 
              category:e.category,
              title: e.title,
              date:e.date,
              id:e.id,
              downloaddata:e.downloadData,
              downloadfilename:e.downloadFile
            })
        });
  
        this.lastpage=Math.ceil(this.caseStudyArray.length / this.itemsPerPage)
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
      this.caseStudyArrayList= this.caseStudyArray.slice(startIndex, endIndex);
    }
      
      else{
        console.error("error")
      }
    });
  }
  
  
  
     // Function to change the current page
     changePreviousPage() {
      this.currentPage = this.currentPage - 1;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
    this.caseStudyArrayList= this.caseStudyArray.slice(startIndex, endIndex);
    }
  
    changeNextpage(){
      this.currentPage=this.currentPage + 1; 
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
    this.caseStudyArrayList= this.caseStudyArray.slice(startIndex, endIndex);
    }

    caseStudydetails(data){

      this.caseStudyService.setCaseStudyObject(data);
      this.router.navigate(['resources/case-study/',data.title.replace(/ /g, '-')]); 
    }

  getIconUrl(service: any): string {
    if (service.extensioniconName === 'svg') {
      return 'data:image/svg+xml;base64,' + service.data;
    } else {
      return 'data:image/' + service.extensioniconName + ';base64,' + service.data;
    }
  }

}
