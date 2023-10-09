import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CollectionMessage, FinancialSetup, StatementOptions, SystemPreference, PracticeInformation, FeeSchedule
} from '../models/settings.model';
import { SessionStorageService } from './session-storage.service';
import { ISoftwareConfig } from '../models/software-config.model';

const baseUrl = `${environment.apiUrl}/practices`;

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private loggedInUser: null;
  public activeTab = 'staff';
  activeTabChange: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient,
    public sessionStorageService: SessionStorageService
  ) {
    this.loggedInUser = this.sessionStorageService.get('practiceId');
  }

  setActiveTabInModal(activeTab:string){
    this.activeTab = activeTab;
    this.activeTabChange.next(this.activeTab);
  }

  
  getActiveTabInModal():string {
    return this.activeTab;
  }
  
  softwareConfigData(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/${this.loggedInUser}/software-config-data`);
  }

  staffUpdateProcess(id: any, data: any): Observable<any> {
		return this.http.put(`${baseUrl}/${this.loggedInUser}/staff/${id}`, data);
	}

  getFeeSchedule(type:string): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/${this.loggedInUser}/fee-schedule-list?type=${type}`);
  }

  

  createCollectionMessage(data: CollectionMessage): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/collection-message-insurance`,
      data
    );
  }

  createFinancialSetup(data: FinancialSetup): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/financial-setup`,
      data
    );
  }
  createFeeSchedule(data: FeeSchedule): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/fee-schedule`,
      data
    );
  }

  

  createStatementOptions(data: StatementOptions): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/collection-message-statement`,
      data
    );
  }

  updateSystemPreference(data: SystemPreference): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/system-preference`,
      data
    );
  }

  createPracticeInformation(data: PracticeInformation): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/practice-detail`,
      data
    );
  }

  resetPassword(data: any): Observable<any> {
		return this.http.post(
			`${environment.apiUrl}/users/software-setting-reset-password`,
			data
		);
	}
  
}
