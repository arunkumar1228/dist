
import { FormControl, FormGroup } from '@angular/forms';
import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-client-feedback',
  templateUrl: './client-feedback.component.html',
  styleUrls: ['./client-feedback.component.scss']
})
export class ClientFeedbackComponent {

  @ViewChild('ClientImageInput') ClientImageInput!: ElementRef;
  ClientImage!: File | null;

  @ViewChild('ClientlogoImageInput') ClientlogoImageInput!: ElementRef;
  ClientlogoImage!: File | null;

  ClientFeedbackForm= new FormGroup({
    clientName: new FormControl(''),
    clientPosition:new FormControl(''),
    feedback:new FormControl('')
  });

  ClientFeedbackUpdate= new FormGroup({
    clientName: new FormControl(''),
    clientPosition:new FormControl(''),
    feedback:new FormControl(''),
    clientId: new FormControl(''),
  });

  ClientDetails:any;
  ClientFeedbackDelete = new FormGroup({
    clientId: new FormControl('')   

  });
  clientObj: any;
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

  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.allClientFeedbackList()
  }

  clearForm() {
    this.ClientFeedbackForm.reset();


    // Clear the value of the file input element
    if (this.ClientImageInput && this.ClientImageInput.nativeElement) {
      this.ClientImageInput.nativeElement.value = '';
    }
    if (this.ClientlogoImageInput && this.ClientlogoImageInput.nativeElement) {
      this.ClientlogoImageInput.nativeElement.value = '';
    }
  }

  onChange(event: any) {
    this.httpClient
      .get<any>('https://qbrainx.com/qbrainx-web/v1/Client/getById/' + event.target.value, {
        responseType: 'json'
      })
      .subscribe(data => {
        this.clientObj = data;
        this.formEdit = true;
      });
  }

  clientLogoImage(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ){
      this.ClientlogoImage=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  clientImage(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ){
      this.ClientImage=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }


  allClientFeedbackList(){
    this.httpClient
    .get<any>('https://qbrainx.com/qbrainx-web/v1/Client/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      this.ClientDetails = data;
    });
  }

  clientFeedbackSubmit()
  {
    
   let body = new FormData();
  
   body.append("clientLog", this.ClientlogoImage);
   body.append("clientImage", this.ClientImage);
   let plainText = this.ClientFeedbackForm.value.feedback;
   this.ClientFeedbackForm.value.feedback=plainText;
   body.append('clientRequest', JSON.stringify(this.ClientFeedbackForm.value));
    this.httpClient
    .post('https://qbrainx.com/qbrainx-web/v1/Client/create', body, {
      responseType: 'text' as 'json'
    })
    .subscribe((data) => {
      window.location.reload();
      this.ClientFeedbackForm.reset();
      if (this.ClientImageInput && this.ClientImageInput.nativeElement) {
        this.ClientImageInput.nativeElement.value = '';
      }
      if (this.ClientlogoImageInput && this.ClientlogoImageInput.nativeElement) {
        this.ClientlogoImageInput.nativeElement.value = '';
      }
    });
}

clientFeedbackUpdate()
{
  
  let formData = new FormData();
  
  formData.append("clientLog", this.ClientlogoImage);
  formData.append("clientImage", this.ClientImage);
   let plainText = this.ClientFeedbackUpdate.value.feedback;
   this.ClientFeedbackUpdate.value.feedback=plainText;
   formData.append('clientRequest', JSON.stringify(this.ClientFeedbackUpdate.value));;
    
  
  this.httpClient
  .put('https://qbrainx.com/qbrainx-web/v1/Client/updateDetailsById/'+ this.ClientFeedbackUpdate.value.clientId +'', formData).subscribe(
    (response) => {
      this.ClientFeedbackUpdate.reset();
        // Clear the value of the file input element
    if (this.ClientImageInput && this.ClientImageInput.nativeElement) {
      this.ClientImageInput.nativeElement.value = '';
    }
    if (this.ClientlogoImageInput && this.ClientlogoImageInput.nativeElement) {
      this.ClientlogoImageInput.nativeElement.value = '';
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
   .delete('https://qbrainx.com/qbrainx-web/v1/Client/deleteById/'+this.ClientFeedbackDelete.value.clientId, {
     responseType: 'text'
   })
   .subscribe((data) => {
     window.location.reload();
   });
 }


}


