import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapBusinessApplicationComponent } from './sap-business-application.component';

describe('SapBusinessApplicationComponent', () => {
  let component: SapBusinessApplicationComponent;
  let fixture: ComponentFixture<SapBusinessApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapBusinessApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SapBusinessApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
