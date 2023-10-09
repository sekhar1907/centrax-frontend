import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfWayDoneComponent } from './half-way-done.component';

describe('HalfWayDoneComponent', () => {
  let component: HalfWayDoneComponent;
  let fixture: ComponentFixture<HalfWayDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HalfWayDoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HalfWayDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
