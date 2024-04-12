import { Component ,OnInit} from '@angular/core';
import { LetsTalk } from 'src/app/api/qbrainx-api/models/talk.model';
import { NewsService } from 'src/app/api/qbrainx-api/services/PageServices/news-service.service';

import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-lets-talk',
  templateUrl: './lets-talk.component.html',
  styleUrls: ['./lets-talk.component.scss']
})
export class LetsTalkComponent implements OnInit {
  
  sucessMessage: boolean = false;
  letsTalk: LetsTalk = {
    name: '',
    designation: '',
    email: '',
    number: '',
    industry: '',
    contactNumber: '',
    message: ''
  };
  currentUrl: string;
  submitted: boolean = false; // Track whether the form has been submitted
  successMessage: string = '';
  constructor(private letsTalkService: NewsService,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router) {}

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
  clearFormData() {
    // Clear the form data
    this.letsTalk = {
      name: '',
      designation: '',
      email: '',
      number: '',
      industry: '',
      contactNumber: '',
      message: ''
    };
    this.submitted = false;
  }
  
  submitForm() {
    this.letsTalkService.submitForm(this.letsTalk).subscribe(
      response => {
        console.log('Form submitted successfully:', response);
  
        // Navigate to thank-you page after submission
        setTimeout(() => {
          this.router.navigate(['lets-talk/Thank-you']);
          this.submitted = true;
        }, 2000);        
      },
      error => {
        console.error('Form submission failed:', error);
      }
    );
  }
  
  
}
