import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { AccountPatient } from '../models/account-patient.model';

const baseUrl = '/api/accounts/';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  	private _accounts:Account[] = [];

	setAccounts(accounts: Account[]) {
		console.log('setAccounts -->', accounts)
	    this._accounts = accounts;
	}

	addAccount(item: Account) {
	    this._accounts.push(item);
	}

	getAccounts(): Account[] {
	    return this._accounts;
	}

  getPatientsByAccountId(account_id: number | string): Observable<AccountPatient[]> {
		return this.http.get<AccountPatient[]>(`${baseUrl}${account_id}/patients`);
	}

	getAll(): Observable<Account[]> {
		return this.http.get<Account[]>(baseUrl);
	}

	getList(data: any): Observable<any> {
		return this.http.post<any>(`${baseUrl}list`, data);
	}

	get(id: any): Observable<Account> {
		return this.http.get(`${baseUrl}${id}`);
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
