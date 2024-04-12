import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Component, ViewChild, ElementRef,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.scss']
})
export class WhoWeAreComponent implements OnInit {

  
  @ViewChild('whoWeAreImageInput') whoWeAreImageInput!: ElementRef;
  whoWeAreImage!: File | null;

   WhoWeAreForm= new UntypedFormGroup({
    description:new UntypedFormControl(''),
    link:new UntypedFormControl(''),
  });

  whoweareObj: any;
  wwrData: any;
  
 WhoWeAreFormUpdate = new UntypedFormGroup({  
  description:new UntypedFormControl(''),
    link:new UntypedFormControl(''),
  id: new UntypedFormControl(''),
  });
  WhoWeAreFormDelete = new UntypedFormGroup({
    Whoweare: new UntypedFormControl('')
  });
  formEdit: any = false;
  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
  }

  clearForm() {
    this.WhoWeAreForm.reset();
    this.WhoWeAreFormUpdate.reset();
    this.whoWeAreImage = null; // Reset the banner image to null

    // Clear the value of the file input element
    if (this.whoWeAreImageInput && this.whoWeAreImageInput.nativeElement) {
      this.whoWeAreImageInput.nativeElement.value = '';
    }
  }

  imageValidate(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ){
      this.whoWeAreImage=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  whoSubmit()
  {
    
 
    const formData = new FormData();
    formData.append('file', this.whoWeAreImage);
     formData.append('feedBackRequest ', JSON.stringify(this.WhoWeAreForm.value));
      
    
    this.httpClient
    .post('https://qbrainx.com/qbrainx-web/v1/whoWeAre/create', formData).subscribe(
      (response) => {
        this.WhoWeAreForm.reset();
   // Clear the value of the file input element
   if (this.whoWeAreImageInput && this.whoWeAreImageInput.nativeElement) {
    this.whoWeAreImageInput.nativeElement.value = '';
  }
      },
      (error) => {
        // Handle error response
        console.error(error);
      }
    );
  }
  getAll(){
    this.httpClient
    .get<any>('https://qbrainx.com/qbrainx-web/v1/whoWeAre/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      this.wwrData = data;
      
    });
  }
  onChange(event:any) { 
    this.httpClient
    .get<any>('https://qbrainx.com/qbrainx-web/v1/whoWeAre/getById/'+event.target.value,  {
      responseType: 'json'
    })
    .subscribe(data => {
        this.formEdit = true;
        this.whoweareObj = data;
        
    });
  }
  whoweareUpdate()
  {
    
    const formData = new FormData();
  
  

   
   formData.append('file', this.whoWeAreImage);
    formData.append('feedBackRequest ', JSON.stringify(this.WhoWeAreFormUpdate.value));
     
      
    
    this.httpClient
    .put('https://qbrainx.com/qbrainx-web/v1/whoWeAre/updateDetailsById/'+this.WhoWeAreFormUpdate.value.id+'',formData).subscribe(
      (response) => {
        // Handle successful response
       
        // Handle successful response
        this.WhoWeAreFormUpdate.reset();
     
        // Clear the value of the file input element
        if (this.whoWeAreImageInput && this.whoWeAreImageInput.nativeElement) {
          this.whoWeAreImageInput.nativeElement.value = '';
        }
      },
      (error) => {
        // Handle error response
        console.error(error);
      }
    );
  }
  delete(){
    this.httpClient
     .delete('https://qbrainx.com/qbrainx-web/v1/whoWeAre/deleteById/'+this.WhoWeAreFormDelete.value.Whoweare, {
       responseType: 'text' as 'json'
     })
     .subscribe((data) => {
       window.location.reload();
     });
   }
  
}
