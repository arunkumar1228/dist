
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-all-service',
  templateUrl: './all-service.component.html',
  styleUrls: ['./all-service.component.scss']
})
export class AllServiceComponent {

  @ViewChild('fileImageInput') fileImageInput!: ElementRef;
  file!: File | null;

  @ViewChild('bannerImageInput') bannerImageInput!: ElementRef;
  bannerFile!: File | null;

  AllServiceForm= new FormGroup({
    serviceName: new FormControl(''),
    buttonName:new FormControl(''),
    link: new FormControl(''),
    title:new FormControl(''),
    category:new FormControl(''),
    text:new FormControl('')
  });

  AllServiceUpdate= new FormGroup({
    serviceName: new FormControl(''),
    buttonName:new FormControl(''),
    link: new FormControl(''),
    title:new FormControl(''),
    category:new FormControl(''),
    text:new FormControl(''),
    serviceId: new FormControl('')
  });

  // ServiceDetails: any;
  blogArray = [];
  uniqueServiceNames: string[] = [];
  uniqueServiccategory: string[] = [];
  sortedcategory;

  AllServiceDelete = new FormGroup({
    serviceId: new FormControl('')   

  });
  clientObj: any;
  serviceObj: any;
  categoryObj:any;
  formEdit = false;
  ServiceEdit = false;
  categoryEdit=false;

  quillConfig={
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean'],                                       
        ['link']
      ],

    },
  }

  constructor(private router:Router,private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.allAllServiceList();
    this.getAllMethod();
   
  }
  
  onChange(event: any) {

    this.httpClient
      .get<any>('https://qbrainx.com/qbrainx-web/v1/Common-Service/byServiceName?serviceName=' + event.target.value, {
        responseType: 'json'
      })
      .subscribe(data => {       
       this.ServiceEdit = true;
       this.clientObj=data;
        this.sortedcategory = this.removeDuplicates(this.clientObj, "category")
    });
  }

  removeDuplicates(myArray, Prop) {
    return myArray.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[Prop]).indexOf(obj[Prop]) === pos;
    });
  }

  onCategory(event: any) {
    this.httpClient
      .get<any>('https://qbrainx.com/qbrainx-web/v1/Common-Service/bySubCategory?subCategory=' + event.target.value, {
        responseType: 'json'
      })
      .subscribe(data => {
       
        
      this.categoryObj = data;
        this.categoryEdit = true;
    });
  }

  getAllMethod(){
    this.findUniqueCharacters();
    this.findUniqueCategory();
  }


  getServiceId(event: any) {
    this.httpClient
      .get<any>('https://qbrainx.com/qbrainx-web/v1/Common-Service/getById/' + event.target.value, {
        responseType: 'json'
      })
      .subscribe(data => {
       
        
      this.serviceObj = data;
      this.formEdit = true;
    });
  }


  

  clearForm() {
    this.AllServiceForm.reset();
    if (this.fileImageInput && this.fileImageInput.nativeElement) {
      this.fileImageInput.nativeElement.value = '';
    }
    if(this.bannerImageInput && this.bannerImageInput.nativeElement){
      this.bannerImageInput.nativeElement.value = '';
    }
  }

  IconImage(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg' ||
      event.target.files[0].type == 'image/svg+xml')
    {
      this.file=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  IconBannerImage(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg' ||
      event.target.files[0].type == 'image/svg+xml')
    {
      this.bannerFile=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }


  allAllServiceList(){
    this.httpClient
    .get<any>('https://qbrainx.com/qbrainx-web/v1/Common-Service/getAll',  {
      responseType: 'json'
    })
    .subscribe(data => {
      this.blogArray = data;
    
    });
  }

  findUniqueCharacters() {
    const serviceNameSet = new Set<string>();
    this.blogArray.forEach(blog => {
      serviceNameSet.add(blog.serviceName);
    });
    this.uniqueServiceNames  = Array.from(serviceNameSet);
  }

  findUniqueCategory() {
    const serviceNameSet = new Set<string>();
    this.blogArray.forEach(blog => {
      serviceNameSet.add(blog.category);
    });
    this.uniqueServiccategory  = Array.from(serviceNameSet);
  }
  allServiceSubmit()
  {
   let body = new FormData();
  
   body.append("file", this.file);
   body.append("bannerFile", this.bannerFile);
   let plainText = this.AllServiceForm.value.text.replace(/<[^>]*>/g, '');
   this.AllServiceForm.value.text=plainText;
   body.append('commonServiceRequest', JSON.stringify(this.AllServiceForm.value));
    this.httpClient
    .post('https://qbrainx.com/qbrainx-web/v1/Common-Service/create', body, {
      responseType: 'text' as 'json'
    })
    .subscribe((data) => {
      this.AllServiceForm.reset();
    if (this.fileImageInput && this.fileImageInput.nativeElement) {
      this.fileImageInput.nativeElement.value = '';
    }
    if(this.bannerImageInput && this.bannerImageInput.nativeElement){
      this.bannerImageInput.nativeElement.value = '';
    }


    });
}

allServiceUpdate(){
  let body = new FormData();
   body.append("file", this.file);
   body.append("bannerFile", this.bannerFile);

   let plainText = this.AllServiceUpdate.value.text.replace(/<[^>]*>/g, '');
   this.AllServiceUpdate.value.text=plainText;
   body.append('commonServiceRequest', JSON.stringify(this.AllServiceUpdate.value));
    this.httpClient
  .put('https://qbrainx.com/qbrainx-web/v1/Common-Service/updateDetailsById/'+ this.AllServiceUpdate.value.serviceId +'', body).subscribe(
    (response) => {
      this.AllServiceUpdate.reset();
      this.file=null;
      this.bannerFile=null;
    },
    (error) => {
      console.error(error);
    }
  );

}

Delete(){
  this.httpClient
   .delete('https://qbrainx.com/qbrainx-web/v1/Common-Service/deleteById/'+this.AllServiceDelete.value.serviceId, {
     responseType: 'text'
   })
   .subscribe((data) => {
     window.location.reload();
   });
 }


}
