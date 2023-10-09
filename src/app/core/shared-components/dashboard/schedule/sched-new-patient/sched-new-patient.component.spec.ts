import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedNewPatientComponent } from './sched-new-patient.component';

describe('SchedNewPatientComponent', () => {
  let component: SchedNewPatientComponent;
  let fixture: ComponentFixture<SchedNewPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedNewPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedNewPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
