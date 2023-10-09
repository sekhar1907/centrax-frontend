import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = '/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  	private _user:User[] = [];

	setUser(user: User[]) {
		console.log('setUser -->', user)
	    this._user = user;
	}

	addUser(item: User) {
	    this._user.push(item);
	}

	getUser(): User[] {
	    return this._user;
	}

	get(): Observable<User> {
		return this.http.get(baseUrl);
	}

	update(data: any): Observable<any> {
		return this.http.put(baseUrl, data);
	}

}
