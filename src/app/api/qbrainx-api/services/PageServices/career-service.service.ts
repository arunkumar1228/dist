import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CareerService {
 url="https://qbrainx.com/qbrainx-web/v1/Careers/";
 registerurl="https://qbrainx.com/qbrainx-web/v1/CareerRegister/";


 subject= new BehaviorSubject<any>({});
//  private product$ = new BehaviorSubject<any>({});
 

  constructor(private httpClient:HttpClient) { }

 getCareerDetailsById(id: any) {
    return this.httpClient.get(`${this.url}getById/${id}`)
  }
  getCareerDetails() {
    return this.httpClient.get(`${this.url}getAllCareer`)
  }

  getCareerSearchDetails(searchdata:any) {
    return this.httpClient.get(`${this.url}getByTitle?keyword=${searchdata}`)
  }

  saveCareerDetails(data) {
    return this.httpClient.post(`${this.registerurl}createCareerRegister`,data)
  }

  setCareerObject(obj) { 
    if(this.subject){

     this.subject.next(obj); 

    }
    else{
      this.subject.next(obj); 

    }
    this.subject.next(obj); 
  }
  
  selectedCareer= this.subject.asObservable();
  
  
}
