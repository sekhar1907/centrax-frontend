import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedPatientSearchComponent } from './sched-patient-search.component';

describe('SchedPatientSearchComponent', () => {
  let component: SchedPatientSearchComponent;
  let fixture: ComponentFixture<SchedPatientSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedPatientSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedPatientSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
