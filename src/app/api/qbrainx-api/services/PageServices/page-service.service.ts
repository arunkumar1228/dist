import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageServiceService {
 url="https://qbrainx.com/qbrainx-web/";

  constructor(private httpClient:HttpClient) { }

 getWebinarDetailsById(id: any) {
    return this.httpClient.get(`${this.url}v1/webinar/getById/${id}`)
  }
  getWebinarDetails() {
    return this.httpClient.get(`${this.url}v1/webinar/getAll`)
  }

}
