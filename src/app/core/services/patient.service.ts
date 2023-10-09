import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientInfo } from '../models/patient.model';

const baseUrl = '/api/patient/register';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

	get(id: any): Observable<PatientInfo> {
		return this.http.get<PatientInfo>(`/api/patient/${id}`);
	}

  search(data: any): Observable<PatientInfo[]> {
		return this.http.post<PatientInfo[]>('/api/patient/search/', data);
  }
}
