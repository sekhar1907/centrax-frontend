import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidebarMenuComponent } from './dashboard-sidebar-menu.component';

describe('DashboardSidebarMenuComponent', () => {
  let component: DashboardSidebarMenuComponent;
  let fixture: ComponentFixture<DashboardSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
