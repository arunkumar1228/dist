import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-service-cloud',
  templateUrl: './service-cloud.component.html',
  styleUrls: ['./service-cloud.component.scss']
})
export class ServiceCloudComponent  implements OnInit{
  currentUrl: string;
  constructor(private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router){
    this.titleService.setTitle('Unleash Service Brilliance: Salesforce Service Cloud');
    this.metaService.addTag({ name: 'description', content:"Empower your business with our Salesforce Service Cloud solutions. Elevate customer support, streamline processes, and exceed service expectations for success."});
  
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
  }

}
