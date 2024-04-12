// personal-details.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonalDetailsService {
  private apiUrl = 'https://qbrainx.com/qbrainx-web/v1/PersonalDetails';

  constructor(private http: HttpClient) {}

  getAllPersonalDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }
}
