import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentHour } from '../models/appointment-hour.model';

const baseUrl = '/api/appointment-hour/';

@Injectable({
  	providedIn: 'root'
})
export class AppointmentHourService {

	constructor(private http: HttpClient) { }

	getAll(): Observable<AppointmentHour[]> {
		return this.http.get<AppointmentHour[]>(baseUrl);
	}

	get(id: any): Observable<AppointmentHour> {
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
