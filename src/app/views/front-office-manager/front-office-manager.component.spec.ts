import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontOfficeManagerComponent } from './front-office-manager.component';

describe('FrontOfficeManagerComponent', () => {
  let component: FrontOfficeManagerComponent;
  let fixture: ComponentFixture<FrontOfficeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontOfficeManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontOfficeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
