import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Charge } from '../models/charge.model';

const baseUrl = '/api/charges/';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  constructor(private http: HttpClient) { }

  	private _charge: Charge[] = [];

	setCharge(charge: Charge[]) {
	    this._charge = charge;
	}

	getCharge(): Charge[] {
	    return this._charge;
	}

	getAll(): Observable<Charge[]> {
		return this.http.get<Charge[]>(baseUrl);
	}


  searchCharge(term: string): Observable<Charge[]> {
		return this.http.post<Charge[]>(`${baseUrl}search`, {keyword: term});
	}

	getList(): Observable<Charge[]> {
		return this.http.get<Charge[]>(`${baseUrl}list`);
	}

	get(id: any): Observable<Charge> {
		return this.http.get<Charge>(`${baseUrl}${id}`);
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

  post(id: any, data: any = {}): Observable<any> {
		return this.http.put(`${baseUrl}${id}/post`, data);
	}

}
