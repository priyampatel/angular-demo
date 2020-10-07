import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import {  HttpClient } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Category } from '../modals/category.model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  hostUrl: string = environment.serverUrl;
  AllCategory=new BehaviorSubject<Category[]>([]);
  AllCategory$ = this.AllCategory.asObservable();

  constructor(public http: HttpClient) { }

  getData(url: string): Observable<any> {
      return this.http.get(this.hostUrl + url,{observe: 'response'}).pipe(
      catchError(this.handleError)
    );
  }
  getById(url: string): Observable<any> {
 
    return this.http.get(this.hostUrl + url,{observe: 'response'}).pipe(
      catchError(this.handleError)
    );
  }
  postData(url: string, params: any): Observable<any> {
      return this.http.post(this.hostUrl+url, params,{observe: 'response'})
        .pipe(
          catchError(this.handleError)
        );
  }
  putData(url: string, params: any): Observable<any> {
      return this.http.put(this.hostUrl+url, params).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteData(url: string): Observable<any> {
        return this.http.delete(this.hostUrl+ url);
  }
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
