import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employer, InsuranceCompany, InsurancePlan } from '../models/insurance-plan.model';

const baseUrl = '/api/insurance/';
const baseUrlEmp = '/api/employers/';
const searchInsCompanyUrl = '/api/update-insurance-company';

@Injectable({
  providedIn: 'root'
})
export class InsurancePlanService {

  constructor(private http: HttpClient) { }

  	private _insurancePlans:InsurancePlan[] = [];

	setInsurancePlans(InsurancePlans: InsurancePlan[]) {
	    this._insurancePlans = InsurancePlans;
	}

	getInsurancePlans(): InsurancePlan[] {
	    return this._insurancePlans;
	}

	getAll(): Observable<InsurancePlan[]> {
		return this.http.get<InsurancePlan[]>(baseUrl);
	}

  searchInsuranceCompany(term: string): Observable<InsuranceCompany[]> {
		return this.http.post<InsuranceCompany[]>(`${baseUrl}search_companies`, {keyword: term});
	}

  updateInsuranceCompanies(): Observable<any> {
    return this.http.get<any>(searchInsCompanyUrl);
  }

  searchEmployer(term: string): Observable<Employer[]> {
		return this.http.post<Employer[]>(`${baseUrlEmp}search`, {keyword: term});
	}

  searchInsurancePlan(term: string): Observable<InsurancePlan[]> {
		return this.http.get<InsurancePlan[]>(`${baseUrl}search/?query=${term}`);
	}


  updateEmployer(id: any, data: any): Observable<any> {
		return this.http.put(`${baseUrlEmp}${id}`, data);
  }

  createEmployer(data: any): Observable<any> {
		return this.http.post(baseUrlEmp, data);
	}

	getList(): Observable<InsurancePlan[]> {
		return this.http.get<InsurancePlan[]>(`${baseUrl}list`);
	}

	get(id: any): Observable<InsurancePlan> {
		return this.http.get<InsurancePlan>(`${baseUrl}${id}`);
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
