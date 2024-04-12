import { Component, OnInit } from '@angular/core';
import { SuccessStoriesService } from 'src/app/api/qbrainx-api/services/PageServices/successstories-service.service';

import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.scss']
})
export class SuccessStoriesComponent implements OnInit {

 
  successstoriesArray = [];
  successstoriesArrayList = [];
  lastpage;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  loader;
  currentUrl: string;

  constructor(private successStoriesService:SuccessStoriesService,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) { }
  

  ngOnInit(): void {
    this.loader=true;
    this.successstoriesList();
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
    
    console.log(this.currentUrl);
  }

  successstoriesList(){
    this.successStoriesService.getSuccessStoriesDetails().subscribe((res:any) => {
      if(res) {
        res.forEach((e,index) => {
         let extension = e.fileName.split('.');
         this.successstoriesArray.push({
              image: e.data,
              extension: extension[1],
              text: e.text,
              subTitle: e.subTitle,
              title: e.title,
              date:e.date,
              id:e.id
            })
        });
        this.lastpage=Math.ceil(this.successstoriesArray.length / this.itemsPerPage)
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
      this.successstoriesArrayList= this.successstoriesArray.slice(startIndex, endIndex);
      this.loader=false
    }
      
      else{
        console.error("error")
      }
    });
  }


  // Function to change the current page
  changePreviousPage() {
    this.loader=true;
    this.currentPage = this.currentPage - 1;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  this.successstoriesArrayList= this.successstoriesArray.slice(startIndex, endIndex);
  this.loader=false;
  }

  changeNextpage(){
    this.loader=true;
    this.currentPage=this.currentPage + 1; 
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  this.successstoriesArrayList= this.successstoriesArray.slice(startIndex, endIndex);
  this.loader=false;
  }

  successstoriesdetails(data){

    this.successStoriesService.setSuccessStoriesObject(data);
    this.router.navigate(['resources/success-stories/',data.subTitle.replace(/ /g, '-')]); 
  }


}


