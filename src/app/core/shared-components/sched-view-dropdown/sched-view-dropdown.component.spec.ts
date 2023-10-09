import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedViewDropdownComponent } from './sched-view-dropdown.component';

describe('SchedViewDropdownComponent', () => {
  let component: SchedViewDropdownComponent;
  let fixture: ComponentFixture<SchedViewDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedViewDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedViewDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
