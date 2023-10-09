import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionMsgComponent } from './collection-msg.component';

describe('CollectionMsgComponent', () => {
  let component: CollectionMsgComponent;
  let fixture: ComponentFixture<CollectionMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionMsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
