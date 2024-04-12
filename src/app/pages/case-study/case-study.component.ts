import { Component, OnInit } from '@angular/core';
import { CaseStudyService } from 'src/app/api/qbrainx-api/services/PageServices/casestudy-service.service';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-case-study',
  templateUrl: './case-study.component.html',
  styleUrls: ['./case-study.component.scss']
})
export class CaseStudyComponent {
  caseStudyArrayList=[];
  caseStudyArray = [];
  lastpage;
  currentPage: number = 1;
  itemsPerPage: number = 9;
  loader;
  
  currentUrl: string;
  constructor(private caseStudyService:CaseStudyService,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) { }
  
 

  ngOnInit(): void {
    this.loader=true;
    this.caseStudyList();
    // Subscribe to the Router events
this.router.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {
    // Trigger a window reload when the route changes
    window.location.reload();
  }
});

// Set the current URL and canonical URL
this.currentUrl = window.location.origin + this.location.path();
const link: HTMLLinkElement = this.renderer.createElement('link');
link.rel = 'canonical';
link.href = this.currentUrl;
this.renderer.appendChild(document.head, link);

  }

  caseStudyList(){
    this.caseStudyService.getCaseStudyDetails().subscribe((res:any) => {
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
      this.loader=false;
    }
      
      else{
        console.error("error")
      }
    });
  }

  // Function to change the current page
  changePreviousPage() {
    this.loader=true;
    this.currentPage = this.currentPage - 1;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.caseStudyArrayList= this.caseStudyArray.slice(startIndex, endIndex);
  this.loader=false;
  }

  changeNextpage(){
    this.loader=true;
    this.currentPage=this.currentPage + 1; 
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.caseStudyArrayList= this.caseStudyArray.slice(startIndex, endIndex);
  this.loader=false;
  }

  caseStudydetails(data){

    this.caseStudyService.setCaseStudyObject(data);
    this.router.navigate(['resources/case-study/',data.title.replace(/ /g, '-')]); 
  }


}


