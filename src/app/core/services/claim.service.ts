import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from '../models/claims.model';

const baseUrl = '/api/claims/';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http: HttpClient) { }

  	private _claims: Claim[] = [];

	setInsurancePlans(claims: Claim[]) {
	    this._claims = claims;
	}

	getInsurancePlans(): Claim[] {
	    return this._claims;
	}

	getAll(): Observable<Claim[]> {
		return this.http.get<Claim[]>(baseUrl);
	}

  searchInsuranceCompany(term: string): Observable<Claim[]> {
		return this.http.post<Claim[]>(`${baseUrl}search_companies`, {keyword: term});
	}

  searchClaim(term: string): Observable<Claim[]> {
		return this.http.post<Claim[]>(`${baseUrl}search`, {keyword: term});
	}

	getList(): Observable<Claim[]> {
		return this.http.get<Claim[]>(`${baseUrl}list`);
	}

	get(id: any): Observable<Claim> {
		return this.http.get<Claim>(`${baseUrl}${id}`);
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
