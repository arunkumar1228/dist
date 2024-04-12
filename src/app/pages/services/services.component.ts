import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  currentUrl: string;
  blogArray = [];
  constructor(private httpClient: HttpClient,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) { }


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
      .get('https://qbrainx.com/qbrainx-web/v1/menu-services/getAll', {
        responseType: 'text' as 'json'
      })
      .subscribe((data: any) => {
        JSON.parse(data).forEach((e: any) => {
          let IconName = e.iconName.split('.');
          let ServiceImage = e.serviceImage.split('.');

          this.blogArray.push({
            Icon: e.icon,
            ServiceImage: e.serviceImage,

            extensionserviceImage: ServiceImage[1],
            extensioniconName: IconName[1],
            serviceName: e.serviceName,
            link: e.link,
            serviceDescription: e.serviceDescription,
            serviceId: e.serviceId,

            iconName: e.iconName,
            serviceImagefileName: e.serviceImage
          })
        });
      });
  }
  getIconUrl(blog: any): string {
    if (blog.extensioniconName === 'svg') {
      return 'data:image/svg+xml;base64,' + blog.Icon;
    } else {
      return 'data:image/' + blog.extensioniconName + ';base64,' + blog.Icon;
    }
  }

  getbackgroundUrl(blog: any): string {
    if (blog.extensionserviceImage === 'svg') {
      return 'data:image/svg+xml;base64,' + blog.ServiceImage;
    } else {
      return 'data:image/' + blog.extensionserviceImage + ';base64,' + blog.ServiceImage;
    }
  }
}
