import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogCommentDto } from '../../models/BlogCommentDto';
import { Observable } from 'rxjs';
import { CareersRegister } from '../../models/CareerRegister';
import { LetsTalk } from '../../models/LetsTalk';
import { PersonalDetails } from '../../models/PersonalDetails';
import { WebinarRegister } from '../../models/WebinarRegister';
import { EmailSubscription } from '../../models/EmailSubscription';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://qbrainx.com/qbrainx-web/v1/';

  constructor(private http: HttpClient) {}

  getAllDates(): Observable<BlogCommentDto[]> {
    return this.http.get<BlogCommentDto[]>(`${this.apiUrl}BlogComment/getAllBlogComments`);
  }
  getAllCareers(): Observable<CareersRegister[]> {
    return this.http.get<CareersRegister[]>(`${this.apiUrl}CareerRegister/getAllCareerRegister`);
  }
  getAllLetsTalk(): Observable<LetsTalk[]> {
    return this.http.get<LetsTalk[]>(`${this.apiUrl}LetsTalk/getAll`);
  }
  getAllPerson(): Observable<PersonalDetails[]> {
    return this.http.get<PersonalDetails[]>(`${this.apiUrl}PersonalDetails/getAll`);
  }
  getAllWebinarRegister(): Observable<WebinarRegister[]> {
    return this.http.get<WebinarRegister[]>(`${this.apiUrl}WebinarRegister/getAll`);
  }
  getAllSubscription(): Observable<EmailSubscription[]> {
    return this.http.get<EmailSubscription[]>(`${this.apiUrl}subscriptions/getAll`);
  }
}
