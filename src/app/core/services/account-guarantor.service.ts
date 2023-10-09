import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { AccountGuarantor } from '../models/account-guarantor.model';

const baseUrl = '/api/accounts/guarantors/';

@Injectable({
  providedIn: 'root'
})
export class AccountGuarantorService {
  // current account to be used in account ledger
  private _currentLedgerAccount: AccountGuarantor;

	constructor(private http: HttpClient) { }

  	private _accountGuarantors:AccountGuarantor[] = [];

	setAccountGuarantor(accountGuarantors: AccountGuarantor[]) {
		console.log('setAccountGuarantors -->', accountGuarantors)
	    this._accountGuarantors = accountGuarantors;
	}

	addAccountGuarantor(item: AccountGuarantor) {
	    this._accountGuarantors.push(item);
	}

	getAccountGuarantors(): AccountGuarantor[] {
	    return this._accountGuarantors;
	}

	getAll(): Observable<AccountGuarantor[]> {
		return this.http.get<AccountGuarantor[]>(baseUrl);
	}

	getList(): Observable<AccountGuarantor[]> {
		return this.http.get<AccountGuarantor[]>(`${baseUrl}list`);
	}

	get(id: any): Observable<AccountGuarantor> {
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

  set currentLedgerAccount(account: AccountGuarantor) {
    this._currentLedgerAccount = account;
  }

  get currentLedgerAccount(): AccountGuarantor {
    return this._currentLedgerAccount;
  }
}
