import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YtBrieferRequestService {
  private _httpClient: HttpClient;
  
  getSummaryOfVideo(url: string): Observable<any> {
    let requestUrl = 'http://127.0.0.1:5000/api/summerize-yt-video?url=' + url;
    return this._httpClient.get(requestUrl, {responseType: 'json'});
  }
  
  constructor(private httpClient: HttpClient){
    this._httpClient = httpClient;
  }
}
