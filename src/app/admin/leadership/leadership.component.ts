import { Component } from '@angular/core';
import { AdminPanalService } from '../admin-panal.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-leadership',
  templateUrl: './leadership.component.html',
  styleUrls: ['./leadership.component.scss']
})
export class LeadershipComponent {
  newsForm= new FormGroup({
    name: new FormControl(''),
    jobTitle:new FormControl(''),
    link:new FormControl(''),
    category:new FormControl(''),
    text:new FormControl('')
  });
  newsImage!:File;
  NewsData: any;
  NewsObj: any;
  newsUpdate = new FormGroup({
    name: new FormControl(''),
    jobTitle:new FormControl(''),
    link:new FormControl(''),
    category:new FormControl(''),
    text:new FormControl(''),
    id: new FormControl(''),
  });
  newsDelete = new FormGroup({
    id: new FormControl('')

  });
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
  constructor(private adminPanalService:AdminPanalService,private router:Router,private httpClient : HttpClient) { }
  ngOnInit(): void {
  }

  getAll(){
    this.httpClient
    .get<any>('https://qbrainx.com/qbrainx-web/v1/LeaderShip/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      this.NewsData = data;
    });
  }
  onChange(event:any) { 
    this.httpClient
    .get<any>('https://qbrainx.com/qbrainx-web/v1/LeaderShip/getById/'+event.target.value,  {
      responseType: 'json'
    })
    .subscribe(data => {
        this.NewsObj = data;
        this.formEdit = true;
    });
  }
  NewsImage(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ){
      this.newsImage=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }
  NewsSubmit()
  {
    
    let formData = new FormData();
  
    formData.append('file', this.newsImage);
      
   let plainText = this.newsForm.value.text;
   this.newsForm.value.text=plainText;
      formData.append('leaderShiprequest   ', JSON.stringify(this.newsForm.value));
       
   
    this.httpClient
    .post('https://qbrainx.com/qbrainx-web/v1/LeaderShip/create', formData, {
      responseType: 'text' as 'json'
    })
    .subscribe((data) => {
      // window.location.reload();
      this.newsForm.reset();
      this.newsImage=null;
    });

  }

  NewsUpdate()
  {
    
   let formData = new FormData();
  
 
   formData.append('file', this.newsImage);
   let plainText = this.newsUpdate.value.text;
   this.newsUpdate.value.text=plainText;
      formData.append('leaderShiprequest', JSON.stringify(this.newsUpdate.value));
      
    
    this.httpClient
    .put('https://qbrainx.com/qbrainx-web/v1/LeaderShip/updateDetailsById/'+ this.newsUpdate.value.id +'', formData, {
      responseType: 'text'
    })
    .subscribe((data) => {
      window.location.reload();
    });

  }
  NewsDelete(){
   this.httpClient
    .delete('https://qbrainx.com/qbrainx-web/v1/LeaderShip/deleteById/'+this.newsDelete.value.id, {
      responseType: 'text'
    })
    .subscribe((data) => {
      window.location.reload();
    });
  }


  clearForm() {
    this.newsForm.reset();
    // Clear the value of the file input element
    if (this.newsImage) {
      this.newsImage= null;
    }
  }


}
