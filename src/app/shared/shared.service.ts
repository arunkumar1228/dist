import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { EmailSubscription } from '../api/qbrainx-api/models/EmailSubscription';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  url="/assets/content/path.json";
  
 private baseUrl = 'https://qbrainx.com/qbrainx-web/v1/subscriptions/create';


  constructor(private httpClient:HttpClient) { }

  getheaderpathDetails() {
    return this.httpClient.get(`${this.url}`)
  }
  createEmailSubscription(emailSubscription: EmailSubscription): Observable<EmailSubscription> {
    return this.httpClient.post<EmailSubscription>(this.baseUrl, emailSubscription);
  }
  
 
}
