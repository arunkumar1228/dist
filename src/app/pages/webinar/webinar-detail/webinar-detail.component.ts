import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebinarService } from 'src/app/api/qbrainx-api/services/PageServices/webinar-service.service';

import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { PersonalDetailsDto } from 'src/app/api/qbrainx-api/models/PersonalDetailsDto';
import { CaseStudyService } from 'src/app/api/qbrainx-api/services/PageServices/casestudy-service.service';

@Component({
  selector: 'app-webinar-detail',
  templateUrl: './webinar-detail.component.html',
  styleUrls: ['./webinar-detail.component.scss'],
})
export class WebinarDetailComponent implements OnInit {
  id: any;
  sucessMessage:boolean=false;
  webinarResult = [];
  webinarData = [];
  webinarArray = [];
  webinardetail = [];
  registerwebinar ;// Changed to boolean
  
  personalDetails: PersonalDetailsDto = {
    id: 0,
    name: '',
    emailId: '',
    domain: '',
    category: ' ',
  };
  currentUrl: string;
  pathName;
  constructor(
    private webinarService: WebinarService,
    private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router,
    private caseStudyService: CaseStudyService
  ) {}

  ngOnInit(): void {
    this.webinarSingle();
    this.webinarList();
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
    
    const currentUrl = this.router.url;

        // Extract the path name from the URL
        this.pathName = this.extractPathName(currentUrl);
  }
  private extractPathName(url: string): string {
    // Assuming the path name is the first segment after the domain
    const urlSegments = url.split('/');
    return urlSegments[3].replace(/-/g, ' '); // Adjust the index based on your URL structure
  }
  webinarSingle() {
    this.webinarService.selectedBlog.subscribe((value) => {
      if (value.id) {
        localStorage.setItem('webinarval', JSON.stringify(value));
        this.webinardetail = value;
      } else {
        value = localStorage.getItem('webinarval');
        this.webinardetail = JSON.parse(value);
      }
      if (value) {
        this.webinarResult.push(this.webinardetail);
        this.webinarResult.forEach((e, index) => {
        this.webinarData.push({
        image: e.image,
        extension: e.extension,
        fileName: e.fileName,
        title: e.title,
        subTitle: e.subTitle,
        date: e.date,
        text: e.text,
        link: e.link,
        });
      
      
        });

        this.router.navigate([
          'resources/webinar/',
          this.webinarData[0].title.replace(/ /g, '-'),
        ]);
      }
    });
  }

  Submit() {
    let formData = new FormData();
    this.sucessMessage=false;
    formData.append('webinarRegister', JSON.stringify(this.personalDetails));
    this.caseStudyService.Register(formData).subscribe(
      (response) => {
        this.sucessMessage=true;
      },
      (error) => {
        console.error('Image upload failed:', error);
      }
    );
  }

  webinarList() {
let currentDate = new Date();

    // Format the date as "dd-MM-yyyy HH:mm:ss"
    let formattedDate = formatDate(currentDate, 'dd-MM-yyyy HH:mm:ss', 'en_US');

    // Use the formatted date in your logic
    let date1: string = formattedDate;
    this.webinarService.getWebinarDetails().subscribe((res: any) => {
      if (res) {
        res.forEach((e, index) => {
          let extension = e.fileName.split('.');
        
  
          if (this.pathName == e.title) {
            this.webinarData.push({
              image: e.data,
              extension: extension[1],
              fileName: e.fileName,
              title: e.title,
              subTitle: e.subTitle,
              date: e.date,
              text: e.text,
              link: e.link,
              id: e.id
            });
          }


  
          this.webinarArray.push({
            image: e.data,
            extension: extension[1],
            text: e.text,
            subTitle: e.subTitle,
            title: e.title,
            date: e.date,
            id: e.id,
          });
let date2: string = formatDate(e.date, 'dd-MM-yyyy HH:mm:ss', 'en_US');

          if (date2 < date1) {
            this.registerwebinar = true;
          } else {
            this.registerwebinar = false;
          }

        });
  
      } else {
        console.error('error');
      }
    });
  }

  
  calculateDiff(sessionDate: string): string {
    const currentDate = new Date();
    const sessionStartDate = new Date(sessionDate);

    if (currentDate >= sessionStartDate) {
      return 'Session is live';
    }

    const timeDifference = sessionStartDate.getTime() - currentDate.getTime();
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}