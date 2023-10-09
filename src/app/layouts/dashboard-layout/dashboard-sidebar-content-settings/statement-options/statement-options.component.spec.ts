import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOptionsComponent } from './statement-options.component';

describe('StatementOptionsComponent', () => {
  let component: StatementOptionsComponent;
  let fixture: ComponentFixture<StatementOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatementOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
