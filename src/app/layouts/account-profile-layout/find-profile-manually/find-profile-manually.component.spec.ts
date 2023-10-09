import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProfileManuallyComponent } from './find-profile-manually.component';

describe('FindProfileManuallyComponent', () => {
  let component: FindProfileManuallyComponent;
  let fixture: ComponentFixture<FindProfileManuallyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindProfileManuallyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindProfileManuallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
