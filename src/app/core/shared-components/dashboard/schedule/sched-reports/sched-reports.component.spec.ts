import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedReportsComponent } from './sched-reports.component';

describe('SchedReportsComponent', () => {
  let component: SchedReportsComponent;
  let fixture: ComponentFixture<SchedReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
