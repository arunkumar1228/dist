import { Component } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { NewsService } from 'src/app/api/qbrainx-api/services/PageServices/news-service.service';
@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent {
  currentUrl: string;
  constructor(private newsService: NewsService,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) {
   
  }

  newsdetail = [];
  newsResult = [];
  newsData = [];
  pathName;

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
    
    
    const currentUrl = this.router.url;
    this.pathName = this.extractPathName(currentUrl); 
    this.newsdetails();
  }
  private extractPathName(url: string): string {
    const urlSegments = url.split('/');
    const pathName = urlSegments[3];
    return decodeURIComponent(pathName.replace(/-/g, ' '));
  }
  

  newsdetails() {
    this.newsService.getBlogByFormattedTitle(this.pathName).subscribe((res: any) => {
      if (res) {
        res.forEach((e, index) => {
          let Innerextension = e.innerImageFileName.split('.');
          this.pathName = this.pathName.replace(/_/g, '-');
            this.newsData.push({
              image: e.data,
              InnerImage: e.innerImage,
              innerextension: Innerextension,
              text: e.text,
              subTitle: e.subTitle,
              title: e.title,
              date: e.date,
              id: e.id,
            });
          }
        );
      } else {
        console.error('error');
      }
    });
  }

}
