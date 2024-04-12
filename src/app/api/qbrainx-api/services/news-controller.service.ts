/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { News } from '../models/news';
import { NewsDto } from '../models/news-dto';
import { NewsImage } from '../models/news-image';
import { ResponseFile } from '../models/response-file';

@Injectable({
  providedIn: 'root',
})
export class NewsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation insertNewsDetails
   */
  static readonly InsertNewsDetailsPath = '/v1/OurService/saveNews';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertNewsDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertNewsDetails$Response(params: {
    context?: HttpContext
    body: NewsDto
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.InsertNewsDetailsPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertNewsDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertNewsDetails(params: {
    context?: HttpContext
    body: NewsDto
  }
): Observable<string> {

    return this.insertNewsDetails$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation uploadNewsImage
   */
  static readonly UploadNewsImagePath = '/v1/OurService/newsImage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadNewsImage()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadNewsImage$Response(params?: {
    context?: HttpContext
    body?: {
'file': Array<Blob>;
}
  }
): Observable<StrictHttpResponse<NewsImage>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.UploadNewsImagePath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NewsImage>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadNewsImage$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadNewsImage(params?: {
    context?: HttpContext
    body?: {
'file': Array<Blob>;
}
  }
): Observable<NewsImage> {

    return this.uploadNewsImage$Response(params).pipe(
      map((r: StrictHttpResponse<NewsImage>) => r.body as NewsImage)
    );
  }

  /**
   * Path part for operation getNews
   */
  static readonly GetNewsPath = '/v1/OurService/getNewsById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNews()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNews$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<News>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.GetNewsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<News>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNews$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNews(params: {
    id: number;
    context?: HttpContext
  }
): Observable<News> {

    return this.getNews$Response(params).pipe(
      map((r: StrictHttpResponse<News>) => r.body as News)
    );
  }

  /**
   * Path part for operation getfeedbackImage2
   */
  static readonly GetfeedbackImage2Path = '/v1/OurService/getImageById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getfeedbackImage2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getfeedbackImage2$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<NewsImage>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.GetfeedbackImage2Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NewsImage>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getfeedbackImage2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getfeedbackImage2(params: {
    id: number;
    context?: HttpContext
  }
): Observable<NewsImage> {

    return this.getfeedbackImage2$Response(params).pipe(
      map((r: StrictHttpResponse<NewsImage>) => r.body as NewsImage)
    );
  }

  /**
   * Path part for operation getAll2
   */
  static readonly GetAll2Path = '/v1/OurService/getAllNews';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll2$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<NewsDto>>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.GetAll2Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<NewsDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll2(params?: {
    context?: HttpContext
  }
): Observable<Array<NewsDto>> {

    return this.getAll2$Response(params).pipe(
      map((r: StrictHttpResponse<Array<NewsDto>>) => r.body as Array<NewsDto>)
    );
  }

  /**
   * Path part for operation getListFiles2
   */
  static readonly GetListFiles2Path = '/v1/OurService/getAllImageFiles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getListFiles2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListFiles2$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ResponseFile>>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.GetListFiles2Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ResponseFile>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getListFiles2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListFiles2(params?: {
    context?: HttpContext
  }
): Observable<Array<ResponseFile>> {

    return this.getListFiles2$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ResponseFile>>) => r.body as Array<ResponseFile>)
    );
  }

  /**
   * Path part for operation deleteNewsImage
   */
  static readonly DeleteNewsImagePath = '/v1/OurService/deleteNewsImageById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteNewsImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteNewsImage$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.DeleteNewsImagePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteNewsImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteNewsImage(params: {
    id: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.deleteNewsImage$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation deleteNews
   */
  static readonly DeleteNewsPath = '/v1/OurService/deleteNewsById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteNews()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteNews$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.DeleteNewsPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteNews$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteNews(params: {
    id: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.deleteNews$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
