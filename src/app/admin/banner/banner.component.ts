import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  bannerObj: any;
  formEdit = false;
  BannerData: any;

  @ViewChild('bannerImageInput') bannerImageInput!: ElementRef;
  bannerImage!: File | null;

  BannerForm = new FormGroup({
    bannerTitle: new FormControl(''),
    bannerSubTitle: new FormControl(''),
    bannerCallOfAction: new FormControl(''),
    link: new FormControl('')
  });
  BannerUpdate = new FormGroup({
    bannerTitle: new FormControl(''),
    bannerSubTitle: new FormControl(''),
    bannerCallOfAction: new FormControl(''),
    link: new FormControl(''),
    id: new FormControl(''),
  });
  BannerDelete = new FormGroup({
    id: new FormControl('')
  });


  constructor(private httpClient: HttpClient) { }

  bannerSubmit() {
    const formData = new FormData();
    formData.append('file', this.bannerImage);
    formData.append('bannerRequest', JSON.stringify(this.BannerForm.value));

    this.httpClient.post<any>('https://qbrainx.com/qbrainx-web/v1/banner/createBanner', formData)
      .subscribe(
        (response) => {
          
          this.BannerForm.reset();
          if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
            this.bannerImageInput.nativeElement.value = '';
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
  bannerUpdate() {
    const formData = new FormData();
    formData.append('file', this.bannerImage);
    formData.append('bannerRequest', JSON.stringify(this.BannerUpdate.value));
    this.httpClient.put('https://qbrainx.com/qbrainx-web/v1/banner/updateBannerDetailsById/' + this.BannerUpdate.value.id + '', formData).subscribe(
      (response) => {
        this.BannerUpdate.reset();
        if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
          this.bannerImageInput.nativeElement.value = '';
        }
      },
      (error) => {
        console.error(error);
      });
    this.BannerUpdate.reset();
  }
  bannerDelete() {
    this.httpClient.delete('https://qbrainx.com/qbrainx-web/v1/banner/deleteBannerById/' + this.BannerDelete.value.id, {
      responseType: 'text'
    })
      .subscribe((data) => {
        window.location.reload();
      });
  }

  allBannerList() {
    this.httpClient.get<any[]>('https://qbrainx.com/qbrainx-web/v1/banner/getAllBanners', {
      responseType: 'json'
    })
    .subscribe(data => {
      this.BannerData = data;
    });
  }

  onChange(event: any) {
    this.httpClient.get<any>('https://qbrainx.com/qbrainx-web/v1/banner/getBannerById/' + event.target.value, {
      responseType: 'json'
    }).subscribe(data => {
      this.bannerObj = data;
      this.formEdit = true;
    });
  }

  banImage(event: any) {
    if (
      event.target.files[0].type == 'image/png' ||
      event.target.files[0].type == 'image/gif' ||
      event.target.files[0].type == 'image/jpeg' ||
      event.target.files[0].type == 'image/jpg'
    ) {
      this.bannerImage = event.target.files[0];
    }
    else {
      alert("Select Only Image")
    }
  }

  clearForm() {
    this.BannerForm.reset();
    if (this.bannerImageInput && this.bannerImageInput.nativeElement) {
      this.bannerImageInput.nativeElement.value = '';
    }
  }
}