import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'src/app/api/qbrainx-api/services/PageServices/contactus-service.service';

import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  currentUrl: string;

  contactUsArray = [];
  countryArray=[];
  contactuslist=[];
  markers=[];

  constructor(private contactUsService:ContactUsService,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) {
    this.titleService.setTitle('Contact Us - QBrainX - Digital Transformation');
    this.metaService.addTag({ name: 'description', content:"We would be delighted to hear from you. Please contact us at the mentioned phone number. Alternatively, you can contact us through the listed address."});
   }

 lat: number;
  lng: number;
  zoom: number = 8;

  ngOnInit(): void {
    this.contactusList();
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

  contactusList(){
    this.contactUsService.getContactUsDetails().subscribe((res:any) => {
      if(res) {
        res.forEach((e,index) => {
        
         this.countryArray.push({
              country: e.country,
              state: e.state,
              mainLatitude: e.mainLatitude,
              mainLongitude: e.mainLongitude,
              id:e.id,
              
            })
            e.contacts.forEach((j,index) => {
              this.contactuslist.push({
                cityDivision: j.cityDivision,
                city: j.city,
                state: j.state,
                country: j.country,
                postalCode: j.postalCode,
                latitude:j.latitude,
                longitude:j.longitude,
                address:j.address,
                id:j.id,

              });
              this.markers.push({

                lat: j.latitude,
                lng: j.longitude,
                label: j.cityDivision,
              })

            })
        });
        this.lat=this.countryArray[0].mainLatitude;
        this.lng=this.countryArray[0].mainLongitude;
    }
      
      else{
        console.error("error")
      }
    });
  }

}
