import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProcedureSchedule } from '../models/procedure-schedule.model';

const baseUrl = '/api/procedure-schedules/';

@Injectable({
  	providedIn: 'root'
})
export class ProcedureScheduleService {

	constructor(private http: HttpClient) { }

	get(): Observable<ProcedureSchedule> {
		return this.http.get(baseUrl);
	}

	create(data: any): Observable<any> {
		return this.http.post(baseUrl, data);
	}

	update(data: any): Observable<any> {
		return this.http.put(baseUrl, data);
	}

}
