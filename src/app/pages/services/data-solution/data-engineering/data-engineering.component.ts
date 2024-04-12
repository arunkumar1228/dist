import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-data-engineering',
  templateUrl: './data-engineering.component.html',
  styleUrls: ['./data-engineering.component.scss']
})
export class DataEngineeringComponent implements OnInit{
  currentUrl: string;
  constructor(private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router){
    this.titleService.setTitle('Optimize Data with Expert Data Engineering Services');
    this.metaService.addTag({ name: 'description', content:"Empower your business with our Data Engineering Services. Streamline data processes, enhance efficiency, and unlock the full potential of your data infrastructure."});

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
