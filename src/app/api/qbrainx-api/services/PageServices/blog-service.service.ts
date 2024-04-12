import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { BlogCommentDto } from '../../models/BlogCommentDto';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
 url="https://qbrainx.com/qbrainx-web/v1/Blogs/";
 private baseUrl = 'https://qbrainx.com/qbrainx-web/v1/BlogComment/createBlogComments';
 subject= new BehaviorSubject<any>({});
//  private product$ = new BehaviorSubject<any>({});
 

  constructor(private httpClient:HttpClient) { }

 getBlogDetailsById(id: any) {
    return this.httpClient.get(`${this.url}getById/${id}`)
  }
  getBlogDetails() {
    return this.httpClient.get(`${this.url}getAll`)
  }

  getBlogSearchDetails(searchdata:any) {
    return this.httpClient.get(`${this.url}getByTitle?keyword=${searchdata}`)
  }

  setBlogObject(obj) { 
    if(this.subject){

     this.subject.next(obj); 

    }
    else{
      this.subject.next(obj); 

    }
    this.subject.next(obj); 
  }
  
  selectedBlog= this.subject.asObservable();

  createBlogComment(blogComment: BlogCommentDto): Observable<BlogCommentDto> {
    return this.httpClient.post<BlogCommentDto>(this.baseUrl, blogComment);
  }

  getBlogByFormattedTitle(getBySubTitle: string): Observable<any> {
    return this.httpClient.get(`${this.url}subtitle/${getBySubTitle}`);
  }
  
}
