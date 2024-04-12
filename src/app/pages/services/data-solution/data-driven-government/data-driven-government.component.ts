import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-data-driven-government',
  templateUrl: './data-driven-government.component.html',
  styleUrls: ['./data-driven-government.component.scss']
})

export class DataDrivenGovernmentComponent implements OnInit{
  currentUrl: string;
  constructor(private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router){
    this.titleService.setTitle('Elevate Decision-Making with Actionable Data Insights');
    this.metaService.addTag({ name: 'description', content:"SDiscover the power of actionable Data Insights. Make informed decisions, drive strategies, and achieve success with our transformative insights services."});

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
