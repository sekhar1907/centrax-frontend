import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedTabsComponent } from './sched-tabs.component';

describe('SchedTabsComponent', () => {
  let component: SchedTabsComponent;
  let fixture: ComponentFixture<SchedTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
