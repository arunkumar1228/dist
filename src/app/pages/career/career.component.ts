import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/api/qbrainx-api/services/PageServices/career-service.service';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  careerArray = [];
  category='all';
  careerArrayList = [];
  lastpage;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  loader;
  currentUrl: string;
  constructor(private careerService:CareerService,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router
    ) {
    this.titleService.setTitle('Careers - QBrainX - Digital Transformation');
    this.metaService.addTag({ name: 'description', content:"Join our brilliant team to advance your career with us. We are looking for dedicated individuals to help us build a better future. Follow this page for the most recent job vacancies." });
   }

  


  ngOnInit(): void {
    this.loader=true;
    this.categoryList();
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
  categoryList(){

    this.careerService.getCareerDetails().subscribe((res:any) => {
      if(res) {

        res.forEach((e,index) => {
       let extension = e.iconName.split('.');
       this.careerArray.push({
            // icon: e.icon  ,
            // extension: extension[1],
            jobDescription: e.jobDescription,
            jobTitle: e.jobTitle,
            jobBrief: e.jobBrief,
            responsibilities: e.responsibilities,
            skills: e.skills,
            salary: e.salary,
            jobType: e.jobType,
            location: e.location,
            postDate:e.postDate,
            link:e.link,
            careerId:e.careerId,
            category:e.category
          })
      });

      this.lastpage=Math.ceil(this.careerArray.length / this.itemsPerPage)
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
    this.careerArrayList= this.careerArray.slice(startIndex, endIndex);
this.loader=false;
    }
  });
  }


  
   // Function to change the current page
   changePreviousPage() {
    this.loader=true;
    this.currentPage = this.currentPage - 1;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  this.careerArrayList= this.careerArray.slice(startIndex, endIndex);
  this.loader=false;
  }

  changeNextpage(){
    this.loader=true;
    this.currentPage=this.currentPage + 1; 
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  this.careerArrayList= this.careerArray.slice(startIndex, endIndex);
  this.loader=false;
  }



  jobapply(data){
        this.careerService.setCareerObject(data);
    this.router.navigate(['/about/career/' ,data.jobTitle.replace(/ /g, '-')]); 
  }

  categorycheck(checkval:string){

    if(checkval=='all'){

      this.category=checkval;
    }
    else{
      this.category=checkval;

    }
  }

}
