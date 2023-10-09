import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionStatementMsgComponent } from './collection-statement-msg.component';

describe('CollectionStatementMsgComponent', () => {
  let component: CollectionStatementMsgComponent;
  let fixture: ComponentFixture<CollectionStatementMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionStatementMsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionStatementMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
