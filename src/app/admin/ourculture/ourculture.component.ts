import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OurCultureService } from 'src/app/api/qbrainx-api/services/PageServices/ourculture-service.service';
@Component({
  selector: 'app-ourculture',
  templateUrl: './ourculture.component.html',
  styleUrls: ['./ourculture.component.scss']
})
export class OurcultureComponent {

  OurcultureObj: any;
  formEdit = false;
  OurcultureData: any;
  @ViewChild('bannerImageInput') bannerImageInput!: ElementRef;
  ourcultureImage!: File | null;


  OurcultureForm = new FormGroup({
    name: new FormControl(''),
    jobTitle: new FormControl(''),
    text: new FormControl(''),   
  });
  OurcultureUpdate = new FormGroup({
    name: new FormControl(''),
    jobTitle: new FormControl(''),
    text: new FormControl(''),   
    id: new FormControl(''),
  });
  OurcultureDelete = new FormGroup({
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

  constructor(private OurcultureService: OurCultureService) { }

  
  ourCultureSubmit() {

    let formData = new FormData();
    formData.append('file', this.ourcultureImage);
    let plainText = this.OurcultureForm.value.text.replace(/<[^>]*>/g, '');
    this.OurcultureForm.value.text = plainText;
    formData.append('ourCultureRequest', JSON.stringify(this.OurcultureForm.value));
 
    this.OurcultureService.createOurCulture(formData).subscribe((res: any) => {
      if (res) {
        this.OurcultureForm.reset();
        // Clear the value of the file input element
        if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
          this.bannerImageInput.nativeElement.value = '';
        }
      }
    });

  }


  
  ourCultureUpdate()
  {
    
   let formData = new FormData();
   formData.append('file', this.ourcultureImage);
  
   let plainText = this.OurcultureUpdate.value.text.replace(/<[^>]*>/g, '');
   this.OurcultureUpdate.value.text=plainText;
      formData.append('ourCultureRequest', JSON.stringify(this.OurcultureUpdate.value));
      
      this.OurcultureService.updateOurCultureDetails(this.OurcultureUpdate.value.id,formData).subscribe((res: any) => {
        if (res) {
          this.OurcultureUpdate.reset();
          // Clear the value of the file input element
          if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
            this.bannerImageInput.nativeElement.value = '';
          }
        }
        else{
          this.OurcultureUpdate.reset();
        }
      });    

  }
  OurCultureDelete(){

    this.OurcultureService.deleteOurCultureDetails(this.OurcultureDelete.value.id).subscribe((res: any) => {
      if (res) {
        window.location.reload();
      }
      else{
        this.OurcultureUpdate.reset();
      }
    });    

  }

  getAllOurCulture(){
    this.OurcultureService.getOurCultureDetails().subscribe((res: any) => {
      if (res) {
        this.OurcultureData=res;       
        if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
          this.bannerImageInput.nativeElement.value = '';
        }
      }
      else{
        console.error("error",res);
      }
    });
  }
  onChange(event:any) { 

    this.OurcultureService.getOurCultureDetailsById(event.target.value).subscribe((res: any) => {
      if (res) {
        this.OurcultureObj=res;       
        this.formEdit = true;
      }
      else{
        console.error("error",res);
      }
    });  
  }
  
  ourcultureImages(event:any)
  {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ){
      this.ourcultureImage=event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  clearForm() {
    this.OurcultureForm.reset();
    this.OurcultureUpdate.reset();

    // Clear the value of the file input element
    if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
      this.bannerImageInput.nativeElement.value = '';
    }
  }


}

