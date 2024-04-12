import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CareerService } from 'src/app/api/qbrainx-api/services/PageServices/career-service.service';
import { Title } from '@angular/platform-browser';
import { Meta } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.scss']
})
export class CareerDetailComponent {
  currentUrl: string;
  careerArray = [];
  careerdetail= [];
  careerResult= [];
  constructor(private careerService: CareerService,private titleService: Title,private metaService: Meta,private location:Location,private renderer: Renderer2,private router: Router    ) { }

  
  @ViewChild('careerImageInput') careerImageInput!: ElementRef;
  careerImage!: File | null;
  isLoading = false;
  successMessage = '';
  CareerForm = new FormGroup({
    fullName: new FormControl(''),
    phoneNumber: new FormControl(''),
    emailId: new FormControl(''),
    position: new FormControl(''),
    totalExperience: new FormControl(''),
    coverLetter: new FormControl('')
  });

  clearForm() {
    this.CareerForm.reset();
    // Clear the value of the file input element
    if (this.careerImageInput && this.careerImageInput.nativeElement) {
      this.careerImageInput.nativeElement.value = '';
    }
  }
  

  ngOnInit(): void {
    this.careerList();
    // Subscribe to the Router events
this.router.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {
    // Trigger a window reload when the route changes
    window.location.reload();
  }
});

// Set the current URL and canonical URL
this.currentUrl = window.location.origin + this.location.path();
const link: HTMLLinkElement = this.renderer.createElement('link');
link.rel = 'canonical';
link.href = this.currentUrl;
this.renderer.appendChild(document.head, link);

  }

  careerSubmit() {
    this.isLoading = true; 
    this.successMessage = ''; // Reset success message

    const formData = new FormData();
    formData.append('file', this.careerImage);
    formData.append('careerRegisterRequest', JSON.stringify(this.CareerForm.value));

    this.careerService.saveCareerDetails(formData).subscribe({
      next: (res: any) => {
        this.CareerForm.reset(); // Reset the form
        if (this.careerImageInput && this.careerImageInput.nativeElement) {
          this.careerImageInput.nativeElement.value = ''; // Reset file input
        }
        this.isLoading = false; 
        this.successMessage = 'Your submission was successful!'; 
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        console.error(err); // Log error
        this.isLoading = false; // Stop loading in case of error
      }
    });
  }


  banImage(event: any) {
    
    if (
      event.target.files[0].type == 'application/doc' ||
      event.target.files[0].type == 'application/docx' ||
      event.target.files[0].type == 'application/pdf'
    ) {
      this.careerImage = event.target.files[0];
    }
    else {
      alert("Select Only Document")
      this.careerImageInput.nativeElement.value = '';
    }
  }

  careerList(){

    this.careerService.selectedCareer.subscribe((value) => {
      if (value.careerId) {
        localStorage.setItem('careerval', JSON.stringify(value));
        this.careerdetail = value;
      } else {
        value = localStorage.getItem('careerval');
        this.careerdetail = JSON.parse(value);
      }
      if (value) {
        this.careerResult.push(this.careerdetail);
        this.careerResult.forEach((e, index) => {
          this.careerArray.push({
            extension: e.extension,
            jobDescription: e.jobDescription,
            jobTitle: e.jobTitle,
            jobBrief: e.jobBrief,
            responsibilities: e.responsibilities,
            skills: e.skills,
            salary: e.salary,
            jobType: e.jobType,
            location: e.location,
            postDate:e.postDate,
            careerId:e.careerId
          })
        });
      }
    });
  }

}
