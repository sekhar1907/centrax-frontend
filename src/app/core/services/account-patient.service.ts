import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountPatient } from '../models/account-patient.model';
import { Appointment } from '../models/appointment.model';

const baseUrl = '/api/accounts/patients/';
const baseUrlMedicalAlert = '/api/accounts/patients/medical-alert/';
const searchSubscriberUrl = '/api/subscriber/search/';

@Injectable({
  providedIn: 'root'
})
export class AccountPatientService {

  constructor(private http: HttpClient) { }

  	private _accountPatients:AccountPatient[] = [];

	setAccountPatients(accountPatients: AccountPatient[]) {
		console.log('setAccountPatients -->', accountPatients)
	    this._accountPatients = accountPatients;
	}

	getAccountPatients(): AccountPatient[] {
	    return this._accountPatients;
	}

	getAll(): Observable<AccountPatient[]> {
		return this.http.get<AccountPatient[]>(`${baseUrl}all`);
	}

	getList(): Observable<AccountPatient[]> {
		return this.http.get<AccountPatient[]>(`${baseUrl}list`);
	}

  getListByPatient(patientId): Observable<any[]> {
		return this.http.get<any[]>(`${baseUrl}${patientId}/appointments`);
	}

	get(id: any): Observable<AccountPatient> {
		return this.http.get<AccountPatient>(`${baseUrl}${id}`);
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

	addAccountPatient(id: any, account_id: any): Observable<any> {
	    return this.http.put(`${baseUrl}add-account/${id}`, { account_id });
	}

  createInsPlanPatient(data: any, id: number) {
		return this.http.post(`${baseUrl}${id}/add-insurance`, data);
  }

  deleteMedAlert(id: any): Observable<any> {
		return this.http.delete(`${baseUrlMedicalAlert}${id}`);
	}

  searchSubscriber(keyword: String): Observable<any[]> {
		return this.http.post<any[]>(searchSubscriberUrl, {keyword});
  }
}
