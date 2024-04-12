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

import { User } from '../models/user';
import { UserDto } from '../models/user-dto';

@Injectable({
  providedIn: 'root',
})
export class UserControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation addEmployee
   */
  static readonly AddEmployeePath = '/api/v1/insertData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addEmployee()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEmployee$Response(params: {
    context?: HttpContext
    body: UserDto
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.AddEmployeePath, 'post');
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
   * To access the full response (for headers, for example), `addEmployee$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEmployee(params: {
    context?: HttpContext
    body: UserDto
  }
): Observable<string> {

    return this.addEmployee$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation getOffers
   */
  static readonly GetOffersPath = '/api/v1/getUserById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOffers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOffers$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<User>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.GetOffersPath, 'get');
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
        return r as StrictHttpResponse<User>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOffers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOffers(params: {
    id: number;
    context?: HttpContext
  }
): Observable<User> {

    return this.getOffers$Response(params).pipe(
      map((r: StrictHttpResponse<User>) => r.body as User)
    );
  }

  /**
   * Path part for operation getAllUser
   */
  static readonly GetAllUserPath = '/api/v1/getAllUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUser$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<UserDto>>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.GetAllUserPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUser(params?: {
    context?: HttpContext
  }
): Observable<Array<UserDto>> {

    return this.getAllUser$Response(params).pipe(
      map((r: StrictHttpResponse<Array<UserDto>>) => r.body as Array<UserDto>)
    );
  }

  /**
   * Path part for operation deleteUserById
   */
  static readonly DeleteUserByIdPath = '/api/v1/deleteUserById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUserById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserById$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, UserControllerService.DeleteUserByIdPath, 'delete');
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
   * To access the full response (for headers, for example), `deleteUserById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUserById(params: {
    id: number;
    context?: HttpContext
  }
): Observable<string> {

    return this.deleteUserById$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

}
