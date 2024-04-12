import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-career-detail',
  templateUrl: './career-detail.component.html',
  styleUrls: ['./career-detail.component.scss']
})
export class CareerDetailComponent implements OnInit {



  careerDetailObj: any;
  serviceObj:any;
  categoryObj:any;
  formEdit = false;
  uniqueServiccategory: string[] = [];
  categoryEdit=false;
  blogArray = [];

  @ViewChild('careerImageInput') careerImageInput!: ElementRef;
  careerImage!: File | null;

  ngOnInit(): void {
    this.findUniqueCategory();
    this.allCareerDetailList();
  }
  CareerDetailForm = new FormGroup({
    jobDescription: new FormControl(''),
    jobTitle: new FormControl(''),
    jobBrief: new FormControl(''),
    category:new FormControl(''),
    responsibilities: new FormControl(''),
    skills: new FormControl(''),
    salary: new FormControl(''),
    jobType: new FormControl(''),
    location: new FormControl('')
  });
  CareerDetailUpdate = new FormGroup({
    jobDescription: new FormControl(''),
    jobTitle: new FormControl(''),
    jobBrief: new FormControl(''),
    category:new FormControl(''),
    responsibilities: new FormControl(''),
    skills: new FormControl(''),
    salary: new FormControl(''),
    jobType: new FormControl(''),
    location: new FormControl(''),
    careerId: new FormControl(''),
  });
  CareerDetailDelete = new FormGroup({
    careerId: new FormControl('')
  });

  quillConfig={
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],           
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      
        [{ 'indent': '-1'}, { 'indent': '+1' }],          
        [{ 'direction': 'rtl' }],                        

        [{ 'size': ['small', false, 'large', 'huge'] }], 
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],    

        ['link'],
        ['link', 'image', 'video']  
      ],
      
    },
  }
  constructor(private httpClient: HttpClient) { }

  careerDetailSubmit() {
    const formData = new FormData();
    formData.append('file', this.careerImage);
    formData.append('careerRequest', JSON.stringify(this.CareerDetailForm.value));

    this.httpClient.post<any>('https://qbrainx.com/qbrainx-web/v1/Careers/createCareer', formData)
      .subscribe(
        (response) => {
          this.CareerDetailForm.reset();
          if (this.careerImageInput && this.careerImageInput.nativeElement) {
            this.careerImageInput.nativeElement.value = '';
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
  careerDetailUpdate() {
    const formData = new FormData();
    formData.append('file', this.careerImage);
    formData.append('careerRequest', JSON.stringify(this.CareerDetailUpdate.value));
    this.httpClient.put('https://qbrainx.com/qbrainx-web/v1/Careers/careerUpdateDetailsById?id=' + this.CareerDetailUpdate.value.careerId + '', formData).subscribe(
      (response) => {
        this.CareerDetailUpdate.reset();
        if (this.careerImageInput && this.careerImageInput.nativeElement) {
          this.careerImageInput.nativeElement.value = '';
        }
      },
      (error) => {
        console.error(error);
      });
    this.CareerDetailUpdate.reset();
  }
  careerDetailDelete() {
    this.httpClient.delete('https://qbrainx.com/qbrainx-web/v1/Careers/careerDeleteById?id=' + this.CareerDetailDelete.value.careerId, {
      responseType: 'text'
    })
      .subscribe((data) => {
        window.location.reload();
      });
  }

  allCareerDetailList() {
    this.httpClient
    .get<any[]>('https://qbrainx.com/qbrainx-web/v1/Careers/getAllCareer',  {
      responseType: 'json'
    })
    .subscribe(data => {
      data.forEach((e,index) => {
       let extension = e.iconName.split('.');
       this.blogArray.push({
        icon: e.Icon,
            extension: extension[1],
            jobDescription: e.jobDescription,
            jobTitle: e.jobTitle,
            jobBrief: e.jobBrief,
            responsibilities: e.responsibilities,
            skills: e.skills,
            salary: e.salary,
            jobType: e.jobType,
            category:e.category,
            location: e.location,
            postDate:e.postDate,
            link:e.link,
            careerId:e.careerId
          })
      });
  });
  }

  onChange(event: any) {
    this.httpClient.get<any>('https://qbrainx.com/qbrainx-web/v1/Careers/byCategory?category=' + event.target.value, {
      responseType: 'json'
    }).subscribe(data => {
      this.careerDetailObj = data;
      this.formEdit = true;
    });
  }

  banImage(event: any) {
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ) {
      this.careerImage = event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  clearForm() {
    this.CareerDetailForm.reset();
    if (this.careerImageInput && this.careerImageInput.nativeElement) {
      this.careerImageInput.nativeElement.value = '';
    }
  }

  
  findUniqueCategory() {
    const serviceNameSet = new Set<string>();
    this.blogArray.forEach(blog => {
      serviceNameSet.add(blog.category);
    });
    this.uniqueServiccategory  = Array.from(serviceNameSet);
  }

  getServiceId(event: any) {
    this.httpClient
      .get<any>('https://qbrainx.com/qbrainx-web/v1/Careers/careerGetById?id=' + event.target.value, {
        responseType: 'json'
      })
      .subscribe(data => {
       
        
      this.serviceObj = data;
      this.categoryEdit = true;
    });
  }
}
