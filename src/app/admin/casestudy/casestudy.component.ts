import { Component, OnInit } from '@angular/core';
import { AdminPanalService } from '../admin-panal.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-casestudy',
  templateUrl: './casestudy.component.html',
  styleUrls: ['./casestudy.component.scss']
})
export class CasestudyComponent implements OnInit {

  
  careerDetailObj: any;
  serviceObj:any;
  categoryObj:any;
  formEdit = false;
  uniqueServiccategory: string[] = [];
  categoryEdit=false;
  caseStudyArray=[]
  NewsData: any;
  selectedFile: File | null = null;

  CasestudyForm= new FormGroup({
    title: new FormControl(''),
    category:new FormControl(''),
    subcategory:new FormControl(''),
    text:new FormControl('')
  });
  casestudyImage!:File;
  CasestudyUpdate = new FormGroup({
    title: new FormControl(''),
    category:new FormControl(''),
    subcategory:new FormControl(''),
    text:new FormControl(''),
    id: new FormControl(''),
  });
  CasestudyDelete = new FormGroup({
    id: new FormControl('')

  });
  quillConfig={
    //toolbar: '.toolbar',
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
        //['link', 'image', 'video']  
      ],
      
    },
  }
  constructor(private adminPanalService:AdminPanalService,private router:Router,private httpClient : HttpClient) { }
  ngOnInit(): void {
  this.getMethod();
  this.findUniqueCategory();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  getMethod(){
    this.getAll();
    this.findUniqueCategory();
  }

  getAll(){
    this.httpClient
    .get<any>('https://qbrainx.com/qbrainx-web/v1/Studies/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      this.NewsData = data;
    });
}
findUniqueCategory() {

  const serviceNameSet = new Set<string>();
  this.NewsData.forEach(blog => {
    serviceNameSet.add(blog.category);
  });

  this.uniqueServiccategory = Array.from(serviceNameSet);
}
  onChange(event:any) { 
    this.httpClient
    .get<any>('https://qbrainx.com/qbrainx-web/v1/Studies/byCategory?category='+event.target.value,  {
      responseType: 'json'
    })
    .subscribe(data => {
        this.careerDetailObj = data;
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
      this.casestudyImage=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }
  casestudySubmit()
  {
    
    let formData = new FormData();
  
    formData.append('file', this.casestudyImage);
    formData.append('brochure', this.selectedFile);
      
   let plainText = this.CasestudyForm.value.text;
   this.CasestudyForm.value.text=plainText;
      formData.append('studiesRequest   ', JSON.stringify(this.CasestudyForm.value));
       
   
    this.httpClient
    .post('https://qbrainx.com/qbrainx-web/v1/Studies/create', formData, {
      responseType: 'text' as 'json'
    })
    .subscribe((data) => {
    this.CasestudyForm.reset();
    });

  }

  casestudyUpdate()
  {
    
   let formData = new FormData();
  
 
   formData.append('file', this.casestudyImage);
      
   formData.append('brochure', this.selectedFile);
   let plainText = this.CasestudyUpdate.value.text;
   this.CasestudyUpdate.value.text=plainText;
      formData.append('studiesRequest', JSON.stringify(this.CasestudyUpdate.value));
      
    this.httpClient
    .put('https://qbrainx.com/qbrainx-web/v1/Studies/updateDetailsById/'+ this.CasestudyUpdate.value.id +'', formData, {
      responseType: 'text'
    })
    .subscribe((data) => {
      window.location.reload();
    });

  }
  casestudyDelete(){
   this.httpClient
    .delete('https://qbrainx.com/qbrainx-web/v1/Studies/deleteById/'+this.CasestudyDelete.value.id, {
      responseType: 'text'
    })
    .subscribe((data) => {
      window.location.reload();
    });
  }


  clearForm() {
    this.CasestudyForm.reset();
    // Clear the value of the file input element
    if (this.casestudyImage) {
      this.casestudyImage= null;
    }
  }

  getServiceId(event: any) {
    this.httpClient
      .get<any>('https://qbrainx.com/qbrainx-web/v1/Studies/getById/' + event.target.value, {
        responseType: 'json'
      })
      .subscribe(data => {
       
        
      this.serviceObj = data;
      this.categoryEdit = true;
    });
  }
  
}
