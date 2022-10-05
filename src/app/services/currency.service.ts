import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from "rxjs";
import { Currency } from "../models/currency";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: 'root'
}) 
export class CurrencyService {
  constructor(
    private http: HttpClient, 
    private errorService: ErrorService
    ) { }

  getRate(): Observable<Currency[]> {
    return this.http.get<Currency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .pipe(
        catchError(this.errorHandler.bind(this))
      )
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handel(error.message)
    return throwError(() => error.message)
  }
}