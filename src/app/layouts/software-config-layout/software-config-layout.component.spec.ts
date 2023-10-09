import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareConfigLayoutComponent } from './software-config-layout.component';

describe('SoftwareConfigLayoutComponent', () => {
  let component: SoftwareConfigLayoutComponent;
  let fixture: ComponentFixture<SoftwareConfigLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareConfigLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareConfigLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
