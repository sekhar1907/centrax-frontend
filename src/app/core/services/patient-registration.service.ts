import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientRegistration } from '../models/patient-registration.model';
import { Patient } from '../models/patient.model';

const baseUrl = '/api/patient/register';

@Injectable({
  providedIn: 'root'
})
export class PatientRegistrationService {

  constructor(private http: HttpClient) { }

	get(id: any): Observable<Patient> {
		return this.http.get<Patient>(`/api/patient/${id}`);
	}

	getPracticePatients(): Observable<Patient[]> {
		return this.http.get<Patient[]>(`/api/patient/list-for-practice`);
	}

	create(data: PatientRegistration): Observable<any> {
		return this.http.post(baseUrl, data);
	}

	update(id: any, data: PatientRegistration): Observable<any> {
		return this.http.put(`/api/patient/${id}`, data);
	}

	delete(id: any): Observable<any> {
		return this.http.delete(`${baseUrl}${id}`);
	}

  deleteMedication(id: any) {
		return this.http.delete(`/api/delete-patien-medication/${id}`);
  }
}
