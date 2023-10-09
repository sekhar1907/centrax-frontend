import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaaComponent } from './baa.component';

describe('BaaComponent', () => {
  let component: BaaComponent;
  let fixture: ComponentFixture<BaaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
