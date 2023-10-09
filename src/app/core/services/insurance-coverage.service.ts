import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsuranceCoverage } from '../models/insurance-coverage.model';

const baseUrl = '/api/insurance-coverage/';
const baseUrlAll = '/api/insurance-coverages/';
const searchInsCompanyUrl = '/api/update-insurance-company';
const patientInsuranceUrl = '/api/patient-insurance'

@Injectable({
  providedIn: 'root'
})
export class InsuranceCoverageService {

  constructor(private http: HttpClient) { }

  	private _insuranceCoverages: InsuranceCoverage[] = [];

  set insuranceCoverages(insCoverages: InsuranceCoverage[]) {
    this._insuranceCoverages = insCoverages;
  }

  get insuranceCoverages(): InsuranceCoverage[] {
    return this._insuranceCoverages;
  }

	getAll(): Observable<InsuranceCoverage[]> {
		return this.http.get<InsuranceCoverage[]>(baseUrlAll);
	}

  getAllBySubscriber(accountId: number | string, subscriberId: number | string): Observable<InsuranceCoverage[]> {
		return this.http.get<InsuranceCoverage[]>(`api/account/${accountId}/subscriber/${subscriberId}/insurance-coverages`);
	}

	get(id: any): Observable<InsuranceCoverage> {
		return this.http.get<InsuranceCoverage>(`${baseUrl}${id}`);
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

  assignPatientInsurance(data: any) {
    return this.http.post(patientInsuranceUrl, data);
  }

  // data: {
  //   patient_id: number,
  //   type: string,
  //   insurance_id: number
  // }
  removePatientInsurance(data: any) {
    return this.http.post(`${patientInsuranceUrl}/remove`, data);
  }
}
