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

import { Image } from '../models/image';
import { ResponseFile } from '../models/response-file';
import { Text } from '../models/text';
import { TextDto } from '../models/text-dto';

@Injectable({
  providedIn: 'root',
})
export class TextControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation uploadFile
   */
  static readonly UploadFilePath = '/v1/lifeAtQb/uploadImage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFile()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile$Response(params?: {
    context?: HttpContext
    body?: {
'file': Array<Blob>;
}
  }
): Observable<StrictHttpResponse<Image>> {

    const rb = new RequestBuilder(this.rootUrl, TextControllerService.UploadFilePath, 'post');
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
        return r as StrictHttpResponse<Image>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadFile$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile(params?: {
    context?: HttpContext
    body?: {
'file': Array<Blob>;
}
  }
): Observable<Image> {

    return this.uploadFile$Response(params).pipe(
      map((r: StrictHttpResponse<Image>) => r.body as Image)
    );
  }

  /**
   * Path part for operation insertTextDetails
   */
  static readonly InsertTextDetailsPath = '/v1/lifeAtQb/saveText';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertTextDetails()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertTextDetails$Response(params: {
    context?: HttpContext
    body: TextDto
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, TextControllerService.InsertTextDetailsPath, 'post');
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
   * To access the full response (for headers, for example), `insertTextDetails$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertTextDetails(params: {
    context?: HttpContext
    body: TextDto
  }
): Observable<string> {

    return this.insertTextDetails$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getText
   */
  static readonly GetTextPath = '/v1/lifeAtQb/getTextById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getText()` instead.
   *
   * This method doesn't expect any request body.
   */
  getText$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Text>> {

    const rb = new RequestBuilder(this.rootUrl, TextControllerService.GetTextPath, 'get');
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
        return r as StrictHttpResponse<Text>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getText$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getText(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Text> {

    return this.getText$Response(params).pipe(
      map((r: StrictHttpResponse<Text>) => r.body as Text)
    );
  }

  /**
   * Path part for operation getfeedbackImage
   */
  static readonly GetfeedbackImagePath = '/v1/lifeAtQb/getImageById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getfeedbackImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getfeedbackImage$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Image>> {

    const rb = new RequestBuilder(this.rootUrl, TextControllerService.GetfeedbackImagePath, 'get');
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
        return r as StrictHttpResponse<Image>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getfeedbackImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getfeedbackImage(params: {
    id: number;
    context?: HttpContext
  }
): Observable<Image> {

    return this.getfeedbackImage$Response(params).pipe(
      map((r: StrictHttpResponse<Image>) => r.body as Image)
    );
  }

  /**
   * Path part for operation getAll
   */
  static readonly GetAllPath = '/v1/lifeAtQb/getAllText';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<TextDto>>> {

    const rb = new RequestBuilder(this.rootUrl, TextControllerService.GetAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TextDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll(params?: {
    context?: HttpContext
  }
): Observable<Array<TextDto>> {

    return this.getAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TextDto>>) => r.body as Array<TextDto>)
    );
  }

  /**
   * Path part for operation getListFiles
   */
  static readonly GetListFilesPath = '/v1/lifeAtQb/getAllImageFiles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getListFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListFiles$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ResponseFile>>> {

    const rb = new RequestBuilder(this.rootUrl, TextControllerService.GetListFilesPath, 'get');
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
   * To access the full response (for headers, for example), `getListFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListFiles(params?: {
    context?: HttpContext
  }
): Observable<Array<ResponseFile>> {

    return this.getListFiles$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ResponseFile>>) => r.body as Array<ResponseFile>)
    );
  }

  /**
   * Path part for operation deleteImage
   */
  static readonly DeleteImagePath = '/v1/lifeAtQb/deleteFeedbackImageById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImage$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, TextControllerService.DeleteImagePath, 'delete');
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
   * To access the full response (for headers, for example), `deleteImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImage(params: {
    id: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.deleteImage$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation delete
   */
  static readonly DeletePath = '/v1/lifeAtQb/deleteFeedbackById/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, TextControllerService.DeletePath, 'delete');
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
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: {
    id: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.delete$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
