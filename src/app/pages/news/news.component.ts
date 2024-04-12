import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/api/qbrainx-api/services/PageServices/news-service.service';

import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  currentUrl: string;
  newsArray = [];
  newsArrayList = [];
  lastpage;
  currentPage: number = 1;
  itemsPerPage: number = 9;
  loader;

  constructor(private newsService: NewsService, private httpClient: HttpClient,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) {
    this.titleService.setTitle('News - QBrainX - Digital Transformation');
    this.metaService.addTag({ name: 'description', content:"See what's buzzing in QBrainX. Organization related news like welcome remarks to new members, internal activities, leadership talk and more."});
   }
  

  ngOnInit(): void {
    this.loader = true;
    this.newsList();
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

  newsList() {
    this.newsService.getNewsDetails().subscribe((res: any) => {
      if (res) {
        res.forEach((e, index) => {
          let Innerextension = e.innerImageFileName.split('.');
            this.newsArray.push({
              image: e.data,
              InnerImage: e.innerImage,
              innerextension: Innerextension[1],
              text: e.text,
              subTitle: e.subTitle,
              title: e.title,
              date: e.date,
              id: e.id,
            });
            this.lastpage = Math.ceil(this.newsArray.length / this.itemsPerPage);
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            this.newsArrayList = this.newsArray.slice(startIndex, endIndex);
            this.loader = false;
          
        });
      }
    });
  }

  // Function to change the current page
  changePreviousPage() {
    this.loader = true;
    this.currentPage = this.currentPage - 1;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.newsArrayList = this.newsArray.slice(startIndex, endIndex);
    this.loader = false;
  }

  changeNextpage() {
    this.loader = true;
    this.currentPage = this.currentPage + 1;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.newsArrayList = this.newsArray.slice(startIndex, endIndex);
    this.loader = false;
  }

  newsdetails(data) {
    this.router.navigate(['/about/news/', data.title.replace(/ /g, '-')]);
  }
}
