import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IBAA } from "../models/baa.model";

const baseUrl = `${environment.apiUrl}/baa`;

@Injectable({
  providedIn: 'root'
})
export class BaaService {

  constructor(private http: HttpClient) { }

  createDownloadBAAPdf(data: any = {}): Observable<any> {
    return this.http.post(`${baseUrl}create-download-pdf`, data);
  }

  createBAA(data: IBAA): Observable<any> {
    return this.http.post(`${baseUrl}`, data);
  }

  uploadSignedBAA(formData: FormData) {
    return this.http.post(`${baseUrl}/upload-signed-document`, formData);
  }
}
