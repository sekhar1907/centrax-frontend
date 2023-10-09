import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeInformationComponent } from './practice-information.component';

describe('PracticeInformationComponent', () => {
  let component: PracticeInformationComponent;
  let fixture: ComponentFixture<PracticeInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
