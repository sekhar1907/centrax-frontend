import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialty } from '../models/specialty.model';

const baseUrl = '/api/specialty/';

@Injectable({
  	providedIn: 'root'
})
export class SpecialtyService {

	constructor(private http: HttpClient) { }

	getAll(): Observable<Specialty[]> {
		return this.http.get<Specialty[]>(baseUrl);
	}

	get(id: any): Observable<Specialty> {
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
