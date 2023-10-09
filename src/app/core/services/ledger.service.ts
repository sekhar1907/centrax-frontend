import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LedgerItem } from '../models/ledger-item.model';


const baseUrl = '/api/charges/';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {

  constructor(private http: HttpClient) { }

  	private _charge: LedgerItem[] = [];

	setCharge(charge: LedgerItem[]) {
	    this._charge = charge;
	}

	getCharge(): LedgerItem[] {
	    return this._charge;
	}

	getAll(): Observable<LedgerItem[]> {
		return this.http.get<LedgerItem[]>(baseUrl);
	}


  searchCharge(term: string): Observable<LedgerItem[]> {
		return this.http.post<LedgerItem[]>(`${baseUrl}search`, {keyword: term});
	}

	getList(): Observable<LedgerItem[]> {
		return this.http.get<LedgerItem[]>(`${baseUrl}list`);
	}

	get(id: any): Observable<LedgerItem> {
		return this.http.get<LedgerItem>(`${baseUrl}${id}`);
	}

	create(data: any): Observable<any> {
		return this.http.post(baseUrl, data);
	}

	update(id: any, data: any): Observable<any> {
		return this.http.put(`${baseUrl}${id}`, data);
	}

	delete(id: any): Observable<any> {
		return this.http.delete(`${baseUrl}${id}`);
	}

}
