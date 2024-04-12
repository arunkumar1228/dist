import { Component,OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-sales-cloud',
  templateUrl: './sales-cloud.component.html',
  styleUrls: ['./sales-cloud.component.scss']
})
export class SalesCloudComponent  implements OnInit{
  currentUrl: string;
  constructor(private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router){
    this.titleService.setTitle('Boost Sales Efficiency with Salesforce Sales Cloud');
    this.metaService.addTag({ name: 'description', content:"Empower your sales team with our Salesforce Sales Cloud solutions. Streamline processes, drive growth, and achieve sales excellence with tailored cloud strategies."});
  
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
