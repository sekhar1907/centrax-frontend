import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOptComponent } from './statement-opt.component';

describe('StatementOptComponent', () => {
  let component: StatementOptComponent;
  let fixture: ComponentFixture<StatementOptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementOptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatementOptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
