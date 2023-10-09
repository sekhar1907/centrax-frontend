import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidebarContentPracticeComponent } from './dashboard-sidebar-content-practice.component';

describe('DashboardSidebarContentPracticeComponent', () => {
  let component: DashboardSidebarContentPracticeComponent;
  let fixture: ComponentFixture<DashboardSidebarContentPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarContentPracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSidebarContentPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
