import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-leadership',
  templateUrl: './leadership.component.html',
  styleUrls: ['./leadership.component.scss']
})
export class LeadershipComponent implements OnInit {
  currentUrl: string;

  blogArray = [];
  constructor(private httpClient : HttpClient,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) { }
  
  

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
  blogList(){
    this.httpClient
    .get<any[]>('https://qbrainx.com/qbrainx-web/v1/LeaderShip/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
    
      data.forEach((e,index) => {

       let extension = e.fileName.split('.');

       this.blogArray.push({

            image: e.data,

            extension: extension[1],

            name: e.name,

            jobTitle: e.jobTitle,

            link: e.link,

            text: e.text,
            category: e.category,


            id:e.id

          })

      });

  });

  }



}
