import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { of, Observable } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  promotions: Promotion[] = PROMOTIONS;
  constructor(private http: HttpClient,
    private processHttpMsgService: ProcessHTTPMsgService)
  {
  }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL + 'promotions').
      pipe(catchError(this.processHttpMsgService.handleError));
   
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
      .pipe(catchError(this.processHttpMsgService.handleError));
   // (PROMOTIONS.filter((promo) => (promo.id === id))[0])

  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').
      pipe(map(promotions => promotions[0])).
      pipe(catchError(this.processHttpMsgService.handleError));
      //(PROMOTIONS.filter((promotion) => promotion.featured)[0])
  }
}
