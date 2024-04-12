import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  url="https://qbrainx.com/qbrainx-web/";

  constructor(private httpClient:HttpClient) { }

  createWebinar(data:any) {
    return this.httpClient.post(`${this.url}v1/webinar/create`,data,{
      responseType: 'text' as 'json'

    });
  }
  getWebinarDetailsById(id: any) {
    return this.httpClient.get(`${this.url}v1/webinar/getById?id=${id}` , {
      responseType: 'text' as 'json' })
  }
  getWebinarDetails() {
    return this.httpClient.get(`${this.url}v1/webinar/getAll`)
  }

  deleteWebinarDetails(id:any) {

    return this.httpClient.delete(`${this.url}v1/webinar/deleteById?id=${id}`, {
      responseType: 'text' as 'json'

    })
  }

  updateWebinarDetails(id:any,data:any) {

    return this.httpClient.put(`${this.url}v1/webinar/updateDetailsById?id=${id}`,data, {
      responseType: 'text' as 'json'

    })
  }

}
