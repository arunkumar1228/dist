import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ResourceService } from 'src/app/api/qbrainx-api/services/PageServices/resource-service.service';
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {

  ResourceObj: any;
  formEdit = false;
  ResourceData: any;
  @ViewChild('bannerImageInput') bannerImageInput!: ElementRef;
  resourceImage!: File | null;


  ResourceForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
    link: new FormControl(''),
    buttonName: new FormControl(''),
  });
  ResourceUpdate = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
    link: new FormControl(''),
    buttonName: new FormControl(''),
    id: new FormControl(''),
  });
  ResourceDelete = new FormGroup({
    id: new FormControl('')
  });
  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
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

  constructor(private resourceService: ResourceService) { }

  
  resourceSubmit() {

    let formData = new FormData();
    formData.append('file', this.resourceImage);
    let plainText = this.ResourceForm.value.text.replace(/<[^>]*>/g, '');
    this.ResourceForm.value.text = plainText;
    formData.append('resourcesDetails', JSON.stringify(this.ResourceForm.value));
 
    this.resourceService.createResource(formData).subscribe((res: any) => {
      if (res) {
        this.ResourceForm.reset();
        // Clear the value of the file input element
        if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
          this.bannerImageInput.nativeElement.value = '';
        }
      }
    });

  }


  
  resourceUpdate()
  {
    
   let formData = new FormData();
   formData.append('file', this.resourceImage);
  
   let plainText = this.ResourceUpdate.value.text.replace(/<[^>]*>/g, '');;
   this.ResourceUpdate.value.text=plainText;
      formData.append('resourcesDetails', JSON.stringify(this.ResourceUpdate.value));
      
      this.resourceService.updateResourceDetails(this.ResourceUpdate.value.id,formData).subscribe((res: any) => {
        if (res) {
          this.ResourceUpdate.reset();
          // Clear the value of the file input element
          if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
            this.bannerImageInput.nativeElement.value = '';
          }
        }
        else{
          this.ResourceUpdate.reset();
        }
      });    

  }
  resourceDelete(){

    this.resourceService.deleteResourceDetails(this.ResourceDelete.value.id).subscribe((res: any) => {
      if (res) {
        window.location.reload();
      }
      else{
        this.ResourceUpdate.reset();
      }
    });    

  }

  getAllResource(){
    this.resourceService.getResourceDetails().subscribe((res: any) => {
      if (res) {
        this.ResourceData=res;       
      }
      else{
        console.error("error",res);
      }
    });
  }
  onChange(event:any) { 

    this.resourceService.getResourceDetailsById(event.target.value).subscribe((res: any) => {
      if (res) {
        this.ResourceObj=res;       
        this.formEdit = true;
      }
      else{
        console.error("error",res);
      }
    });  
  }
  
  resourceImages(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ){
      this.resourceImage=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  clearForm() {
    this.ResourceForm.reset();
    this.ResourceUpdate.reset();

    // Clear the value of the file input element
    if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
      this.bannerImageInput.nativeElement.value = '';
    }
  }


}
