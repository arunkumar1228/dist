import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-snowflake-chat',
  templateUrl: './snowflake-chat.component.html',
  styleUrls: ['./snowflake-chat.component.scss']
})
export class SnowflakeChatComponent {

  currentUrl: string;
  serviceArray = [];
  constructor(private httpClient: HttpClient,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) { 
    this.titleService.setTitle('Qualioptix-App');
    this.metaService.addTag({ name: 'description', content:"Explore the power of Microservice Consulting Services for precise, scalable, and innovative solutions. Elevate your architecture for optimal performance and success." });
  
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
