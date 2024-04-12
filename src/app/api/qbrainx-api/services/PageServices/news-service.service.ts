import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { LetsTalk } from '../../models/talk.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
 url="https://qbrainx.com/qbrainx-web/v1/Qnews/";
 private apiUrl = 'https://qbrainx.com/qbrainx-web/v1/LetsTalk/create'

 subject= new BehaviorSubject<any>({});
//  private product$ = new BehaviorSubject<any>({});
 

  constructor(private httpClient:HttpClient) { }

 getNewsDetailsById(id: any) {
    return this.httpClient.get(`${this.url}getById/${id}`)
  }
  getNewsDetails() {
    return this.httpClient.get(`${this.url}getAll`)
  }

  setNewsObject(obj) { 
    if(this.subject){

     this.subject.next(obj); 

    }
    else{
      this.subject.next(obj); 

    }
    this.subject.next(obj); 
  }
  
  selectedBlog= this.subject.asObservable();

  getBlogByFormattedTitle(getByTitle: string): Observable<any> {
    return this.httpClient.get(`${this.url}${getByTitle}`);
  }

  submitForm(letsTalk: LetsTalk): Observable<LetsTalk> {
    return this.httpClient.post<LetsTalk>(this.apiUrl, letsTalk);
  }

}
