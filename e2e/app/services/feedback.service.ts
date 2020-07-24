import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Feedback } from '../shared/feedback';
import { of, Observable, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  feedBack: Feedback[];
  uploadflag = false;
  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHTTPMsgService) { }

  submitFeedback(fb: Feedback): Observable <Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback', fb, httpOptions)
      .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
