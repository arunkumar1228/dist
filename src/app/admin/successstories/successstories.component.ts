import { AdminPanalService } from '../admin-panal.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-successstories',
  templateUrl: './successstories.component.html',
  styleUrls: ['./successstories.component.scss']
})
export class SuccessstoriesComponent {
  @ViewChild('StoryImageInput') StoryImageInput!: ElementRef;
  StoryImage!: File | null;

  @ViewChild('StoryDocumentInput') StoryDocumentInput!: ElementRef;
  StoryDocument!: File | null;

  StoryForm= new FormGroup({
    title: new FormControl(''),
    subTitle:new FormControl(''),
    text:new FormControl(''),
    
  });
  
  StoryUpdate= new FormGroup({
    title: new FormControl(''),
    subTitle:new FormControl(''),
    text:new FormControl(''),
    id:new FormControl('')
  });

  StoryDelete= new FormGroup({
    id:new FormControl('')
  });
   StoryDetails:any;


  StoryObj: any;
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
  Storylist:any;
  formEdit = false;

      
  constructor(private adminPanalService: AdminPanalService, private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.getAllstoryDetails();
  }

  testImage(event: any) {
    
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ) {
      this.StoryImage = event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  testdocument(event: any) {
    
    if (
      event.target.files[0].type == 'application/doc' ||
      event.target.files[0].type == 'application/docx' ||
      event.target.files[0].type == 'application/pdf'
    ) {
      this.StoryDocument = event.target.files[0];
    }
    else {
      alert("Select Only Document")
    }
  }

  onChange(event: any) {
    this.httpClient
      .get<any>('https://qbrainx.com/qbrainx-web/v1/Stories/getById/' + event.target.value, {
        responseType: 'json'
      })
      .subscribe(data => {
        this.StoryObj = data;
        this.formEdit = true;
      });
  }


  storySubmit()
  {
    
    const formData = new FormData();
    let plainText = this.StoryForm.value.text;
    this.StoryForm.value.text=plainText;
   formData.append('file', this.StoryImage);
   formData.append('brochure', this.StoryDocument);
    formData.append('storiesRequest ', JSON.stringify(this.StoryForm.value));
this.httpClient.post<any>('https://qbrainx.com/qbrainx-web/v1/Stories/create', formData)
.subscribe(
  (response) => {
    
    this.StoryForm.reset();
    // Clear the value of the file input element
    if (this.StoryImageInput && this.StoryImageInput.nativeElement) {
      this.StoryImageInput.nativeElement.value = '';
    }
    if (this.StoryDocumentInput && this.StoryDocumentInput.nativeElement) {
      this.StoryDocumentInput.nativeElement.value = '';
    }
  },
  (error) => {
    // Handle error response
    console.error(error);
  }
);
}
       
  getAllstoryDetails() {
   
    this.httpClient
      .get('https://qbrainx.com/qbrainx-web/v1/Stories/getAll',  {
        responseType: 'json'
      })
      .subscribe(data => {
        this.StoryDetails = data;
        
      });
  }


  storyUpdate()
  {
    const formData = new FormData();
    formData.append('file', this.StoryImage);
   formData.append('brochure', this.StoryDocument);
    let plainText = this.StoryUpdate.value.text;
    this.StoryUpdate.value.text=plainText;    
     formData.append('storiesRequest', JSON.stringify(this.StoryUpdate.value));
        this.httpClient
    .put('https://qbrainx.com/qbrainx-web/v1/Stories/updateDetailsById/'+ this.StoryUpdate.value.id +'', formData).subscribe(
      (response) => {
        // Handle successful response
      
        this.StoryUpdate.reset();
        this.StoryImage = null;
        this.StoryDocument = null;
      },
      (error) => {
        // Handle error response
        console.error(error);
      }
    );

  }
  
 
    
  delete(){
    this.httpClient
     .delete('https://qbrainx.com/qbrainx-web/v1/Stories/deleteById/'+ this.StoryDelete.value.id ,{
      responseType: 'text'
    })
    .subscribe((data) => {
      window.location.reload();
    });

  }

  clearForm() {
    this.StoryForm.reset();


    // Clear the value of the file input element
   // Clear the value of the file input element
   if (this.StoryImageInput && this.StoryImageInput.nativeElement) {
    this.StoryImageInput.nativeElement.value = '';
  }
  if (this.StoryDocumentInput && this.StoryDocumentInput.nativeElement) {
    this.StoryDocumentInput.nativeElement.value = '';
  }
  }
}
