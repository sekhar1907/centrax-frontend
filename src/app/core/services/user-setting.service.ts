import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSetting } from '../models/user-setting.model';

const baseUrl = '/api/user-settings/';

@Injectable({
  providedIn: 'root'
})
export class UserSettingService {

  constructor(private http: HttpClient) { }

  	private _userSettings:UserSetting[] = [];

	setUserSettings(userSettings: UserSetting[]) {
		console.log('setUserSettings -->', userSettings)
	    this._userSettings = userSettings;
	}

	addUserSetting(item: UserSetting) {
	    this._userSettings.push(item);
	}

	getUserSettings(): UserSetting[] {
	    return this._userSettings;
	}

	getAll(): Observable<UserSetting[]> {
		return this.http.get<UserSetting[]>(baseUrl);
	}

	get(id: any): Observable<UserSetting> {
		return this.http.get(`${baseUrl}${id}`);
	}

	create(data: any): Observable<any> {
		return this.http.post(baseUrl, data);
	}

	update(data: any): Observable<any> {
		return this.http.put(baseUrl, data);
	}

	delete(data: any): Observable<any> {
		return this.http.delete(baseUrl, data);
	}
}
