import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OurCultureService {
 url="https://qbrainx.com/qbrainx-web/v1/OurCulture/";

 subject= new BehaviorSubject<any>({});
//  private product$ = new BehaviorSubject<any>({});
 

  constructor(private httpClient:HttpClient) { }

 getOurCultureDetailsById(id: any) {
    return this.httpClient.get(`${this.url}getById/${id}`)
  }
  getOurCultureDetails() {
    return this.httpClient.get(`${this.url}getAll`)
  }
  createOurCulture(data) {
    return this.httpClient.post(`${this.url}create`,data)
  }
  updateOurCultureDetails(id,data) {
    return this.httpClient.put(`${this.url}updateDetailsById/${id}`,data)
  }
  deleteOurCultureDetails(id) {
    return this.httpClient.delete(`${this.url}deleteById/${id}`)
  }
  

  setOurCultureObject(obj) { 
    if(this.subject){

     this.subject.next(obj); 

    }
    else{
      this.subject.next(obj); 

    }
    this.subject.next(obj); 
  }
  
  selectedOurCulture= this.subject.asObservable();
  
}
