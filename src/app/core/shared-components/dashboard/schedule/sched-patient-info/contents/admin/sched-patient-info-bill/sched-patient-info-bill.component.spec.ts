import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedPatientInfoBillComponent } from './sched-patient-info-bill.component';

describe('SchedPatientInfoBillComponent', () => {
  let component: SchedPatientInfoBillComponent;
  let fixture: ComponentFixture<SchedPatientInfoBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedPatientInfoBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedPatientInfoBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
