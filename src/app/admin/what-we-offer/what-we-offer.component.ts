import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-what-we-offer',
  templateUrl: './what-we-offer.component.html',
  styleUrls: ['./what-we-offer.component.scss']
})
export class WhatWeOfferComponent {
  weofferData: any;
  formEdit: boolean = false;
  weoffObj: any;

  @ViewChild('whatWeOfferImageInput') whatWeOfferImageInput!: ElementRef;
  whatWeOfferImage!: File | null;

  WhatWeAreForm = new UntypedFormGroup({
    title: new UntypedFormControl(''),
    link: new UntypedFormControl(''),
    description: new UntypedFormControl(''),

  });
  WeofferUpdate = new UntypedFormGroup({
    title: new UntypedFormControl(''),
    link: new UntypedFormControl(''),
    description: new UntypedFormControl(''),
    id: new UntypedFormControl('')

  });
  WeOfferDelete = new UntypedFormGroup({
    id: new UntypedFormControl('')

  });

  constructor(private httpClient: HttpClient) { }

  weOffersubmit() {

    let formData = new FormData();

    formData.append('file', this.whatWeOfferImage);
    formData.append('newsRequest  ', JSON.stringify(this.WhatWeAreForm.value));

    this.httpClient
      .post('https://qbrainx.com/qbrainx-web/v1/weOffers/create', formData).subscribe(
        (response) => {
          this.WhatWeAreForm.reset();

          // Clear the value of the file input element
          if (this.whatWeOfferImageInput && this.whatWeOfferImageInput.nativeElement) {
            this.whatWeOfferImageInput.nativeElement.value = '';
          }
        },
        (error) => {
          // Handle error response
          console.error(error);
        }
      );
  }
  weOfferUpdate() {
    let formData = new FormData();
    formData.append('file', this.whatWeOfferImage);
    formData.append('newsRequest  ', JSON.stringify(this.WeofferUpdate.value));

    this.httpClient.put('https://qbrainx.com/qbrainx-web/v1/weOffers/updateDetailsById/' + this.WeofferUpdate.value.id + '', formData).subscribe(
      (response) => {
        this.WeofferUpdate.reset();
        // Clear the value of the file input element
        if (this.whatWeOfferImageInput && this.whatWeOfferImageInput.nativeElement) {
          this.whatWeOfferImageInput.nativeElement.value = '';
        }
      },
      (error) => {
        // Handle error response
        console.error(error);
      }
    );
  }
  weOfferDelete() {
    this.httpClient
      .delete('https://qbrainx.com/qbrainx-web/v1/weOffers/deleteById/' + this.WeOfferDelete.value.id, {
        responseType: 'text'
      })
      .subscribe((data) => {
        window.location.reload();
      });
  }

  weOffergetAll() {
    this.httpClient
      .get<any>('https://qbrainx.com/qbrainx-web/v1/weOffers/getAll', {
        responseType: 'json'
      })
      .subscribe(data => {
        this.weofferData = data;

      });
  }

  imageValidate(event: any) {

    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg' ||
      event.target.files[0].type == 'image/webp'
    ) {
      this.whatWeOfferImage = event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  onChange(event: any) {
    this.httpClient
      .get<any>('https://qbrainx.com/qbrainx-web/v1/weOffers/getById/' + event.target.value, {
        responseType: 'json'
      })
      .subscribe(data => {
        this.formEdit = true;
        this.weoffObj = data;

      });
  }

  clearForm() {
    this.WhatWeAreForm.reset();
    this.WeofferUpdate.reset();
    this.whatWeOfferImage = null; // Reset the banner image to null

    // Clear the value of the file input element
    if (this.whatWeOfferImageInput && this.whatWeOfferImageInput.nativeElement) {
      this.whatWeOfferImageInput.nativeElement.value = '';
    }
  }
}