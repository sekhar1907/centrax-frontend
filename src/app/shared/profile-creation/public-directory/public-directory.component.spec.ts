import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDirectoryComponent } from './public-directory.component';

describe('PublicDirectoryComponent', () => {
  let component: PublicDirectoryComponent;
  let fixture: ComponentFixture<PublicDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicDirectoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
