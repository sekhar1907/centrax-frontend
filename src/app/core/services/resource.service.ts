import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateResourceDto, Resource } from '../models/resource.model';

const baseUrl = '/api/resources/';

@Injectable({
  	providedIn: 'root'
})
export class ResourceService {

	constructor(private http: HttpClient) { }

	getAll(): Observable<Resource[]> {
		return this.http.get<Resource[]>(baseUrl);
	}

	get(id: any): Observable<Resource> {
		return this.http.get<Resource>(`${baseUrl}${id}`);
	}

	create(data: CreateResourceDto): Observable<Resource> {
		return this.http.post<Resource>(baseUrl, data);
	}

	update(id: any, data: CreateResourceDto): Observable<any> {
		return this.http.put(`${baseUrl}${id}`, data);
	}

	delete(id: any): Observable<any> {
		return this.http.delete(`${baseUrl}${id}`);
	}

}

