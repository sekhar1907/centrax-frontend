import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GPCreditSaleArgs } from "../models/payment.model";

const baseUrl = '/api/global-payments';

@Injectable({
  	providedIn: 'root'
})
export class CardPaymentService {

	constructor(private http: HttpClient) { }

	runACreditSale(data: GPCreditSaleArgs): Observable<any> {
		return this.http.post(`${baseUrl}/card-not-present/credit/sale`, data);
	}
}
