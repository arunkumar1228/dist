import { Component, OnInit,AfterViewInit  } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import {Swiper } from 'swiper';
import { CaseStudyService } from 'src/app/api/qbrainx-api/services/PageServices/casestudy-service.service';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-servicenow',
  templateUrl: './servicenow.component.html',
  styleUrls: ['./servicenow.component.scss']
})
export class ServicenowComponent implements OnInit, AfterViewInit {
  whatWeOffer:any;
  fieldSelected:number=0;
  selected:any="1";
  serviceArray = [];
  swiper: Swiper;
  caseStudyArray = [];
  caseStudyArrayList = [];
  currentUrl: string;
  lastpage;
  currentPage: number = 1;
  itemsPerPage: number = 4;
    constructor(private httpClient: HttpClient,private caseStudyService:CaseStudyService,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) { 
      this.titleService.setTitle('ServiceNow Consulting Services | Expert Transformation Support');
      this.metaService.addTag({ name: 'description', content:"Explore our top-tier ServiceNow Consulting Services for streamlined workflows and optimized IT operations. Partner with experts for seamless implementation and transformative solutions." });
    
    }
  

  
  ngAfterViewInit(): void {
  this.swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto', // Make the slides draggable
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    });
  }

  autoPlayWhatWeOffers()

{

this.whatWeOffer=setInterval(() =>{

    this.fieldSelected++;

    if(this.fieldSelected == 3) {

      this.fieldSelected=0;

    }

  }, 5000);

}

  ngOnInit(): void {
    this.blogList();
    this.autoPlayWhatWeOffers();
    this.caseStudyList('servicenow');
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
      .get('https://qbrainx.com/qbrainx-web/v1/Common-Service/byServiceName?serviceName=servicenow', {
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

  getIconUrl(service: any): string {
    if (service.extensioniconName === 'svg') {
      return 'data:image/svg+xml;base64,' + service.data;
    } else {
      return 'data:image/' + service.extensioniconName + ';base64,' + service.data;
    }
  }

  previous()
{
  this.fieldSelected--;
  if(this.fieldSelected<0)
  {
    this.fieldSelected=2
  }
  clearInterval(this.whatWeOffer)
  this.autoPlayWhatWeOffers();
}

next()
{
  this.fieldSelected++;
  if(this.fieldSelected>=3)
  {
    this.fieldSelected=0
  }
  clearInterval(this.whatWeOffer);
  this.autoPlayWhatWeOffers();
  
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


}
