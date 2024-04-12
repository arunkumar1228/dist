// lets-talk.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LetsTalk } from '../../models/talk.model';

@Injectable({
  providedIn: 'root'
})
export class LetsTalkService {
 ; // Replace with your Spring Boot API URL

  constructor(private http: HttpClient) {}

 
}
