import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-microservice',
  templateUrl: './microservice.component.html',
  styleUrls: ['./microservice.component.scss']
})
export class MicroserviceComponent implements OnInit {

  currentUrl: string;
  serviceArray = [];
  constructor(private httpClient: HttpClient,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) { 
    this.titleService.setTitle('Microservice Consulting Services: Agile Solutions for Success');
    this.metaService.addTag({ name: 'description', content:"Explore the power of Microservice Consulting Services for precise, scalable, and innovative solutions. Elevate your architecture for optimal performance and success." });
  
  }


  ngOnInit(): void {
    this.blogList();
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
  blogList() {
    this.httpClient
      .get('https://qbrainx.com/qbrainx-web/v1/Common-Service/byServiceName?serviceName=microservice', {
        responseType: 'text' as 'json'
      })
      .subscribe((data: any) => {
        JSON.parse(data).forEach((e: any) => {
          let fileName = e.fileName.split('.');

          this.serviceArray.push({
            data: e.data,
            extensioniconName: fileName[1],
            serviceName: e.serviceName,
            buttonName: e.buttonName,
            link: e.link,
            title: e.title,
            text: e.text,
            serviceId: e.serviceId,

            fileName: e.fileName,
          })
        });
      });
  }

  getIconUrl(service: any): string {
    if (service.extensioniconName === 'svg') {
      return 'data:image/svg+xml;base64,' + service.data;
    } else {
      return 'data:image/' + service.extensioniconName + ';base64,' + service.data;
    }
  }

}
