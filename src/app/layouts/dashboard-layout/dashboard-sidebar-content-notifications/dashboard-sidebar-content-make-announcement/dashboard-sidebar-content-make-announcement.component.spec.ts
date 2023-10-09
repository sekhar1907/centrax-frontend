import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidebarContentMakeAnnouncementComponent } from './dashboard-sidebar-content-make-announcement.component';

describe('DashboardSidebarContentMakeAnnouncementComponent', () => {
  let component: DashboardSidebarContentMakeAnnouncementComponent;
  let fixture: ComponentFixture<DashboardSidebarContentMakeAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarContentMakeAnnouncementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSidebarContentMakeAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
