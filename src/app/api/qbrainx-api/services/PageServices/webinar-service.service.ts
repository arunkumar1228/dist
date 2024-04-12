import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebinarService {
 url="https://qbrainx.com/qbrainx-web/v1/webinar/";

 subject= new BehaviorSubject<any>({});
//  private product$ = new BehaviorSubject<any>({});
 

  constructor(private httpClient:HttpClient) { }

 getWebinarDetailsById(id: any) {
    return this.httpClient.get(`${this.url}getById/${id}`)
  }
  getWebinarDetails() {
    return this.httpClient.get(`${this.url}getAll`)
  }

  setWebinarObject(obj) { 
    if(this.subject){

     this.subject.next(obj); 

    }
    else{
      this.subject.next(obj); 

    }
    this.subject.next(obj); 
  }
  
  selectedBlog= this.subject.asObservable();
  
}
