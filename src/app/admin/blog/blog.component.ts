import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

  BlogObj: any;
  formEdit = false;
  BlogData: any;
  categoryEdit=false;
  
  categoryObj:any;
  @ViewChild('bannerImageInput') bannerImageInput!: ElementRef;
  bannerImage!: File | null;

  BlogForm = new FormGroup({
    title: new FormControl(''),
    subTitle: new FormControl(''),
    text: new FormControl(''),
    tagTitle: new FormControl(''),
    tagDescription: new FormControl(''),
  });
  BlogUpdate = new FormGroup({
    title: new FormControl(''),
    subTitle: new FormControl(''),
    text: new FormControl(''),
    tagTitle: new FormControl(''),
    tagDescription: new FormControl(''),
    id: new FormControl(''),
  });
  BlogDelete = new FormGroup({
    id: new FormControl('')
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

  blogSubmit()
  {
    
    let formData = new FormData();
  
    formData.append('file', this.bannerImage);
   let plainText = this.BlogForm.value.text
   this.BlogForm.value.text=plainText;
      formData.append('blogRequest   ', JSON.stringify(this.BlogForm.value));
       
   
    this.httpClient
    .post('https://qbrainx.com/qbrainx-web/v1/Blogs/create',formData)
    .subscribe(
      (response) => {
        this.BlogForm.reset();
        if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
          this.bannerImageInput.nativeElement.value = '';
        }
      },
      (error) => {
        console.error(error);
      }
    );
}

  blogUpdate()
  {
    
   let formData = new FormData();
   formData.append('file', this.bannerImage);
  
   let plainText = this.BlogUpdate.value.text;
   this.BlogUpdate.value.text=plainText;
      formData.append('blogRequest', JSON.stringify(this.BlogUpdate.value));
      
    
    this.httpClient
    .put('https://qbrainx.com/qbrainx-web/v1/Blogs/updateDetailsById/'+ this.BlogUpdate.value.id +'', formData).subscribe(
      (response) => {
        this.BlogUpdate.reset();
        if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
          this.bannerImageInput.nativeElement.value = '';
        }
      },
      (error) => {
        console.error(error);
      });
    this.BlogUpdate.reset();
  }
  blogDelete(){
    
   this.httpClient
    .delete('https://qbrainx.com/qbrainx-web/v1/Blogs/deleteById/'+this.BlogDelete.value.id, {
      responseType: 'text'
    })
    .subscribe((data) => {
      window.location.reload();
    });
  }

  getAll(){
    this.httpClient
    .get<any>('https://qbrainx.com/qbrainx-web/v1/Blogs/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      this.BlogData = data;
    });
  }
  onChange(event:any) { 
this.httpClient
    .get<any>('https://qbrainx.com/qbrainx-web/v1/Blogs/getById/'+event.target.value,  {
      responseType: 'json'
    })
    .subscribe(data => {
        this.BlogObj = data;
        this.formEdit = true;
    });
  }


  banImage(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ){
      this.bannerImage=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  clearForm() {
    this.BlogForm.reset();
    if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
      this.bannerImageInput.nativeElement.value = '';
    }
  }

}
