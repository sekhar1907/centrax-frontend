import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IProvider } from "../models/provider.model";

const baseUrl = `${environment.apiUrl}/providers`;

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(private http: HttpClient) {}

  createProvider(data: IProvider): Observable<any> {
    return this.http.post(`${baseUrl}`, data);
  }

  uploadProviderProfilePhoto(formData: FormData): Observable<{result: string}> {
    return this.http.post<{result: string}>(`${baseUrl}/upload-profile-photo`, formData);
  }

  uploadProviderOfficePhotos(formData: FormData): Observable<string[]> {
    return this.http.post<string[]>(`${baseUrl}/upload-office-photos`, formData);
  }
}
