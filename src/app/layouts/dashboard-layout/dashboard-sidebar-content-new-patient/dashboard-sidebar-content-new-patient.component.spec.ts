import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidebarContentNewPatientComponent } from './dashboard-sidebar-content-new-patient.component';

describe('DashboardSidebarContentNewPatientComponent', () => {
  let component: DashboardSidebarContentNewPatientComponent;
  let fixture: ComponentFixture<DashboardSidebarContentNewPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarContentNewPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSidebarContentNewPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
