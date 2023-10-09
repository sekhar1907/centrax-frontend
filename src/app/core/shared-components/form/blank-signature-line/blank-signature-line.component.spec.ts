import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankSignatureLineComponent } from './blank-signature-line.component';

describe('BlankSignatureLineComponent', () => {
  let component: BlankSignatureLineComponent;
  let fixture: ComponentFixture<BlankSignatureLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankSignatureLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankSignatureLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
