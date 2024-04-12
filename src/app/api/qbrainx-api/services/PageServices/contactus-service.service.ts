import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
 url="https://qbrainx.com/qbrainx-web/v1/Contact/";

  constructor(private httpClient:HttpClient) { }

 getContactUsDetailsById(id: any) {
    return this.httpClient.get(`${this.url}getById/${id}`)
  }
  getContactUsDetails() {
    return this.httpClient.get(`${this.url}getAll`)
  }
  createContactUs(data) {
    return this.httpClient.post(`${this.url}create`,data)
  }
  updateContactUsDetails(id,data) {
    return this.httpClient.put(`${this.url}updateDetailsById/${id}`,data)
  }
  deleteContactUsDetails(id) {
    return this.httpClient.delete(`${this.url}deleteById/${id}`)
  }

}
