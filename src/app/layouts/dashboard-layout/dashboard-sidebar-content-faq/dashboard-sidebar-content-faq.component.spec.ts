import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidebarContentFaqComponent } from './dashboard-sidebar-content-faq.component';

describe('DashboardSidebarContentFaqComponent', () => {
  let component: DashboardSidebarContentFaqComponent;
  let fixture: ComponentFixture<DashboardSidebarContentFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarContentFaqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSidebarContentFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
