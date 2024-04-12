import { Component, OnInit,AfterViewInit  } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CaseStudyService } from 'src/app/api/qbrainx-api/services/PageServices/casestudy-service.service';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import Swiper, { Navigation } from 'swiper';
@Component({
  selector: 'app-data-science',
  templateUrl: './data-science.component.html',
  styleUrls: ['./data-science.component.scss']
})
export class DataScienceComponent implements OnInit {
  currentUrl: string;
  whatWeOffer:any;
  fieldSelected:number=0;
  selected:any="1";
  serviceArray = [];
  caseStudyArray = [];
  caseStudyArrayList = [];
  lastpage;
  swiper: Swiper;
  currentPage: number = 1;
  itemsPerPage: number = 3;
    constructor(private httpClient: HttpClient,private caseStudyService:CaseStudyService,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) { 
      this.titleService.setTitle('Unlock Innovation with Gen AI Solutions');
      this.metaService.addTag({ name: 'description', content:"Explore the future of technology with our Gen AI solutions. Embrace innovation, automation, and intelligence for a smarter and more efficient digital landscape."});
  
    }
  

  ngOnInit(): void {
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
    this.caseStudyList('gen-ai');
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
