import { Component, OnInit } from '@angular/core';
import { SuccessStoriesService } from 'src/app/api/qbrainx-api/services/PageServices/successstories-service.service';
import { SuccessStoryDetails } from 'src/app/api/qbrainx-api/models/Sucess-Story';

import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-success-stories-detail',
  templateUrl: './success-stories-detail.component.html',
  styleUrls: ['./success-stories-detail.component.scss']
})
export class SuccessStoriesDetailComponent {

  currentUrl: string;
  private id: any; 
  successStoriesResult = [];
  successStoriesData = [];
  successStoriesDatas=[];
  successStoriesArray = [];
  successStoriesdetail = [];
  sucessMessage:boolean=false;

  pathName;

  SuccessStoryDetails: SuccessStoryDetails = {
  
    id:0,
    name: '',
    emailId: '',
    domain: '',
    category: 'Sucess-Stories'
  };


  constructor(private successStoriesService: SuccessStoriesService,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) {
   
  }

  ngOnInit(): void {
    // this.successStoriesSingle();
    
    this.recentsuccessStorie();
    const currentUrl = this.router.url;

    // Extract the path name from the URL
    this.pathName = this.extractPathName(currentUrl);
    this.successStoriesList();
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
    
    console.log(this.currentUrl);
  }
  private extractPathName(url: string): string {
    // Assuming the path name is the first segment after the domain
    const urlSegments = url.split('/');
    const pathName = urlSegments[3];
  
    // Replace hyphens with empty spaces and decode URL-encoded characters
    return decodeURIComponent(pathName.replace(/-/g, ' '));
  }

  successStoriesSingle() {
    this.successStoriesService.selectedBlog.subscribe((value) => {
      if (value.id) {
        this.id=value.id
        localStorage.setItem('successStoriesval', JSON.stringify(value));
        this.successStoriesdetail = value;
      } else {
        value = localStorage.getItem('successStoriesval');
        this.successStoriesdetail = JSON.parse(value);
      }
      if (value) {
        this.id=value.id
        this.successStoriesResult.push(this.successStoriesdetail);
        this.successStoriesResult.forEach((e, index) => {
          this.successStoriesData.push({
            image: e.image,
            extension: e.extension,
            fileName: e.fileName,
            title: e.title,
            subTitle: e.subTitle,
            date: e.date,
            text: e.text
          })
        });
      }
    });


  }
  successStoriesList() {
    this.successStoriesService.getBlogByFormattedTitle(this.pathName).subscribe((res: any) => {
      if (res) {
        res.forEach((e, index) => {
          this.id = e.id;
          let extension = e.fileName.split('.');
          this.pathName = this.pathName.replace(/_/g, '-');
          if (this.pathName === e.subTitle) {
          this.successStoriesArray.push({
            image: e.data,
            extension: extension[1],
            text: e.text,
            subTitle: e.subTitle,
            title: e.title,
            date: e.date,
            id: this.id
          })
        }
        });
      }

      else {
        console.error("error")
      }
    });
  }

  recentsuccessStorie(){
    this.successStoriesService.getSuccessStoriesDetails().subscribe((res: any) => {
      if (res) {
        let count = 0; // Counter to track the number of processed blog entries
  
        res.forEach((e, index) => {
          if (count < 5) { // Process only the first 5 entries
            let extension = e.fileName.split('.');
  
            this.successStoriesDatas.push({
              image: e.data,
            extension: extension[1],
            text: e.text,
            subTitle: e.subTitle,
            title: e.title,
            date: e.date,
            id: e.id
            });
  
            count++; // Increment the counter after processing a blog entry
          }
        });
      } else {
        console.error('error');
      }
    });
  }
  
  handleBlogClick(blog: any) {
  
    // Assuming blogList is an array that stores the content for each blog
    const selectedBlog = this.successStoriesDatas.find((b) => b.subTitle === blog.subTitle);
  
    // Update the entire blog list with the content of the selected blog
    this.successStoriesArray = [selectedBlog];
  
    // Navigate to the detailed view using the modified subTitle
    this.router.navigate(['/resources/success-stories', blog.subTitle.replace(/ /g, '-')]);
  }

  Submit() {
    let formData = new FormData();
    formData.append('personalDetailsDto', JSON.stringify(this.SuccessStoryDetails));
 

    this.successStoriesService.uploadImage(formData)
      .subscribe(
        response => {
          // Reset form or perform other actions after successful upload
          this.downloadPdf(this.id)
        },
        error => {
          console.error('Image upload failed:', error);
        }
      );
  }


  downloadPdf(id: number) {
    this.sucessMessage=false;
    this.successStoriesService.downloadPdf(id).subscribe(

      (data: Blob) => {

        this.handlePdfDownload(data);
        this.sucessMessage=true;
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
