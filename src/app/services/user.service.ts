import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { forkJoin } from 'rxjs';
declare var moment:any;

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  protected user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient) {
    super();
  }
  getgitRepo(endpoint){
    //moment.js used for time compilation
    //forkJoin is used for multiple requests on page load (or some other event) 
    //and only want to take action when a response has been received for all
    let now = moment().format('YYYY-MM-DD[T]HH:MM');
    let oneDaybefore = moment().subtract(1, 'days').format('YYYY-MM-DD[T]HH:MM');
    let sevenDaybefore = moment().subtract(7, 'days').format('YYYY-MM-DD[T]HH:MM');
    let url = `https://api.github.com/search/issues?q=repo:`+endpoint+`+is:issue+is:open `;    
    let url1 = `https://api.github.com/search/issues?q=repo:`+endpoint+`+is:issue+is:open +created:${oneDaybefore}..${now}`;
    let url2 = `https://api.github.com/search/issues?q=repo:`+endpoint+`+is:issue+is:open+created:${sevenDaybefore}..${oneDaybefore}`;
    
    let url3 = `https://api.github.com/search/issues?q=repo:`+endpoint+`+is:issue+is:open+created:<${sevenDaybefore}`;

    let res1 = this.httpClient.get(url).pipe(map(this.extractData),catchError(this.handleError)); 
    let res2 = this.httpClient.get(url1).pipe(map(this.extractData),catchError(this.handleError));
    let res3 = this.httpClient.get(url2).pipe(map(this.extractData),catchError(this.handleError));
    let res4 = this.httpClient.get(url3).pipe(map(this.extractData),catchError(this.handleError));
    return forkJoin([res1,res2,res3,res4]);
  }
  
 
}
