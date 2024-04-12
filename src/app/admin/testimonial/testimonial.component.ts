import { Component } from '@angular/core';
import { AdminPanalService } from '../admin-panal.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent {

  TestimonialForm= new FormGroup({
    title: new FormControl(''),
    subTitle:new FormControl(''),
    text:new FormControl(''),
    
  });
  
  TestimonialUpdate= new FormGroup({
    title: new FormControl(''),
    subTitle:new FormControl(''),
    text:new FormControl(''),
    id:new FormControl('')
  });

  TestimonialDelete= new FormGroup({
    id:new FormControl('')
  });
  public webinarDetails:any=[];
  testimonialImage!: File;
  testimonialObj: any;

  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link'],
        ['link', 'image', 'video']  
      ],
      
    },
  }
  testimoniallist:any;
  TestimonialDetails: any=[];
  formEdit = false;


  constructor(private adminPanalService: AdminPanalService, private router: Router, private httpClient: HttpClient) { }
  ngOnInit(): void {
   
  }

  testImage(event: any) {

    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ) {
      this.testimonialImage = event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  onChange(event: any) {
    this.httpClient
      .get<any>('https://qbrainx.com/qbrainx-web/v1/Testimonial/getById/' + event.target.value, {
        responseType: 'json'
      })
      .subscribe(data => {
        this.testimonialObj = data;
        this.formEdit = true;
      });
  }


  testimonialSubmit()
  {
    
    const formData = new FormData();
    let plainText = this.TestimonialForm.value.text.replace(/<[^>]*>/g, '');
    this.TestimonialForm.value.text=plainText;
   formData.append('file', this.testimonialImage);
    formData.append('testimonialRequest', JSON.stringify(this.TestimonialForm.value));
   this.httpClient.post<any>('https://qbrainx.com/qbrainx-web/v1/Testimonial/create', formData).subscribe(
     (response) => {
       this.TestimonialForm.reset();
       this.testimonialImage=null;
     },
     (error) => {
       // Handle error response
       console.error(error);
     }
   );
  }

  getAllTestimonialDetails() {

    this.httpClient
      .get('https://qbrainx.com/qbrainx-web/v1/Testimonial/getAll', {
        responseType: 'text' as 'json'
      })
      .subscribe((data: any) => {
       JSON.parse(data).forEach((e: any) => {        
          let extension = e.fileName.split('.');
          this.TestimonialDetails.push({
            image: e.data,
            extension: extension[1],
            title: e.title,
            subTitle: e.subTitle,
            id: e.id,
            text: e.text,
            fileName: e.fileName
          })
        });
      });
  }


  testimonialUpdate()
  {
    const formData = new FormData();
    formData.append('file', this.testimonialImage);
    let plainText = this.TestimonialUpdate.value.text.replace(/<[^>]*>/g, '');
    this.TestimonialUpdate.value.text=plainText;
    
     formData.append('testimonialRequest', JSON.stringify(this.TestimonialUpdate.value));
        this.httpClient
    .put('https://qbrainx.com/qbrainx-web/v1/Testimonial/updateDetailsById/'+ this.TestimonialUpdate.value.id +'', formData).subscribe(
      (response) => {
        // Handle successful response
       
        this.TestimonialUpdate.reset();
        this.testimonialImage=null;
      },
      (error) => {
        // Handle error response
        console.error(error);
      }
    );

  }



  delete(){
    this.httpClient
     .delete('https://qbrainx.com/qbrainx-web/v1/Testimonial/deleteById/'+ this.TestimonialDelete.value.id ,{
      responseType: 'text'
    })
    .subscribe((data) => {
      window.location.reload();
    });

}

clearForm() {
  this.TestimonialForm.reset();


  // Clear the value of the file input element
  if (this.testimonialImage) {
    this.testimonialImage= null;
  }
  
}
}