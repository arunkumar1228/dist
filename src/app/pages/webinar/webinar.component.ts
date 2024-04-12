import { Component, OnInit } from '@angular/core';
import { WebinarService } from 'src/app/api/qbrainx-api/services/PageServices/webinar-service.service';

import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.scss']
})
export class WebinarComponent implements OnInit {
 
  webinarArray = [];
  webinarArrayList = [];
  lastpage;
  currentPage: number = 1;
  itemsPerPage: number = 9;
  loader;
  registerwebinar: boolean;
  activeTab: string = 'all';
  currentUrl: string;
  constructor(private webinarService: WebinarService,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) { }
  
  ngOnInit(): void {
    this.loader = true;
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
    
  }

  webinarList() {
    this.webinarService.getWebinarDetails().subscribe((res: any) => {
      if (res) {
        res.forEach((e, index) => {
          let Innerextension = e.innerImageFileName.split('.');
          let Outerextension = e.fileName.split('.');

          let date1 = new Date();
          let webinarDate = new Date(e.date);
          this.registerwebinar = webinarDate < date1;

          this.webinarArray.push({
            image: e.data,
            innerextension: Innerextension[1],
            outerextension: Outerextension[1],
            InnerImage: e.innerImage,
            OuterImage: e.data,
            text: e.text,
            subTitle: e.subTitle,
            title: e.title,
            date: e.date,
            link: e.link,
            id: e.id,
            isNew: this.registerwebinar
          });
        });

        this.lastpage = Math.ceil(this.webinarArray.length / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.webinarArrayList = this.webinarArray.slice(startIndex, endIndex);

        this.loader = false;
      } else {
        console.error("error");
      }
    });
  }

  changePreviousPage() {
    this.loader = true;
    this.currentPage = this.currentPage - 1;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.webinarArrayList = this.webinarArray.slice(startIndex, endIndex);
    this.loader = false;
  }

  changeNextpage() {
    this.loader = true;
    this.currentPage = this.currentPage + 1;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.webinarArrayList = this.webinarArray.slice(startIndex, endIndex);
    this.loader = false;
  }

  webinardetails(data) {
    this.webinarService.setWebinarObject(data);
    this.router.navigate(['/resources/webinar/', data.title.replace(/ /g, '-')]); 
  }

  filterWebinars(isNew: boolean) {
    this.loader = true;
    this.webinarArrayList = this.webinarArray.filter(webinar => webinar.isNew === isNew);
    this.activeTab = isNew ? 'completed' : 'upcoming';
    this.loader = false;
  }

  getAllWebinars() {
    this.loader = true;
    this.webinarArrayList = this.webinarArray;
    this.loader = false;
    this.activeTab = 'all';
  }
}
