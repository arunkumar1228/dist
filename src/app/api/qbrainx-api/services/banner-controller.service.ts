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

import { BannerDto } from '../models/banner-dto';

@Injectable({
  providedIn: 'root',
})
export class BannerControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateBannerDetails
   */
  static readonly UpdateBannerDetailsPath = '/updateBannerDetails';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateBannerDetails$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateBannerDetails$FormData$Response(params: {
    bannerId: number;
    context?: HttpContext
    body?: {
'bannerDto': string;
'file': Blob;
}
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, BannerControllerService.UpdateBannerDetailsPath, 'put');
    if (params) {
      rb.query('bannerId', params.bannerId, {});
      rb.body(params.body, 'multipart/form-data');
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
   * To access the full response (for headers, for example), `updateBannerDetails$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  updateBannerDetails$FormData(params: {
    bannerId: number;
    context?: HttpContext
    body?: {
'bannerDto': string;
'file': Blob;
}
  }
): Observable<string> {

    return this.updateBannerDetails$FormData$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateBannerDetails$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBannerDetails$Json$Response(params: {
    bannerId: number;
    context?: HttpContext
    body?: {
'bannerDto': string;
'file': Blob;
}
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, BannerControllerService.UpdateBannerDetailsPath, 'put');
    if (params) {
      rb.query('bannerId', params.bannerId, {});
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
   * To access the full response (for headers, for example), `updateBannerDetails$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBannerDetails$Json(params: {
    bannerId: number;
    context?: HttpContext
    body?: {
'bannerDto': string;
'file': Blob;
}
  }
): Observable<string> {

    return this.updateBannerDetails$Json$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation createBanner
   */
  static readonly CreateBannerPath = '/createBanner';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createBanner$FormData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createBanner$FormData$Response(params?: {
    context?: HttpContext
    body?: {
'banner': string;
'file': Blob;
}
  }
): Observable<StrictHttpResponse<BannerDto>> {

    const rb = new RequestBuilder(this.rootUrl, BannerControllerService.CreateBannerPath, 'post');
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
        return r as StrictHttpResponse<BannerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createBanner$FormData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createBanner$FormData(params?: {
    context?: HttpContext
    body?: {
'banner': string;
'file': Blob;
}
  }
): Observable<BannerDto> {

    return this.createBanner$FormData$Response(params).pipe(
      map((r: StrictHttpResponse<BannerDto>) => r.body as BannerDto)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createBanner$Json()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBanner$Json$Response(params?: {
    context?: HttpContext
    body?: {
'banner': string;
'file': Blob;
}
  }
): Observable<StrictHttpResponse<BannerDto>> {

    const rb = new RequestBuilder(this.rootUrl, BannerControllerService.CreateBannerPath, 'post');
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
        return r as StrictHttpResponse<BannerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createBanner$Json$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBanner$Json(params?: {
    context?: HttpContext
    body?: {
'banner': string;
'file': Blob;
}
  }
): Observable<BannerDto> {

    return this.createBanner$Json$Response(params).pipe(
      map((r: StrictHttpResponse<BannerDto>) => r.body as BannerDto)
    );
  }

  /**
   * Path part for operation getBanner
   */
  static readonly GetBannerPath = '/getBannerById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBanner()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBanner$Response(params: {
    bannerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<BannerDto>> {

    const rb = new RequestBuilder(this.rootUrl, BannerControllerService.GetBannerPath, 'get');
    if (params) {
      rb.query('bannerId', params.bannerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<BannerDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getBanner$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBanner(params: {
    bannerId: number;
    context?: HttpContext
  }
): Observable<BannerDto> {

    return this.getBanner$Response(params).pipe(
      map((r: StrictHttpResponse<BannerDto>) => r.body as BannerDto)
    );
  }

  /**
   * Path part for operation allBannerList
   */
  static readonly AllBannerListPath = '/getAllBanners';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `allBannerList()` instead.
   *
   * This method doesn't expect any request body.
   */
  allBannerList$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<BannerDto>>> {

    const rb = new RequestBuilder(this.rootUrl, BannerControllerService.AllBannerListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BannerDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `allBannerList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  allBannerList(params?: {
    context?: HttpContext
  }
): Observable<Array<BannerDto>> {

    return this.allBannerList$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BannerDto>>) => r.body as Array<BannerDto>)
    );
  }

  /**
   * Path part for operation deleteImageByBannerId
   */
  static readonly DeleteImageByBannerIdPath = '/deleteImage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteImageByBannerId()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImageByBannerId$Response(params: {
    bannerId: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, BannerControllerService.DeleteImageByBannerIdPath, 'delete');
    if (params) {
      rb.query('bannerId', params.bannerId, {});
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
   * To access the full response (for headers, for example), `deleteImageByBannerId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteImageByBannerId(params: {
    bannerId: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.deleteImageByBannerId$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation deleteBannerById
   */
  static readonly DeleteBannerByIdPath = '/deleteBannerById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBannerById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBannerById$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, BannerControllerService.DeleteBannerByIdPath, 'delete');
    if (params) {
      rb.query('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteBannerById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBannerById(params: {
    id: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.deleteBannerById$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
