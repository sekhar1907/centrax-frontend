import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedControlsComponent } from './sched-controls.component';

describe('SchedControlsComponent', () => {
  let component: SchedControlsComponent;
  let fixture: ComponentFixture<SchedControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
