import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreatePracticeNotificationDto, PracticeNotification } from "../models/practice-notification.model";
import { HttpClient } from "@angular/common/http";

const baseUrl = `${environment.apiUrl}/practice-notifications`;

@Injectable({
  providedIn: 'root'
})
export class PracticeNotificationService {
  constructor(private http: HttpClient) { }


  getAll(): Observable<PracticeNotification[]> {
    return this.http.get<PracticeNotification[]>(baseUrl);
  }

  create(data: CreatePracticeNotificationDto): Observable<PracticeNotification> {
    return this.http.post<PracticeNotification>(baseUrl, data);
  }
}
