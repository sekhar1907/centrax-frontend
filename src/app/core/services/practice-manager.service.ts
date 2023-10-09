import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  FeeSchedule,
  ICollectionMessagesIns,
  ICollectionMessagesNonIns,
  ICollectionStatMessages,
  IContactPerson,
  IFinancialSetup,
  IPracticeBilling,
  IPracticeDetail,
  IPracticeManager,
  IStaffList,
  IStatementOpt,
  ISystemPreference,
} from '../models/practice-manager.model';
import { SessionStorageService } from './session-storage.service';
import { ISoftwareConfig } from '../models/software-config.model';

const baseUrl = `${environment.apiUrl}/practices`;

@Injectable({
  providedIn: 'root',
})
export class PracticeManagerService {
  private loggedInUser: null;
  constructor(
    private http: HttpClient,
    public sessionStorageService: SessionStorageService
  ) {
    this.loggedInUser = this.sessionStorageService.get('practiceId');
  }

  getPractice(): Observable<IPracticeManager> {
    return this.http.get<IPracticeManager>(`${baseUrl}/${this.loggedInUser}`);
  }

  getSoftwareConfig(): Observable<ISoftwareConfig> {
    return this.http.get<ISoftwareConfig>(`${baseUrl}/${this.loggedInUser}/software-config-data`);
  }

  createPracticeDetail(data: IPracticeDetail): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/practice-detail`,
      data
    );
  }

  createContactPerson(data: IContactPerson): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/contact-person`,
      data
    );
  }

  createStaffList(data: IStaffList[]): Observable<any> {
    return this.http.post(`${baseUrl}/${this.loggedInUser}/add-staff`, data);
  }

  createStaffListDental(data: IStaffList[]): Observable<any> {
    return this.http.post(`${baseUrl}/${this.loggedInUser}/add-dental-staff`, data);
  }

  createSystemPreference(data: ISystemPreference): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/system-preference`,
      data
    );
  }

  updateSystemPreference(data: ISystemPreference): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/system-preference`,
      data
    );
  }


  createPracticeBilling(data: IPracticeBilling): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/practice-billing`,
      data
    );
  }

  createFinancialSetup(data: IFinancialSetup): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/financial-setup`,
      data
    );
  }

  createStatementOpt(data: IStatementOpt): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/statement-option`,
      data
    );
  }

  updateStatementOpt(data: IStatementOpt): Observable<any> {
    return this.http.put(
      `${baseUrl}/${this.loggedInUser}/statement-option`,
      data
    );
  }

  createCollectionMessagesIns(data: ICollectionMessagesIns): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/collection-message-insurance`,
      data
    );
  }


  updateCollectionMessagesIns(data: ICollectionMessagesIns): Observable<any> {
    return this.http.put(
      `${baseUrl}/${this.loggedInUser}/collection-message-insurance`,
      data
    );
  }

  createCollectionMessagesNonIns(
    data: ICollectionMessagesNonIns
  ): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/collection-message-non-insurance`,
      data
    );
  }

  updateCollectionMessagesNonIns(
    data: ICollectionMessagesNonIns
  ): Observable<any> {
    return this.http.put(
      `${baseUrl}/${this.loggedInUser}/collection-message-non-insurance`,
      data
    );
  }


  createCollectionStatMessages(data: ICollectionStatMessages): Observable<any> {
    return this.http.post(
      `${baseUrl}/${this.loggedInUser}/collection-message-statement`,
      data
    );
  }

  updateCollectionStatMessages(data: ICollectionStatMessages): Observable<any> {
    return this.http.put(
      `${baseUrl}/${this.loggedInUser}/collection-message-statement`,
      data
    );
  }

  uploadStaffFile(images: File) {
    const formData = new FormData();
    formData.append('images', images);

    return this.http.post(
      `${environment.apiUrl}/practice-staff/upload-image`,
      formData
    );
  }

  uploadFeeScheduleFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${baseUrl}/upload-fee-schedule`, formData);
  }

  createFeeScheduleList(data: FeeSchedule[]): Observable<any> {
    return this.http.post(`${baseUrl}/${this.loggedInUser}/fee-schedule`, data);
  }
}
