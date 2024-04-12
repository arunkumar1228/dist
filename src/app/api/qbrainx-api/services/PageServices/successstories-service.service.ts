import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { SuccessStoryDetails } from '../../models/Sucess-Story';

@Injectable({
  providedIn: 'root'
})
export class SuccessStoriesService {
 url="https://qbrainx.com/qbrainx-web/v1/Stories/";

 personalurl=`https://qbrainx.com/qbrainx-web/v1/PersonalDetails/create`;

 subject= new BehaviorSubject<any>({});
//  private product$ = new BehaviorSubject<any>({});
 

  constructor(private httpClient:HttpClient) { }

 getSuccessStoriesDetailsById(id: any) {
    return this.httpClient.get(`${this.url}getById/${id}`)
  }
  getSuccessStoriesDetails() {
    return this.httpClient.get(`${this.url}getAll`)
  }

  setSuccessStoriesObject(obj) { 
    if(this.subject){

     this.subject.next(obj); 

    }
    else{
      this.subject.next(obj); 

    }
    this.subject.next(obj); 
  }
  
  selectedBlog= this.subject.asObservable();

  uploadImage(SuccessStoryDetails:any) {
    
    return this.httpClient.post(this.personalurl, SuccessStoryDetails);
  }

  downloadPdf(id: number): Observable<Blob> {

    return this.httpClient.get(`${this.url}download/${id}`, { responseType: 'blob' });

  }
  getBlogByFormattedTitle(bysubTitle: string): Observable<any> {
    return this.httpClient.get(`${this.url}${bysubTitle}`);
  }
  
}
