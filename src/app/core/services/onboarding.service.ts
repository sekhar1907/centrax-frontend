import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const baseUrl = `${environment.apiUrl}/providers/`;

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  constructor(private http: HttpClient) {}

  claimProfileOnboarding(onboardingLink: string): Observable<any> {
    return this.http.get(`${baseUrl}claim-profile/${onboardingLink}`);
  }

  claimProfileManual(data: { keyword: string, type: string }): Observable<any> {
    return this.http.post(`${baseUrl}search`, data);
  }

  claimProfileLink(providerId: number): Observable<any> {
    return this.http.get(`${baseUrl}providerId/${providerId}`);
  }
}
