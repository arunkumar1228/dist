import { Component, OnInit } from '@angular/core';
import { CaseStudyService } from 'src/app/api/qbrainx-api/services/PageServices/casestudy-service.service';
import { PersonalDetailsDto } from 'src/app/api/qbrainx-api/models/PersonalDetailsDto';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-case-study-detail',
  templateUrl: './case-study-detail.component.html',
  styleUrls: ['./case-study-detail.component.scss']

})
export class CaseStudyDetailComponent {

  private id: any; 

  blog:any
  caseStudyResult = [];
  caseStudyData = [];
  caseStudyDatas = [];
  caseStudyArray = [];
  caseStudydetail = [];
  downloaddata;
  sucessMessage: boolean = false;

  personalDetails: PersonalDetailsDto = {

    id: 0,
    name: '',
    emailId: '',
    domain: '',
    category: 'Case-studies'
  };
  pathName;
  
  currentUrl: string;
  constructor(private caseStudyService: CaseStudyService, private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) {

  }

  ngOnInit(): void {
    this.recentcaseStudy()
    this.pathName = this.extractPathName(this.router.url);
    this.caseStudyList();
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
  private extractPathName(url: string): string {
    const urlSegments = url.split('/');
   const pathName = urlSegments[3];
   return pathName.replace(/-/g, ' ');
   }
  
  caseStudyList() {
    this.caseStudyService.getBlogByFormattedTitle(this.pathName).subscribe((res: any) => {
      if (res) {
        res.forEach((e, index) => {
          let extension = e.fileName.split('.');
          this.pathName = this.pathName.replace(/_/g, '-');
          this.id = e.id;
          this.caseStudyArray.push({
            image: e.data,
            extension: extension[1],
            text: e.text,
            subTitle: e.subTitle,
            category: e.category,
            title: e.title,
            date: e.date,
            id: this.id
          })
            }
        );
      }
    });
  }
  recentcaseStudy() {
    this.caseStudyService.getCaseStudyDetails().subscribe((res: any) => {
      if (res) {
        let count = 0; 
  
        res.forEach((e, index) => {
          if (count < 5) { 
            let extension = e.fileName.split('.');
  
            this.caseStudyDatas.push({
              image: e.data,
              extension: extension[1],
              text: e.text,
              subTitle: e.subTitle,
              title: e.title,
              date: e.date,
              id: e.id
            });
  
            count++; 
          }
        });
      } 
    });
  }

 
  
  handleBlogClick(blog: any) {
    const selectedBlog = this.caseStudyDatas.find((b) => b.title === blog.title);
    this.caseStudyArray = [selectedBlog];
    this.router.navigate(['/resources/case-study/', blog.title.replace(/ /g, '-')]);
    
  }
  Submit() {

    let formData = new FormData();
    formData.append('personalDetailsDto', JSON.stringify(this.personalDetails));
 
    this.caseStudyService.uploadImage(formData)
           .subscribe(
        response => {
          this.downloadPdf(this.id)
        },
        error => {
          console.error('Image upload failed:', error);
        }
      );
  }


  downloadPdf(id: number) {

    this.sucessMessage = false;

    this.caseStudyService.downloadPdf(id).subscribe(

      (data: Blob) => {

        this.handlePdfDownload(data);
        this.sucessMessage = true;


      },

      (error) => {

        console.error('Error downloading PDF:', error);

      }

    );

  }

  private handlePdfDownload(pdfData: Blob) {

    const blob = new Blob([pdfData], { type: 'application/pdf' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;

    a.download = this.pathName + '.pdf'

    a.click();

    window.URL.revokeObjectURL(url);

  }


}
