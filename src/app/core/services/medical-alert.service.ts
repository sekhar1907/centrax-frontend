import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../models/resource.model';
import { MedicalAlert } from '../models/patient.model';

const baseUrl = '/api/accounts/medical-alert/';

@Injectable({
  	providedIn: 'root'
})
export class MedicalAlertService {

	constructor(private http: HttpClient) { }

	getAll(): Observable<MedicalAlert[]> {
		return this.http.get<MedicalAlert[]>(`${baseUrl}list`);
	}

	create(data: any): Observable<any> {
		return this.http.post(baseUrl, data);
	}

	delete(id: any): Observable<any> {
		return this.http.delete(`${baseUrl}${id}`);
	}

}

