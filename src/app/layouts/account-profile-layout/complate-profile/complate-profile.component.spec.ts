import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplateProfileComponent } from './complate-profile.component';

describe('ComplateProfileComponent', () => {
  let component: ComplateProfileComponent;
  let fixture: ComponentFixture<ComplateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplateProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
