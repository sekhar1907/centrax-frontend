import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidebarContentAppointmentComponent } from './dashboard-sidebar-content-appointment.component';

describe('DashboardSidebarContentAppointmentComponent', () => {
  let component: DashboardSidebarContentAppointmentComponent;
  let fixture: ComponentFixture<DashboardSidebarContentAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarContentAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSidebarContentAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
