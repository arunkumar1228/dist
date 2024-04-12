import { Component,OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-cpq',
  templateUrl: './cpq.component.html',
  styleUrls: ['./cpq.component.scss']
})
export class CpqComponent implements OnInit {
  currentUrl: string;
  constructor(private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router){
    this.titleService.setTitle('Maximize Sales Potential with Salesforce CPQ');
    this.metaService.addTag({ name: 'description', content:"Optimize quoting processes and boost sales efficiency with our Salesforce CPQ solutions. Drive revenue growth through streamlined pricing and quoting strategies."});
  
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
