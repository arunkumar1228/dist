import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
 url="https://qbrainx.com/qbrainx-web/v1/Resources/";

 subject= new BehaviorSubject<any>({});
//  private product$ = new BehaviorSubject<any>({});
 

  constructor(private httpClient:HttpClient) { }

 getResourceDetailsById(id: any) {
    return this.httpClient.get(`${this.url}getById/${id}`)
  }
  getResourceDetails() {
    return this.httpClient.get(`${this.url}getAll`)
  }
  createResource(data) {
    return this.httpClient.post(`${this.url}create`,data)
  }
  updateResourceDetails(id,data) {
    return this.httpClient.put(`${this.url}updateDetailsById/${id}`,data)
  }
  deleteResourceDetails(id) {
    return this.httpClient.delete(`${this.url}deleteById/${id}`)
  }
  

  setResourceObject(obj) { 
    if(this.subject){

     this.subject.next(obj); 

    }
    else{
      this.subject.next(obj); 

    }
    this.subject.next(obj); 
  }
  
  selectedResource= this.subject.asObservable();
  
}
