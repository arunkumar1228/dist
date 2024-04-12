import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
 url="/assets/path.json";

  constructor(private httpClient:HttpClient) { }

  getheaderpathDetails() {
    return this.httpClient.get(`${this.url}`)
  }

}
