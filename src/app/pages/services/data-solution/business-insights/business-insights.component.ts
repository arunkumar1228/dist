import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-business-insights',
  templateUrl: './business-insights.component.html',
  styleUrls: ['./business-insights.component.scss']
})
export class BusinessInsightsComponent implements OnInit{
  currentUrl: string;
  constructor(private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router){
    this.titleService.setTitle('Gain Valuable Business Insights for Success');
    this.metaService.addTag({ name: 'description', content:"Empower your decisions with our Business Insights services. Leverage data-driven strategies, optimize operations, and achieve success with actionable insights."});

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
