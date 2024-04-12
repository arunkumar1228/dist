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

import { FeedBackDto } from '../models/feed-back-dto';
import { FeedBackImage } from '../models/feed-back-image';
import { Feedback } from '../models/feedback';
import { ResponseFile } from '../models/response-file';

@Injectable({
  providedIn: 'root',
})
export class FeedBackControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation uploadFeedbackImage
   */
  static readonly UploadFeedbackImagePath = '/v1/WhoWeAre/uploadFeedback';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFeedbackImage()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFeedbackImage$Response(params?: {
    context?: HttpContext
    body?: {
'file': Array<Blob>;
}
  }
): Observable<StrictHttpResponse<FeedBackImage>> {

    const rb = new RequestBuilder(this.rootUrl, FeedBackControllerService.UploadFeedbackImagePath, 'post');
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
        return r as StrictHttpResponse<FeedBackImage>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadFeedbackImage$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFeedbackImage(params?: {
    context?: HttpContext
    body?: {
'file': Array<Blob>;
}
  }
): Observable<FeedBackImage> {

    return this.uploadFeedbackImage$Response(params).pipe(
      map((r: StrictHttpResponse<FeedBackImage>) => r.body as FeedBackImage)
    );
  }

  /**
   * Path part for operation insertfeedBackDetails
   */
  static readonly InsertfeedBackDetailsPath = '/v1/WhoWeAre/saveFeedback';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertfeedBackDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertfeedBackDetails$Response(params: {
    context?: HttpContext
    body: FeedBackDto
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, FeedBackControllerService.InsertfeedBackDetailsPath, 'post');
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
   * To access the full response (for headers, for example), `insertfeedBackDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertfeedBackDetails(params: {
    context?: HttpContext
    body: FeedBackDto
  }
): Observable<string> {

    return this.insertfeedBackDetails$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getfeedbackImage1
   */
  static readonly GetfeedbackImage1Path = '/v1/WhoWeAre/getImageById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getfeedbackImage1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getfeedbackImage1$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<FeedBackImage>> {

    const rb = new RequestBuilder(this.rootUrl, FeedBackControllerService.GetfeedbackImage1Path, 'get');
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
        return r as StrictHttpResponse<FeedBackImage>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getfeedbackImage1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getfeedbackImage1(params: {
    id: number;
    context?: HttpContext
  }
): Observable<FeedBackImage> {

    return this.getfeedbackImage1$Response(params).pipe(
      map((r: StrictHttpResponse<FeedBackImage>) => r.body as FeedBackImage)
    );
  }

  /**
   * Path part for operation getFeedBack
   */
  static readonly GetFeedBackPath = '/v1/WhoWeAre/getFeedbackById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFeedBack()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFeedBack$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Feedback>> {

    const rb = new RequestBuilder(this.rootUrl, FeedBackControllerService.GetFeedBackPath, 'get');
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
        return r as StrictHttpResponse<Feedback>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFeedBack$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFeedBack(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Feedback> {

    return this.getFeedBack$Response(params).pipe(
      map((r: StrictHttpResponse<Feedback>) => r.body as Feedback)
    );
  }

  /**
   * Path part for operation getListFiles1
   */
  static readonly GetListFiles1Path = '/v1/WhoWeAre/getAllImageFiles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getListFiles1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListFiles1$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ResponseFile>>> {

    const rb = new RequestBuilder(this.rootUrl, FeedBackControllerService.GetListFiles1Path, 'get');
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
   * To access the full response (for headers, for example), `getListFiles1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListFiles1(params?: {
    context?: HttpContext
  }
): Observable<Array<ResponseFile>> {

    return this.getListFiles1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ResponseFile>>) => r.body as Array<ResponseFile>)
    );
  }

  /**
   * Path part for operation getAll1
   */
  static readonly GetAll1Path = '/v1/WhoWeAre/getAllFeedback';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll1$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<FeedBackDto>>> {

    const rb = new RequestBuilder(this.rootUrl, FeedBackControllerService.GetAll1Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FeedBackDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll1(params?: {
    context?: HttpContext
  }
): Observable<Array<FeedBackDto>> {

    return this.getAll1$Response(params).pipe(
      map((r: StrictHttpResponse<Array<FeedBackDto>>) => r.body as Array<FeedBackDto>)
    );
  }

  /**
   * Path part for operation deleteImage1
   */
  static readonly DeleteImage1Path = '/v1/WhoWeAre/deleteFeedbackImageById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteImage1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImage1$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, FeedBackControllerService.DeleteImage1Path, 'delete');
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
   * To access the full response (for headers, for example), `deleteImage1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImage1(params: {
    id: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.deleteImage1$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation delete1
   */
  static readonly Delete1Path = '/v1/WhoWeAre/deleteFeedbackById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete1()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete1$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, FeedBackControllerService.Delete1Path, 'delete');
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
   * To access the full response (for headers, for example), `delete1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete1(params: {
    id: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.delete1$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
