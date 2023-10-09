import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment, AppointmentFlag, AppointmentStatus, CreateAppointmentDto } from '../models/appointment.model';

const baseUrl = '/api/appointments/';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  	constructor(private http: HttpClient) { }

  	private _appointments:Appointment[] = [];

	setAppointments(appointments: Appointment[]) {
		console.log('setAppointments -->', appointments)
	    this._appointments = appointments;
	}

	addAppointment(item: Appointment) {
	    this._appointments.push(item);
	}

	getAppointments(): Appointment[] {
	    return this._appointments;
	}

	getAll(): Observable<Appointment[]> {
		return this.http.get<Appointment[]>(baseUrl);
	}

	getAllComplete(date: string): Observable<Appointment[]> {
		return this.http.get<Appointment[]>(`${baseUrl}complete/?date=${date}`);
	}

	getAppointmentsFlag(): Observable<Appointment[]> {
		return this.http.get<Appointment[]>(`${baseUrl}flagged`);
	}

	getList(data: any): Observable<any> {
		return this.http.post<any>(`${baseUrl}list`, data);
	}

	get(id: any): Observable<Appointment> {
		return this.http.get<Appointment>(`${baseUrl}${id}`);
	}

	create(data: CreateAppointmentDto): Observable<Appointment> {
		return this.http.post<Appointment>(baseUrl, data);
	}

	update(id: any, data: CreateAppointmentDto): Observable<Appointment> {
		return this.http.put<Appointment>(`${baseUrl}${id}`, data);
	}

	delete(id: any): Observable<any> {
		return this.http.delete(`${baseUrl}${id}`);
	}

  getAppointmentsByPractice(data: any) {
    return this.http.get<Appointment[]>(`${baseUrl}get-by-current-practice`, {params: data})
    // return this.http.request<Appointment[]>('GET', `${baseUrl}get-by-current-practice`, {body: data})
  }

  getAppointment(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${baseUrl}${id}`)
  }

  updateAppointmentStatus(id: number | string, status: AppointmentStatus) {
		return this.http.put<Appointment>(`${baseUrl}${id}`, { status });
  }

  updateAppointmentFlag(id: number | string, flag: AppointmentFlag) {
		return this.http.put<Appointment>(`${baseUrl}${id}`, { flag });
  }

  updateAppointment(id: number | string, data: any) {
		return this.http.put<Appointment>(`${baseUrl}${id}`, data);
  }
}
