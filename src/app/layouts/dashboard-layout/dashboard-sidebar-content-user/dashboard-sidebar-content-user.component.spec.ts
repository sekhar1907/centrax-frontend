import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidebarContentUserComponent } from './dashboard-sidebar-content-user.component';

describe('DashboardSidebarContentUserComponent', () => {
  let component: DashboardSidebarContentUserComponent;
  let fixture: ComponentFixture<DashboardSidebarContentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarContentUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSidebarContentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
