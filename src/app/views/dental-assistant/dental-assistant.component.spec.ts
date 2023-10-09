import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentalAssistantComponent } from './dental-assistant.component';

describe('DentalAssistantComponent', () => {
  let component: DentalAssistantComponent;
  let fixture: ComponentFixture<DentalAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentalAssistantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DentalAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
