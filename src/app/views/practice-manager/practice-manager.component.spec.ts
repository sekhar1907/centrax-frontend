import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeManagerComponent } from './practice-manager.component';

describe('PracticeManagerComponent', () => {
  let component: PracticeManagerComponent;
  let fixture: ComponentFixture<PracticeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PracticeManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
