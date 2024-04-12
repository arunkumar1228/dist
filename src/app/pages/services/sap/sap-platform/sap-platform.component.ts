import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CaseStudyService } from 'src/app/api/qbrainx-api/services/PageServices/casestudy-service.service';

@Component({
  selector: 'app-sap-platform',
  templateUrl: './sap-platform.component.html',
  styleUrls: ['./sap-platform.component.scss']
})
export class SapPlatformComponent implements OnInit {

  currentUrl: string;
  serviceArray = [];
  caseStudyArray = [];
  caseStudyArrayList = [];
  lastpage;
  currentPage: number = 1;
  itemsPerPage: number = 7;
  constructor(private httpClient: HttpClient,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router,private caseStudyService:CaseStudyService){
    this.titleService.setTitle('Maximize Potential with Our SAP Platform Solutions');
    this.metaService.addTag({ name: 'description', content:"Explore the versatility and power of our SAP platform solutions. Elevate your business operations with a robust, scalable, and integrated SAP platform experience." });
  
  }
  
  ngOnInit(): void {
    
    this.caseStudyList('SapPlatform');
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
  
        this.lastpage = Math.ceil(this.caseStudyArray.length / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.caseStudyArrayList = this.caseStudyArray.slice(startIndex, endIndex);
    }
      
      else{
        console.error("error")
      }
    });
  }
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
