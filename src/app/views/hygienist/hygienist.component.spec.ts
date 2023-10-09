import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HygienistComponent } from './hygienist.component';

describe('HygienistComponent', () => {
  let component: HygienistComponent;
  let fixture: ComponentFixture<HygienistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HygienistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HygienistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
