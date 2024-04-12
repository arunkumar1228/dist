import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})
export class CrmComponent implements OnInit {
  currentUrl: string;
  constructor(private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router){ 
       this.titleService.setTitle('Optimize Operations with Salesforce CRM Solutions');
  this.metaService.addTag({ name: 'description', content:"Transform your business with our Salesforce CRM solutions. Enhance customer relationships, streamline sales processes, and achieve success with tailored CRM strategies."});
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
