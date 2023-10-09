import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionMsgNonInsuranceComponent } from './collection-msg-non-insurance.component';

describe('CollectionMsgNonInsuranceComponent', () => {
  let component: CollectionMsgNonInsuranceComponent;
  let fixture: ComponentFixture<CollectionMsgNonInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionMsgNonInsuranceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionMsgNonInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
