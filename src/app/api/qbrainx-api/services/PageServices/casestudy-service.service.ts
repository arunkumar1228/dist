import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { PersonalDetailsDto } from '../../models/PersonalDetailsDto';

@Injectable({
  providedIn: 'root'
})
export class CaseStudyService {
 url="https://qbrainx.com/qbrainx-web/v1/Studies/";
 personalurl = `https://qbrainx.com/qbrainx-web/v1/PersonalDetails/create`;
 register= 'https://qbrainx.com/qbrainx-web/v1/WebinarRegister/create';


 subject= new BehaviorSubject<any>({});
//  private product$ = new BehaviorSubject<any>({});
 

  constructor(private httpClient:HttpClient) { }

 getCaseStudyDetailsById(id: any) {
    return this.httpClient.get(`${this.url}getById/${id}`)
  }
  getCaseStudyDetails() {
    return this.httpClient.get(`${this.url}getAll`)
  }

  getByCategoryCaseStudyDetails(categrory) {
    return this.httpClient.get(`${this.url}byCategory?category=${categrory}`)
  }

  getBySubCategoryCaseStudyDetails(categrory) {
    return this.httpClient.get(`${this.url}bySubCategory?Subcategory=${categrory}`)
  }

  setCaseStudyObject(obj) { 
    if(this.subject){

     this.subject.next(obj); 

    }
    else{
      this.subject.next(obj); 

    }
    this.subject.next(obj); 
  }
  
  selectedBlog= this.subject.asObservable();

  uploadImage(personalDetailsDto: any) {

    return this.httpClient.post(this.personalurl, personalDetailsDto);
    
  }

  Register(personalDetailsDto: any) {

    return this.httpClient.post(this.register, personalDetailsDto);
    
  }

  downloadPdf(id: number): Observable<Blob> {

    return this.httpClient.get(`${this.url}download/${id}`, { responseType: 'blob' });

  }

  getBlogByFormattedTitle(getByTitle: string): Observable<any> {
    return this.httpClient.get(`${this.url}${getByTitle}`);
  }
  

  
}
