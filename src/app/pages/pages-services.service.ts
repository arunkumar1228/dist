import { Injectable } from '@angular/core';
import { BannerControllerService } from '../api/qbrainx-api/services';

@Injectable({
  providedIn: 'root'
})
export class PagesServicesService {

  constructor(private readonly bannerControllerService:BannerControllerService) { }
  
  allBannerList()
  {
    return this.bannerControllerService.allBannerList();
  }
}
