import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidebarContentTodoComponent } from './dashboard-sidebar-content-todo.component';

describe('DashboardSidebarContentTodoComponent', () => {
  let component: DashboardSidebarContentTodoComponent;
  let fixture: ComponentFixture<DashboardSidebarContentTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarContentTodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSidebarContentTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
