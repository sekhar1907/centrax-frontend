import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ISpecialty } from "../models/specialty.model";
import { Observable } from "rxjs";

const baseUrl = `${environment.apiUrl}/`;

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) {}

  getSpecialties(): Observable<ISpecialty[]> {
    return this.http.get<ISpecialty[]>(`${baseUrl}specialties`);
  }
}
