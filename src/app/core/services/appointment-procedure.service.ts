import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentProcedure } from '../models/appointment-procedure.model';

const baseUrl = '/api/appointment-procedures/';

@Injectable({
  	providedIn: 'root'
})
export class AppointmentProcedureService {

	constructor(private http: HttpClient) { }

	getAll(): Observable<AppointmentProcedure[]> {
		return this.http.get<AppointmentProcedure[]>(baseUrl);
	}

	get(id: any): Observable<AppointmentProcedure> {
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
