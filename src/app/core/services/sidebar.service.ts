import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SidenavPopupOpen {
  id: string | null,
  patientId?: number | null,
  appointmentId?: number | null
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public sideNavOpen = new BehaviorSubject<boolean>(true);
  public stepNavigation = new BehaviorSubject<any>({ navIndex: null });
  public dashboardSideNavPopupOpen = new BehaviorSubject<SidenavPopupOpen>(null);
}
