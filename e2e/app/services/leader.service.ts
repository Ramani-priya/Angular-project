import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  leaders: Leader[] = LEADERS;
  constructor(private http: HttpClient, private processHttpMsgService: ProcessHTTPMsgService) { }
  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHttpMsgService.handleError));
   
  }
  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leadership/' + id).
      pipe(catchError(this.processHttpMsgService.handleError));
   
  }
  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true')
      .pipe(map(leaders => leaders[0])).
      pipe(catchError(this.processHttpMsgService.handleError));
   
  }
}
