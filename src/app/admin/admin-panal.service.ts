import { Injectable } from '@angular/core';
import { BannerDto } from '../api/qbrainx-api/models';
import { BannerControllerService } from '../api/qbrainx-api/services';

@Injectable({
  providedIn: 'root'
})
export class AdminPanalService {

  constructor(private readonly bannerControllerService:BannerControllerService) { }
  
  createBanner( data:string,  BannerDto:Blob )
  {
   return this.bannerControllerService.createBanner$FormData({body:{banner:data,file:BannerDto}} )
  }
}
