import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.scss']
})
export class CultureComponent  implements OnInit  {
  currentUrl: string;

  blogArray = [];
  constructor(private httpClient : HttpClient,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) {
    this.titleService.setTitle('Our Culture - QBrainX - Digital Transformation');
    this.metaService.addTag({ name: 'description', content:"QBrainX has recruited employees with various qualifications and skills. Academic excellence and high-performing individuals are important to us."});
   }
  
  

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
    .get<any[]>('https://qbrainx.com/qbrainx-web/v1/OurCulture/getAll',  {
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

            text: e.text,


            id:e.id

          })

      });

  });

  }


}
