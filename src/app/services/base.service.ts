import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BaseService  {
  protected apiUrl: String;
  protected httpHeaders: HttpHeaders;
  constructor() {
   
    this.apiUrl = environment.API;
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    // this.httpHeaders = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
  }
  protected getHeaders() {
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
   
    return {headers: this.httpHeaders};
  }
  protected postOptions() {
    return Object.assign(this.getHeaders(), {withCredentials: true});
  }
  protected getOptions() {
    return Object.assign(this.getHeaders(), {});
  }
  protected putOptions() {
    return Object.assign(this.getHeaders(), {});
  }
  protected deleteOptions() {
    return Object.assign(this.getHeaders(), {});
  }
  protected patchOptions() {
    return Object.assign(this.getHeaders(), {});
  }
  protected extractData(httpResponse: HttpResponse<Object>) {
    return httpResponse || {};
  }
  protected handleError(httpErrorResponse: HttpErrorResponse) {
    return throwError(httpErrorResponse['error'].error || {});
  }
}
