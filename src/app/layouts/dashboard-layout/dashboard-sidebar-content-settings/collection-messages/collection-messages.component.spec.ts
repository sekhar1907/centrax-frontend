import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionMessagesComponent } from './collection-messages.component';

describe('CollectionMessagesComponent', () => {
  let component: CollectionMessagesComponent;
  let fixture: ComponentFixture<CollectionMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionMessagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
