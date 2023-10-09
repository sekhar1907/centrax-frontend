import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IPractice } from "../models/practice.model";
import { IOwner } from "../models/owner.model";
import { IProvider } from "../models/provider.model";

const baseUrl = `${environment.apiUrl}/practices`;

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  constructor(private http: HttpClient) {}

  createPractice(data: IPractice): Observable<any> {
    return this.http.post(`${baseUrl}`, data);
  }

  createBilling(data: { plan: string }): Observable<any> {
    return this.http.post(`${baseUrl}/save-billing-plan`, data);
  }

  createOwner(data: IOwner): Observable<any> {
    return this.http.post(`${baseUrl}/save-owner`, data);
  }

  getPracticeProviders(): Observable<IProvider[]> {
    return this.http.get<IProvider[]>(`${baseUrl}/providers`);
  }

  saveSkippedCreationSteps(step: string) {
    return this.http.put(`${baseUrl}/save-create-profile-skipped-step`, { step });
  }
}
