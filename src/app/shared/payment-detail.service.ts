import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  readonly payUrl = 'http://localhost:61236/api/paymentdetails';
  ListOfdetails:PaymentDetail[];
  filteredNumber: PaymentDetail[];
  
  constructor(private http:HttpClient) { }

   getPaymentDetail(): Observable<PaymentDetail[]> {
    return this.http.get<PaymentDetail[]>(this.payUrl)
        .pipe(catchError(this.handleError));
}

refreshlisting() {
  this.http.get<PaymentDetail[]>(this.payUrl)
      .pipe(catchError(this.handleError))
      .toPromise()
      .then(res => {this.ListOfdetails = res as PaymentDetail[];
      this.filteredNumber = this.ListOfdetails});
}
getPaymentDetailbyId(id:number): Observable<PaymentDetail> {
  return this.http.get<PaymentDetail>(`${this.payUrl}/${id}`)
      .pipe(catchError(this.handleError));
}

  postPayment(formdata:PaymentDetail):Observable<PaymentDetail>{
    return this.http.post<PaymentDetail>(this.payUrl,formdata, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  })
  .pipe(catchError(this.handleError));
}

updatePaymentDetail(pd: PaymentDetail): Observable<void> {
  return this.http.put<void>(`${this.payUrl}/${pd.PMID}`, pd, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  })
      .pipe(catchError(this.handleError));
}

deleteDetail(id: number): Observable<void> {
  return this.http.delete<void>(`${this.payUrl}/${id}`)
      .pipe(catchError(this.handleError));
}

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
}
}
