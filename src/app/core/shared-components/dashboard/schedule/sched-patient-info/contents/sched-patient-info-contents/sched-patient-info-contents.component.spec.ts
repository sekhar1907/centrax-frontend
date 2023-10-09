import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedPatientInfoContentsComponent } from './sched-patient-info-contents.component';

describe('SchedPatientInfoContentsComponent', () => {
  let component: SchedPatientInfoContentsComponent;
  let fixture: ComponentFixture<SchedPatientInfoContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedPatientInfoContentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedPatientInfoContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
