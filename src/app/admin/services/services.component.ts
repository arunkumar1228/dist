import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  @ViewChild('iconImageInput') iconImageInput!: ElementRef;
  icon!: File | null;

  @ViewChild('serviceImageInput') serviceImageInput!: ElementRef;
  serviceImage!: File | null;

  ServiceForm= new FormGroup({
    serviceName: new FormControl(''),
    serviceDescription:new FormControl(''),
    link:new FormControl('')
  });

  ServiceUpdate= new FormGroup({
    serviceName: new FormControl(''),
    serviceDescription:new FormControl(''),
    link:new FormControl(''),
    serviceId: new FormControl(''),
  });

  ServiceDetails:any;
  ServiceDelete = new FormGroup({
    serviceId: new FormControl('')   

  });
  serviceObj: any;
  formEdit = false;
  quillConfig={
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        //[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        //[{ 'direction': 'rtl' }],                         // text direction

        //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        //[{ 'font': [] }],
        //[{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link'],
        //['link', 'image', 'video']  
      ],

    },
  }

  constructor(private router:Router,private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.allServiceList()
  }

  onChange(event: any) {
    this.httpClient
      .get<any>('https://qbrainx.com/qbrainx-web/v1/menu-services/getById/' + event.target.value, {
        responseType: 'json'
      })
      .subscribe(data => {
        this.serviceObj = data;
        this.formEdit = true;
      });
  }

  clearForm() {
    this.ServiceForm.reset();


    // Clear the value of the file input element
    if (this.iconImageInput && this.iconImageInput.nativeElement) {
      this.iconImageInput.nativeElement.value = '';
    }
    if (this.serviceImageInput && this.serviceImageInput.nativeElement) {
      this.serviceImageInput.nativeElement.value = '';
    }
  }

  IconImage(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg' ||
      event.target.files[0].type == 'image/svg+xml'||
      event.target.files[0].type == 'image/svg')
    {
      this.icon=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  ServiceImage(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg' ||
      event.target.files[0].type == 'image/svg+xml'||
      event.target.files[0].type == 'image/svg')
      {
      this.serviceImage=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }


  allServiceList(){
    this.httpClient
    .get<any>('https://qbrainx.com/qbrainx-web/v1/menu-services/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      this.ServiceDetails = data;
    });
  }

  serviceSubmit()
  {
    
   let body = new FormData();
  
   body.append("serviceIcon", this.icon);
   body.append("backgroundImage", this.serviceImage);
   let plainText = this.ServiceForm.value.serviceDescription.replace(/<[^>]*>/g, '');
   this.ServiceForm.value.serviceDescription=plainText;
   body.append('serviceRequest', JSON.stringify(this.ServiceForm.value));
    this.httpClient
    .post('https://qbrainx.com/qbrainx-web/v1/menu-services/create', body, {
      responseType: 'text' as 'json'
    })
    .subscribe((data) => {
      this.ServiceForm.reset();
        // Clear the value of the file input element
    if (this.iconImageInput && this.iconImageInput.nativeElement) {
      this.iconImageInput.nativeElement.value = '';
    }
    if (this.serviceImageInput && this.serviceImageInput.nativeElement) {
      this.serviceImageInput.nativeElement.value = '';
    }
    });
}

serviceUpdate()
{
  
  let formData = new FormData();
  
  formData.append("serviceIcon", this.icon);
  formData.append("backgroundImage", this.serviceImage);
   let plainText = this.ServiceUpdate.value.serviceDescription.replace(/<[^>]*>/g, '');
   this.ServiceUpdate.value.serviceDescription=plainText;
   formData.append('serviceRequest', JSON.stringify(this.ServiceUpdate.value));;
    
  
  this.httpClient
  .put('https://qbrainx.com/qbrainx-web/v1/menu-services/updateDetailsById/'+ this.ServiceUpdate.value.serviceId +'', formData).subscribe(
    (response) => {
      this.ServiceUpdate.reset();
        // Clear the value of the file input element
    if (this.iconImageInput && this.iconImageInput.nativeElement) {
      this.iconImageInput.nativeElement.value = '';
    }
    if (this.serviceImageInput && this.serviceImageInput.nativeElement) {
      this.serviceImageInput.nativeElement.value = '';
    }
    },
    (error) => {
      // Handle error response
      console.error(error);
    }
  );

}

testimonialDelete(){
  this.httpClient
   .delete('https://qbrainx.com/qbrainx-web/v1/menu-services/deleteById/'+this.ServiceDelete.value.serviceId, {
     responseType: 'text'
   })
   .subscribe((data) => {
     window.location.reload();
   });
  }

}
