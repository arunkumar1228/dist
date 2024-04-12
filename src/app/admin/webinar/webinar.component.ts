import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/api/qbrainx-api/services/AdminServices/admin-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
//import { NgbCarouselConfig, NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.scss']
})

export class WebinarComponent implements OnInit {

  WebinarForm= new FormGroup({
    title: new FormControl(''),
    subTitle:new FormControl(''),
    text:new FormControl(''),
    date:new FormControl(''),
    
  });
  
  innerImage!:File;
  WebinarImage!: File;
  WebinarUpdate= new FormGroup({
    title: new FormControl(''),
    subTitle:new FormControl(''),
    text:new FormControl(''),
    date:new FormControl(''),
    link:new FormControl(''),
    id:new FormControl('')
  });

  WebinarDelete= new FormGroup({
    id:new FormControl('')
  });
  public webinarDetails:any=[];

  WebinarObj: any;

  quillConfig = {
    toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          ['link'],
          ['clean'],
        ],
  }
  Webinarlist:any;
  WebinarDetails:any;
  formEdit = false;
      constructor(private adminService:AdminServiceService,private toast:ToastrService, private router:Router,private httpClient : HttpClient, private datePipe: DatePipe ) { 

      }
      ngOnInit(): void {
        this.getAllwebinarDetails();
      }

      InnerImage(event:any)
      {
        
        if (
          event.target.files[0].type == 'image/png' ||
          event.target.files[0].type == 'image/gif' ||
          event.target.files[0].type == 'image/jpeg' ||
          event.target.files[0].type == 'image/jpg'
        ){
          this.innerImage=event.target.files[0];
        }
        else {
          alert("Select Only Image")
        }
      }
    
      testImage(event: any) {

        if (
          event.target.files[0].type == 'image/png' ||
          event.target.files[0].type == 'image/gif' ||
          event.target.files[0].type == 'image/jpeg' ||
          event.target.files[0].type == 'image/jpg'
        ) {
          this.WebinarImage = event.target.files[0];
        }
        else {
          alert("Select Only Image")
        }
      }
      onChange(event: any) {
        this.httpClient
          .get<any>('https://qbrainx.com/qbrainx-web/v1/webinar/getById/' + event.target.value, {
            responseType: 'json'
          })
          .subscribe(data => {
            this.WebinarObj = data;
            this.formEdit = true;
          });
      }
      webinarSubmit()
      {
    
        const formData = new FormData();
       
        let plainText = this.WebinarForm.value.text;
        this.WebinarForm.value.text=plainText;
        const dateToFormat = new Date(this.WebinarForm.value.date);
        const formattedDate = this.datePipe.transform(dateToFormat, 'dd-MM-yyyy HH:mm:ss');    
            this.WebinarForm.value.date=formattedDate;
       formData.append('file', this.WebinarImage);
       formData.append('innerImage',this.innerImage);
       
       formData.append('webinarRequest', JSON.stringify(this.WebinarForm.value));
  
       this.httpClient.post<any>('https://qbrainx.com/qbrainx-web/v1/webinar/create', formData).subscribe(
         (response) => {
           this.WebinarForm.reset();
          
         },
         (error) => {
           // Handle error response
           console.error(error);
         }
       );
      }

      getAllwebinarDetails() {

          this.httpClient
          .get<any>('https://qbrainx.com/qbrainx-web/v1/webinar/getAll',  {
            responseType: 'json'
          })
          .subscribe(data => {
            this.WebinarDetails = data;
          });
        }
      
      webinarUpdate()
      {
        const formData = new FormData();
        let plainText = this.WebinarUpdate.value.text;
        this.WebinarUpdate.value.text=plainText;
        const dateToFormat = new Date(this.WebinarUpdate.value.date);
        const formattedDate = this.datePipe.transform(dateToFormat, 'dd-MM-yyyy HH:mm:ss');    
            this.WebinarUpdate.value.date=formattedDate;
       formData.append('file', this.WebinarImage);
       formData.append('innerImage',this.innerImage);
       
       formData.append('webinarRequest', JSON.stringify(this.WebinarUpdate.value));
         
            this.httpClient
        .put('https://qbrainx.com/qbrainx-web/v1/webinar/updateDetailsById/'+ this.WebinarUpdate.value.id +'', formData).subscribe(
          (response) => {
           
          },
          (error) => {
            // Handle error response
            console.error(error);
          }
        );
    
      }

      delete(){
        this.httpClient
         .delete('https://qbrainx.com/qbrainx-web/v1/webinar/deleteById/'+ this.WebinarDelete.value.id ,{
          responseType: 'text'
        })
        .subscribe((data) => {
          window.location.reload();
        });
    
    }

    
clearForm() {
  this.WebinarForm.reset();


  // Clear the value of the file input element
  if (this.WebinarImage) {
    this.WebinarImage= null;
    this.innerImage=null;
  }
  
}

}